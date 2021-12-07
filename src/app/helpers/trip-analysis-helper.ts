import { AssetDetail } from "../models/assettracking";
import { logging } from 'protractor';
export type TripAnalysisData = {
    xAxis
    yAxis
}

export class TripAnalysisHelper {

    tripsByDate(range = [], trips) {
        let data: TripAnalysisData
        if (range && range.length > 0) {
            let x = [], y = []
            range.map(item => {
                let index = this.isItemExists(trips, item);
                x.push(item)
                if (index == -1) {
                    y.push(0)
                }
                else {
                    y.push(trips[index].trips)
                }
            })
            data = {
                xAxis: x,
                yAxis: y
            }
        }
        return data;
    }

    /**
     * 
     * @param list Array of asset
     * @param searchItem search string (searches list by given asset name)
     * @returns index of the asset
     */
     isItemExists(list, searchItem) {
        let index = list.findIndex(item => item.date == searchItem)
        return index
    }
}

