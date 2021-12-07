export interface dumpermodel {
  id: string,
  dumperId: string,
  loadDeviceValue: string,
  unloadDeviceValue: string,
  date: Date,
  time: string,
  unloadtime: string,
  status: string,
  fromDate: Date,
  toDate: Date,
  tripDuration: string,
  loadStartTime: Date,
  unloadEndTime: Date,
}

export type DumperStatus = {
  id
  deviceId
  time_stamp: Date
  latitude
  longitude
  status: string
}