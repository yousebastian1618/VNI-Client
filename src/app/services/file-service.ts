import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class FileService extends Dexie {
  files!: Dexie.Table<{ id: string; file: any }, string>;
  constructor() {
    super('FileDatabase');
    this.version(1).stores({
      files: 'id'
    })
  }
  saveFile(id: string, file: any) {
    return this.files.put({ id, file });
  }
  async getFile(id: string): Promise<any | undefined> {
    try {
      const data = await this.files.get(id);
      return data?.file;
    } catch (error: any) {
      return null;
    }
  }
  removeFile(id: string) {
    return this.files.delete(id);
  }
  async clear() {
    await this.files.clear();
  }
}
