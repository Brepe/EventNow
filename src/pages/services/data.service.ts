import { Injectable } from '@angular/core';

@Injectable()
export class myService {
  public adressdata: string;
  public latdata: number;
  public londata: number;


  constructor() {
    this.adressdata = "Adress";
    this.latdata = -9000000;
    this.londata = -9000000;


  }

  setData(data, data2, data3) {
    this.adressdata = data;
    this.latdata = data2;
    this.londata = data3;
  }
  getData() {
    return this.adressdata;

  }
  getDatalat() {
    return this.latdata;

  }
  getDatalon() {
    return this.londata;

  }
}