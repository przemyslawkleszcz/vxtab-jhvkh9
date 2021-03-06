import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  folderHistory: any = [];
  appKey: any;
  redirectURI: any;
  url: any;

  constructor(public http: HttpClient, public iab: InAppBrowser) {
    //OAuth
    this.appKey = 'zzd6orgceodowvj';
    this.redirectURI = 'http://localhost:8100/dashboard';
    this.url =
      'https://www.dropbox.com/1/oauth2/authorize?client_id=' +
      this.appKey +
      '&redirect_uri=' +
      this.redirectURI +
      '&response_type=token';
  }

  login() {
    this.iab.create(this.url, '_blank');
  }

  setAccessToken(token) {
    localStorage.setItem('vxtabtoken', token);
  }

  clearAccessToken() {
    localStorage.removeItem('vxtabtoken');
  }

  getAccessToken() {
    return localStorage.getItem('vxtabtoken');
  }

  validateToken() {
    return new Observable<boolean>((subscriber) => {
      var headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.getAccessToken(),
        'Content-Type': 'application/json',
      });

      return this.http
        .post('https://api.dropboxapi.com/2/check/user', '{"query": ""}', {
          headers: headers,
        })
        .subscribe(
          () => {
            subscriber.next(true);
          },
          (error) => {
            subscriber.next(false);
          }
        );
    });
  }

  download() {
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken(),
      'Dropbox-API-Arg': '{"path": "/data.json"}',
    });

    return this.http.post(
      'https://content.dropboxapi.com/2/files/download',
      '',
      { headers: headers }
    );
  }

  upload(obj) {
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken(),
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg':
        '{"path": "/data.json","mode": "overwrite","autorename": true,"mute": false}',
    });

    return this.http.post(
      'https://content.dropboxapi.com/2/files/upload',
      obj,
      { headers: headers }
    );
  }

  getFolders(path?) {
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken(),
      'Content-Type': 'application/json',
    });

    let folderPath;

    if (typeof path == 'undefined' || !path) {
      folderPath = {
        path: '',
      };
    } else {
      folderPath = {
        path: path,
      };

      if (this.folderHistory[this.folderHistory.length - 1] != path) {
        this.folderHistory.push(path);
      }
    }

    return this.http.post(
      'https://api.dropboxapi.com/2/files/list_folder',
      JSON.stringify(folderPath),
      { headers: headers }
    );
  }

  goBackFolder() {
    if (this.folderHistory.length > 0) {
      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1];

      return this.getFolders(path);
    } else {
      return this.getFolders();
    }
  }
}
