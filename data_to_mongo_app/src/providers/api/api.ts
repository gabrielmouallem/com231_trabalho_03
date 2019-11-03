import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Country } from '../../models/country';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  url = 'https://restcountries.eu/rest/v2/all'
  local_url = 'http://localhost:8080/api/'

  constructor(public http: HttpClient) {
    
  }

  getCountries(): Observable<Country[]>  {
    return this.http.get(this.url)
  }

  getMongo(): Observable<Country[]> {
    return this.http.get(this.local_url)
  }

}
