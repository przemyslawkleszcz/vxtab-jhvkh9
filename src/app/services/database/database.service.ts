import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DropboxService } from '../dropbox/dropbox.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable, from, forkJoin } from 'rxjs';
import * as _ from 'lodash';

export interface IData {
  header: string;
  notes: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private storage: Storage, private dropbox: DropboxService) {
    this.storage.create();
  }

  //TODO: sqlite for mobiles
  async exportToDropbox() {
    let obj = {};
    await this.storage.forEach((value, key, index) => {
      obj[key] = value;
    });

    this.dropbox.upload(obj).subscribe((x) => {
      //TODO: Show succes or error
      console.log(x);
    });
  }

  importToDb() {
    return new Observable((subscriber) =>
      this.dropbox.download().subscribe((x) => {
        if (x) {
          this.storage.clear();
          let observables: Observable<any>[] = [];
          for (const key in x) {
            const promise = this.storage.set(key, x[key]);
            const observable = from(promise);
            observables.push(observable);
          }

          forkJoin(observables).subscribe(() => {
            subscriber.next();
          });
        }
      })
    );
  }

  //TODO: Add overloads for files
  add(value: IData) {
    const guid = uuidv4();
    this.storage.set(guid, value);
  }

  get(key: string) {
    this.storage.get(key);
  }

  remove(key: string) {
    this.storage.remove(key);
  }

  update(items: { key: string; value: IData }[]) {
    for (var i = 0; i < items.length; i++) {
      items[i].value.order = i;
      this.storage.set(items[i].key, items[i].value);
    }
  }

  async getAll(): Promise<{ key: string; value: IData }[]> {
    let tab: { key: string; value: IData }[] = [];
    await this.storage.forEach((value, key, index) => {
      var obj = { key: key, value: value };
      tab.push(obj);
    });

    tab = _.sortBy(tab, (element) => element.value.order);

    return new Promise<{ key: string; value: IData }[]>((resolve) => {
      resolve(tab);
    });
  }
}
