export type DashboardDate  = {
  fromDate: Date
  toDate: Date
}

export type Widget = {
  total
  active
  percentage
}

export type Trip = {
  trips
}

export type TripAnalysis = {
  date: Date
  trips: number
}

export type DashboardWidgetData = {
  // date: DashboardDate
  dumperUtilization: Widget
  shovelUtilization: Widget
  totalTripCount: Trip
  tripAnalysis: TripAnalysis[]
}
