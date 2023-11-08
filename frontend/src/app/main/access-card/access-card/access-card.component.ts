import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, DialogService, OFormComponent, OTranslateService, OntimizeService } from 'ontimize-web-ngx';
 
@Component({
  selector: 'app-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.css']
})
export class AccessCardComponent implements OnInit {
  @ViewChild('form',{static:true}) form:OFormComponent;
  public myAngularxQrCode: string = null;
  public qr: any;
  public activeMessage: any;
  public data: any = {};
  public txt:string
  constructor(
    private translateService: OTranslateService,
    private auth:AuthService,
    private ontimizeService: OntimizeService,
    protected dialogService: DialogService,
  ) {
   
  }
 
  ngOnInit() {

    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('users'));
    this.ontimizeService.query({user_:this.auth.getSessionInfo().user}, ['active','name','surname'], 'user').subscribe(
      res=> {
       
        if(res.data && res.data.length) {
          this.data = res.data[0];
          console.log('Datos recibidos:', this.data);
         
          if(this.data.active) {
             this.qr = document.getElementById('qrid');
             this.qr.style.display = 'block';
             document.getElementById('status').textContent = this.translateService.get('SUBSCRIPTION_ACTIVE');
             this.myAngularxQrCode = this.data.name + this.data.surname
          } else {
            document.getElementById('status').textContent = this.translateService.get('SUBSCRIPTION_DEACTIVE');
            this.dialogService.info(
              this.translateService.get('QR.ERROR_TITLE'),
              this.translateService.get('QR.ERROR_TEXT'));
          }
        }
      },
    )
  }
  ngAfterViewInit(){
    this.form.queryData({user_:this.auth.getSessionInfo().user});
  }
//   showQr() {
//     this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('users'));
//     this.ontimizeService.query({user_:this.auth.getSessionInfo().user}, ['active','name','surname'], 'user').subscribe(
//       res=> {
       
//         if(res.data && res.data.length) {
//           this.data = res.data[0];
//           console.log('Datos recibidos:', this.data);
         
//           if(this.data.active) {
//              this.qr = document.getElementById('qrid');
//              this.qr.style.display = 'block';
//              this.myAngularxQrCode = this.data.name + this.data.surname
//           } else {
//             this.dialogService.info('QR no generado',
//             'Tienes la suscripción caducada')
//           }
//         }
//       },
//     )
// }
 
}