import React, { Component } from 'react'
import angular from '@angular/core';
import reactCore from '@ionic-native/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

export class Test extends Component {
state ={
    qrcode:''
}
showCamera =() =>{
    window.document.getElementById("root").classList.add('cameraView');
    console.log('Show Cam');
  }
hideCamera =()=>{
    window.document.getElementById("root").classList.remove('cameraView');
    console.log('Hide Cam');
}
    renderQrCodeScanner =()=>{
        let qrScanner =new QRScanner();
        this.showCamera();
        // Optionally request the permission early
        qrScanner.prepare()
        .then((status) => {
            if (status.authorized) {
            console.log('Camera Permission Given');
            this.scanSub = qrScanner.scan().subscribe((text) => {
              this.setState ({
             qrcode:text
              })
                qrScanner.hide();
                this.hideCamera();
               
            });
            qrScanner.show();
            } 
            else if (status.denied) {
              console.log('Camera permission denied');
            } 
            else {
              console.log('Permission denied for this runtime.');
            }
        })
        .catch((e) => console.log('Error is', e));
    }
  

    render() {
   
        return (
            <div>
<input type="text" onFocus={this.renderQrCodeScanner} value={this.state.qrcode}/>

            </div>
          )
    }
}

export default Test;
