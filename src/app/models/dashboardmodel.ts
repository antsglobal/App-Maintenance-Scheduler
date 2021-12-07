import { Adapter } from './adapter';

export type DashboardData = {
  Date: string
  DumperCount
  ShovelCount
  TripCount
}

export class DashboardDataAdapter implements Adapter<DashboardData> {
  adapt(item): any {
    let data: DashboardData = {
      Date: item[0],
      DumperCount: item[1],
      ShovelCount: item[2],
      TripCount: item[3]
    }
    return data;
  }
}

export type RecentTripData = {
  dumperId
  loadingAt
  unloadingAt
  startTime
  endTime
}

export class RecentTripDataAdapter implements Adapter<RecentTripData> {
  adapt(item): any {
    let data: RecentTripData = {
      dumperId: item[0],
      loadingAt: item[1],
      unloadingAt: item[2],
      startTime: item[3],
      endTime: item[4]
    }
    return data;
  }
}

export type DevicesCount = {
  dumpers
  loadingPoints //Shovels
  unloadingPoints
}

export class DevicesCountAdapter implements Adapter<DevicesCount> {
  adapt(item): any {
    let data: DevicesCount = {
      dumpers: item[0],
      loadingPoints: item[1],
      unloadingPoints: item[2]
    }
    return data;
  }
}