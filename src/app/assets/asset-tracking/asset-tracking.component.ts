import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssetTracking } from 'src/app/models/assettracking';
import { AssettRackingService } from '../../services/assett-racking.service';

@Component({
  selector: 'app-asset-tracking',
  templateUrl: './asset-tracking.component.html',
  styleUrls: ['./asset-tracking.component.css']
})
export class AssetTrackingComponent implements OnInit {

  displayedColumns = [
    'asset_Code',
    'asset_Description',
    'room_Id',
    'room'
  ];
  asset: AssetTracking[] = [];
  assetData = new MatTableDataSource<AssetTracking>(this.asset);

  constructor(private assetservice: AssettRackingService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getData();

    this.assetData.filterPredicate = (data: AssetTracking, filtersJson: string) => {
      const matchFilter = [];
      console.log(filtersJson)
      const filters = JSON.parse(filtersJson);
      console.log(filters)

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        console.log(val)
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
  }

  ngAfterViewInit() {
    this.assetData.paginator = this.paginator;
    this.assetData.sort = this.sort;
  }

  getData() {
    this.assetservice.getAssetTrackingDetails().subscribe(data => {
      this.assetData.data = data['data'];
    })
  }

  applyFilter(event: Event) {
    const tableFilters = [];
    let filterValue = (event.target as HTMLInputElement).value
    tableFilters.push({
      id: 'asset_Code',
      value: filterValue
    });
    // tableFilters.push({
    //   id: 'room_Id',
    //   value: filterValue
    // });

    this.assetData.filter = JSON.stringify(tableFilters);
    if (this.assetData.paginator) {
      this.assetData.paginator.firstPage();
    }
  }

}
