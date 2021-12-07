import { Injectable } from '@angular/core';
import { AssetHelper } from '../helpers/asset-helpers';

export interface Adapter<Type> {
  adapt(item): Type;
}

export type AssetTracking = {
  asset_Code
  room_Id
  asset_Description
  room
}

export type Asset = {
  AssetCode: string
  AssetName: string
  LocationId
}

export class AssetDetail {
  AssetName
  AssetCount
  AssetList: Asset[]
}

export type AssetsCountByLocation = {
  LocationId
  AssetCount
}

export class AssetLocationAdapter implements Adapter<AssetsCountByLocation> {
  adapt(item): any {
    let data: AssetsCountByLocation = {
      LocationId: item[0],
      AssetCount: item[1]
    }
    return data;
  }
}

export class AssetTrackingAdapter implements Adapter<Asset> {
  adapt(item): any {
    let data: Asset = {
      AssetCode: '',
      AssetName: '',
      LocationId: '',
      // LocationName: '',
      // RFIDReaderCode: '',
      // CH_Antenna: '',
      // Sensor_ID: '',
      // SUBCH: '',
    }

    // console.log('item: ', item)
    if (item) {
      if (item.assetCode) {
        data.AssetCode = item.assetCode
      }
      if (item.assetDescription) {
        data.AssetName = item.assetDescription
      }
      if (item.locationId) {
        data.LocationId = item.locationId
      }
      // if (item.locationDescription) {
      //   data.LocationName = item.locationDescription
      // }
      // if (item.RFIDReaderCode) {
      //   data.RFIDReaderCode = item.RFIDReaderCode
      // }
      // if (item.CH_Antenna) {
      //   data.CH_Antenna = item.CH_Antenna
      // }
      // if (item.SUBCH) {
      //   data.SUBCH = item.SUBCH
      // }
      // if (item.Sensor_ID) {
      //   data.Sensor_ID = item.Sensor_ID
      // }
    }

    // console.log('adapter: ', data)
    return data;
  }
}