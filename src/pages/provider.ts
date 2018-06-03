
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class ProviderProvider {
  private PATH = 'eventos/';
 
  constructor(private db: AngularFireDatabase) {
  }
 
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('event'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  save(contact: any) {
    return new Promise((resolve, reject) => {
      console.log(contact);
      if (contact.key) {
        console.log("eba");
        this.db.list(this.PATH)
          .update(contact.key, { event: contact.event, description: contact.description, dayEnds: contact.dayEnds })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        console.log(":(((((((((");

        this.db.list(this.PATH)
          .push({event: contact.event, description: contact.description })
          .then(() => resolve());
      }
    })
  }
}
