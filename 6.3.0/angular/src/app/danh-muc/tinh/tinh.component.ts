import { Component, OnInit } from '@angular/core';
import { GetAllServerPagingInputDto, GetAllServerPagingOutputDto, TinhServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-tinh',
  templateUrl: './tinh.component.html',
  styleUrls: ['./tinh.component.css']
})
export class TinhComponent implements OnInit {

   dataList: GetAllServerPagingOutputDto[] = [];

  constructor(
    private tinhService: TinhServiceProxy
  ) { }

  ngOnInit(): void {

  }
  loadData(){
    const input  = new GetAllServerPagingInputDto();
    this.tinhService.getAllServerPaging(input).subscribe(result=>{
      this.dataList = result;
    });
  }

}
