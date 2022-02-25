import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DropboxService } from './services/dropbox/dropbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public dropboxService: DropboxService,
    private activatedRoute: ActivatedRoute
  ) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      // splashScreen.hide();

      this.activatedRoute.fragment.subscribe((params) => {
        if (params == null) return;
        if (this.dropboxService.getAccessToken()) return;

        let fragments = params.split('&');
        let fragment = {};
        fragments.forEach((x) => {
          let y = x.split('=');
          fragment[y[0]] = y[1];
        });

        if (fragment['access_token'])
          this.dropboxService.setAccessToken(fragment['access_token']);
      });
    });
  }
  ngOnInit(): void {}

  loginToDropbox() {
    this.dropboxService.login();
  }

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'copy' },
    { title: 'Flashcards', url: '/flashcards', icon: 'copy' },
  ];
}
