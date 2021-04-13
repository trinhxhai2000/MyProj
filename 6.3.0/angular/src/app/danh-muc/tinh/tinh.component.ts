import { Component, OnInit } from '@angular/core';
import { TinhDTO, TinhServiceProxy, HuyenServiceProxy, HuyenDTO, GetHuyenByTinhIdDto} from '@shared/service-proxies/service-proxies';
export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-tinh',
  templateUrl: './tinh.component.html',
  styleUrls: ['./tinh.component.css']
})
export class TinhComponent implements OnInit {

  constructor(
    private tinhService: TinhServiceProxy
  ) { }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: ReadonlyArray<TinhDTO> = [];
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Data>): void {

    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.tinhService.getAllTinh().subscribe(
      tinhs=>this.listOfData = tinhs
    )

    // this.listOfData = new Array(100).fill(0).map((_, index) => {
    //   return {
    //     id: index,
    //     name: `Edward King ${index}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${index}`,
    //     disabled: index % 2 === 0
    //   };
    // });




  }


}
