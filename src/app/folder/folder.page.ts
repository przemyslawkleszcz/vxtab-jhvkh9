import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DropboxService } from '../dropbox.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {
  depth: number = 0;
  folders: any;

  constructor(
    public navCtrl: NavController,
    public dropboxService: DropboxService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) {}

  // async ionViewDidLoad() {
  //   this.folders = [];

  //   let loading = await this.loadingController.create({
  //     message: 'Syncing from Dropbox...',
  //   });

  //   loading.present();

  //   this.dropboxService.getFolders().subscribe(
  //     (data: any) => {
  //       this.folders = data.entries;
  //       loading.dismiss();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // async ionViewDidEnter() {
  //   let loading = await this.loadingController.create({
  //     message: 'Syncing from Dropbox...',
  //   });

  //   loading.present();

  //   this.dropboxService.getFolders().subscribe(
  //     (data: any) => {
  //       this.folders = data.entries;
  //       loading.dismiss();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // async openFolder(path) {
  //   let loading = await this.loadingController.create({
  //     message: 'Syncing from Dropbox...',
  //   });

  //   await loading.present();

  //   this.dropboxService.getFolders(path).subscribe(
  //     (data: any) => {
  //       this.folders = data.entries;
  //       this.depth++;
  //       loading.dismiss();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // async goBack() {
  //   let loading = await this.loadingController.create({
  //     message: 'Syncing from Dropbox...',
  //   });

  //   await loading.present();

  //   this.dropboxService.goBackFolder().subscribe(
  //     (data: any) => {
  //       this.folders = data.entries;
  //       this.depth--;
  //       loading.dismiss();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
