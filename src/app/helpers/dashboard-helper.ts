import { AssetDetail } from "../models/assettracking";
import { DashboardWidgetData } from '../models/dashboarddatamodel ';

export class DashboardHelper {

    /**
     * formats the API response and prepare the object with completed
     * trips in the selected Date range
     * 
     * @param data The Raw API response object
     * @returns  widgetData
     */
    widgetCount(data, dateRange = [ new Date() ], devicesCount) {
        let widgetData: DashboardWidgetData = {
            dumperUtilization: {
                active: 0,
                percentage: 0,
                total: devicesCount.dumpers
            },
            shovelUtilization: {
                active: 0,
                percentage: 0,
                total: devicesCount.loadingPoints
            },
            totalTripCount: {
                trips: 0
            },
            tripAnalysis: []
        }
        if (data) {
            data.map(item => {
                widgetData.dumperUtilization.active = widgetData.dumperUtilization.active + item.DumperCount;
                widgetData.shovelUtilization.active = widgetData.shovelUtilization.active + item.ShovelCount;
                widgetData.totalTripCount.trips = widgetData.totalTripCount.trips + item.TripCount
                widgetData.tripAnalysis.push({date: item.Date, trips: item.TripCount})
            })
            widgetData.dumperUtilization.active = Math.ceil(widgetData.dumperUtilization.active / dateRange.length);
            widgetData.dumperUtilization.percentage = this.calcPercentage(widgetData.dumperUtilization.active, widgetData.dumperUtilization.total)
            widgetData.shovelUtilization.active = Math.ceil(widgetData.shovelUtilization.active / dateRange.length);
            widgetData.shovelUtilization.percentage = this.calcPercentage(widgetData.shovelUtilization.active, widgetData.shovelUtilization.total)
        }
        return widgetData;
    }

    calcPercentage(actual = 0, total = 100, decimals = 0) {
        let percentage = (actual / total) * 100;
        if (decimals == 0) {
          return Math.round(percentage);
        }
        else if(decimals > 0) {
          return percentage.toFixed(decimals)
        }
    }
}
