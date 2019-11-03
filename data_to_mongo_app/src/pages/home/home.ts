import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Country } from '../../models/country';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: Country[]
  loading: any
  alert: any

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    this.loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });

    this.alert = this.alertCtrl.create({
      title: 'Os dados já foram enviados para o MongoDB!',
      buttons: ['OK']
    });

  }

  subscribeToMongo() {


    this.api.getMongo().subscribe(
      res => {

        console.log(res.length)
        if (res.length < 250) {
          this.loading.present()
          this.subscribeToCountries()
        } else {

          this.alert = this.alertCtrl.create({
            title: 'Os dados já foram enviados para o MongoDB!',
            buttons: ['OK']
          });
          this.alert.present()
        }

      },
      err => {

        this.loading.present()
        this.subscribeToCountries()

      })
  }

  subscribeToCountries() {
    this.api.getCountries().subscribe(res => {

      this.countries = res
      console.log("countries: ", this.countries)
      this.countries
      this.postToMongo();

    })
  }

  postToMongo() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    this.countries.forEach((country, i) => {

      this.http.post('http://localhost:8080/api/', country, { headers: headers })
        .subscribe(res => {
          //console.log(res);
          if (i == 249) {
            this.loading.dismiss()
            this.alert.present()
          }

        });


    })


  }

}

