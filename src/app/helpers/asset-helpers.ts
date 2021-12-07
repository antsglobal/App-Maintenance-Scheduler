import { AssetDetail } from "../models/assettracking";

export class AssetHelper {

    /**
     * formats the API response and prepare the object with counts and 
     * list of assets by each room and by each asset.
     * 
     * @param data The Raw API response object
     * @returns  assetsData: AssetDetail[]
     */
    assetsByLocation(data, getTotalAssetCount = false) {
        let assetsData: AssetDetail[] = []
        let totalAssetCount = 0;
        if (data) {
            data.map(item => {
                let itemIndex = this.isAssetExists(assetsData, item.AssetName);
                if (itemIndex == -1) {
                    let asset: AssetDetail = {
                        AssetName: item.AssetName,
                        AssetCount: 1,
                        AssetList: [item]
                    }
                    assetsData.push(asset);
                }
                else {
                    assetsData[itemIndex].AssetCount = assetsData[itemIndex].AssetCount + 1
                    assetsData[itemIndex].AssetList.push(item)
                }
                totalAssetCount = totalAssetCount + 1
            })
        }
        return { data: assetsData, totalCount: totalAssetCount };
    }

    /**
     * 
     * @param list Array of asset
     * @param searchItem search string (searches list by given asset name)
     * @returns index of the asset
     */
    isAssetExists(list, searchItem) {
        let index = list.findIndex(item => item.AssetName == searchItem)
        return index
    }
}
