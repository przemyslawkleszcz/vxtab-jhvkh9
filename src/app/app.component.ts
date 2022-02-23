import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DropboxService } from './dropbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private access_token: string;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public dropbox: DropboxService,
    private activatedRoute: ActivatedRoute
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.activatedRoute.fragment.subscribe((params) => {
        if (params == null) return;

        let fragments = params.split('&');
        let fragment = {};
        fragments.forEach((x) => {
          let y = x.split('=');
          fragment[y[0]] = y[1];
        });

        console.log(fragment);

        this.access_token = fragment['access_token'];
      });
    });
  }
  ngOnInit(): void {}

  loginToDropbox() {
    this.dropbox.login();
  }

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
