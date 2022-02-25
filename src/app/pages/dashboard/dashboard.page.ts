import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DropboxService } from '../../services/dropbox/dropbox.service';
import {
  DatabaseService,
  IData,
} from 'src/app/services/database/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public items: { key: string; value: IData }[];

  constructor(
    public navCtrl: NavController,
    public dropboxService: DropboxService,
    public loadingController: LoadingController,
    public databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.items = await this.databaseService.getAll();
  }

  export() {
    this.databaseService.exportToDropbox();
  }

  async import() {
    this.databaseService.importToDb().subscribe(async (result) => {
      this.items = await this.databaseService.getAll();
    });
  }
}
