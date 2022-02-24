import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { DropboxService } from '../../services/dropbox.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public dropboxService: DropboxService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}
}
