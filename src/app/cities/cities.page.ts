import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

cities:any= [];

  constructor(private http:HttpClient,public toastController:ToastController,public alertController:AlertController) { }

  ngOnInit() {
    this.getCities().subscribe((res)=>{
      console.log(res);
      this.cities = res;
    })
  }

  getCities(){
return this.http.get('assets/files/cities.json')
.pipe(
  map((res:any)=>{
    return res.data;
}));
}

async presentToast1(){
  const toast = await this.toastController.create({
    message: 'Ciudad Seleccionada',
    duration: 500,
    position: "bottom"
  });
  toast.present();
}

async presentAlert1(){
  const alert = await this.alertController.create({
    header: "Borrar Ciudad",
    message: "Se ha borrado la ciudad correctamente",
    buttons: ["OK"],
  });
  await alert.present();
  let result = await alert.onDidDismiss(); //Esto hace que se debe esperar hasta que nosotros la cerremos, que no se quites sola, (O ya no se para que sirve)
  console.log(result);
}

async presentAlert2(){
  const alert = await this.alertController.create({
    header: "Borrar Ciudad",
    message: "¿Estas seguro de querer eliminar la ciudad?",
    buttons: [
      {
        text:'No',
        handler: ()=>{console.log('No cancel')}
      },
      {
        text:'Si',
        handler: ()=>{console.log('Ciudad Eliminada')}
      }
    ],
  });
  await alert.present();
  let result = await alert.onDidDismiss(); //Esto hace que se debe esperar hasta que nosotros la cerremos, que no se quites sola, (O ya no se para que sirve)
  console.log(result);
}
}