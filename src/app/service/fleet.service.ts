import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Fleet} from '../model/fleet';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private firestore: AngularFirestore) {
  }

  getFleets() {
    return this.firestore.collection('fleets').snapshotChanges();
  }

  createFleet(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('fleets')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  updateFleet(data) {

    return this.firestore
      .collection('fleets')
      .doc(data.id)
      .set(data);
  }

  deleteFleet(data) {
    return this.firestore
      .collection('fleets')
      .doc(data.id)
      .delete();
  }


}
