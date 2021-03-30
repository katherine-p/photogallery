import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface fileFoto {
  name : string; //filepath
  path : string; //webviewpath
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlimagestorage : string[] = [];

  constructor(private afStorage : AngularFireStorage, public fotoService : FotoService) 
  {
     
  }


  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter()
  {
    await this.fotoService.loadFoto();
    this.tampildata();
  }

  hapusfoto()
  {
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.delete().then(() => {
          //menampilkan data
          this.tampildata();
        });
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  tampildata()
  {
    this.urlimagestorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.urlimagestorage.unshift(url)
        })
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  uploadfoto()
  {
    this.urlimagestorage = [];
    for (var index in this.fotoService.dataFoto)
    {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlimagestorage.unshift(url);
        });
      });
    }
  }

}
