import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plant } from './plant.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public plantlist: Plant[];
  public splantlist: Plant[];
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

  public sgetPlantData(id): Observable<Plant[]> {
    return this.http.get<Plant[]>(
      this.rootUrl + '/galvaplants/Galvaplant/' + id
    );
  }
}
