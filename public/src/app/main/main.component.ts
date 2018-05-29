import { Component, OnInit } from '@angular/core';
import { PickerService } from '../picker.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  place: string = '';
  bar: string = '';

  newSearch: any = { term: '', city: '', radius: 15, mood: ''};
  randomSelection: any = {}; 

  constructor(private _pickerService: PickerService) { }

  ngOnInit() {
    console.log('randomSelection = ', this.randomSelection.name);
  }

  cantDecide(){
    console.log('hit cantDecide(): ', this.newSearch.mood);
    this._pickerService.randomSelect(this.newSearch.term, this.newSearch.city, this.newSearch.radius, this.newSearch.price, this.newSearch.mood)
    .subscribe((data: any)=>{
      console.log('Selection Coming Back: ', data);
      this.randomSelection = data;
      this.newSearch = { term: '', city: '', radius: 15 };
    })
  }

  // onNameKeyUp(event:any){
  //   this.place = event.target.value;
  // }

  // testCall(){
  //   this._pickerService.test()
  //   .subscribe((data:any)=>{
  //     console.log('data coming back ', data)
  //   })
  // }

  searchArea(){
    console.log('place = ', this.place);
    this._pickerService.areaSearch(this.place)
    .subscribe((data:any)=>{
      console.log('bar coming back ', data)
      this.bar = data;
    }

    )
  }

}
