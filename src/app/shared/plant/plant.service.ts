import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plant } from './plant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public plantlist: Plant[];
  readonly rootUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

  public getPlantDataold(): any {
    return this.http
      .get(this.rootUrl + '/plants')
      .toPromise()
      .then(res => {
        this.plantlist = res as Plant[];
      });
  }
  public getPlantData(id): any {
    return this.http
      .get(this.rootUrl + '/galvaplants/Galvaplant/' + id)
      .toPromise()
      .then(res => {
        this.plantlist = res as Plant[];
      });
  }
}
