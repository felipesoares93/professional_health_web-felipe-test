import { Injectable } from '@angular/core';

export interface IStorageItem {
  key: string;
  value: any;
}

export class StorageItem {
  key: string;
  value: any;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

// class for working with local storage in browser (common that can use other classes for store some data)
@Injectable()
export class LocalStorageHelper {
  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
  }

  private prefixKey(key:string, userId: string): string {
    if (userId != null) {
      return 'u_' + userId + '_' + key;
    } else {
      return key;
    }
  }

  // Set/ add value
  set(key: string, item: any, userId: string = null) {
    if (this.localStorageSupported) {
      try {
        localStorage.setItem(this.prefixKey(key, userId), item);
      } catch(e) {
        if (e.code == 22) {
          console.warn('localStorage quota exceeded!');
        }
      }
    }
  }

  setObject(key: string, item: any, userId: string = null) {
    this.set(this.prefixKey(key, userId), JSON.stringify(item));
  }

  // Get all values from storage (all items)
  getAllItems(): Array<StorageItem> {
    var list = new Array<StorageItem>();

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);

      list.push(new StorageItem({
        key: key,
        value: value
      }));
    }

    return list;
  }

  // Get only all values from localStorage
  getAllValues(): Array<any> {
    var list = new Array<any>();

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);

      list.push(value);
    }

    return list;
  }

  // get one item by key from storage
  get(key: string, userId: string = null): string {
    if (this.localStorageSupported) {
      let item = localStorage.getItem(this.prefixKey(key, userId));
      return item;
    } else {
      return null;
    }
  }

  getBoolean(key: string, userId: string = null): boolean {
    if (this.localStorageSupported) {
      let item: string = localStorage.getItem(this.prefixKey(key, userId));
      if (item == null)
        return null;

      return item == 'true';
    } else {
      return null;
    }
  }

  getObject(key: string, def?: any, userId: string = null): any {
    let obj = JSON.parse(this.get(this.prefixKey(key, userId)));

    if (obj == null && def != null)
      return def;
    else
      return obj;
  }

  // remove value from storage
  remove(key: string, userId: string = null) {
    if (this.localStorageSupported) {
      localStorage.removeItem(this.prefixKey(key, userId));
    }
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}

export class LocalStorageUtility {
  public static prefixKey(key:string, userId: string): string {
    if (userId != null) {
      return 'u_' + userId + '_' + key;
    } else {
      return key;
    }
  }

  static set(key: string, item: any, userId: string = null) {
    try {
      localStorage.setItem(LocalStorageUtility.prefixKey(key, userId), item);
    } catch(e) {
      if (e.code == 22) {
        console.warn('localStorage quota exceeded!');
      }
    }
  }

  static setObject(key: string, item: any, userId: string = null) {
    this.set(LocalStorageUtility.prefixKey(key, userId), JSON.stringify(item));
  }

  static get(key: string, userId: string = null): string | any {
    let item = localStorage.getItem(LocalStorageUtility.prefixKey(key, userId));

    if (['false', 'true'].indexOf(item) !== -1) {
      return item === 'true' ? true : false;
    }

    return item;
  }

  static getObject(key: string, def?: any, userId: string = null): any {
    let obj = JSON.parse(LocalStorageUtility.get(LocalStorageUtility.prefixKey(key, userId)));

    if (obj == null && def != null)
      return def;
    else
      return obj;
  }
}