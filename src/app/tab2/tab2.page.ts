import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  num;
  randnum = Math.floor(Math.random() * 20);
  cek = 0;

  ceknum()
  {
    console.log(this.randnum);
    if(this.num == this.randnum)
    {
      console.log("samaa");
      this.cek = 1;

    }
    else if(this.num != this.randnum)
    {
      console.log("beda");
      this.cek = 0;
      alert("Oops try again:)");

    }    

  }

}
