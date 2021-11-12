import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})

export class InMemOwnerService implements InMemoryDbService {
  createDb() {
    let owners = [
      {
        id: 1, aFirstName: 'test', aLastName: 'testing', aMiddleName: 'tetovich', aCars: [{
          carNumber: 'AA1234AA', brand: 'Avto', model: 'Avtomobile', year: 2000,
        }]
      },

      {
        id: 2, aFirstName: 'test', aLastName: 'test', aMiddleName: 'test', aCars: [
          {
            carNumber: 'AA1235AA', brand: 'Avto', model: 'Avtomobile', year: 2009,
          }]
      },

      {
        id: 3, aFirstName: 'test', aLastName: 'test', aMiddleName: 'test', aCars: [
          {
            carNumber: 'AA1236AA', brand: 'Avto', model: 'Avtomobile', year: 2010,
          }]
      },

      {
        id: 4, aFirstName: 'test', aLastName: 'test', aMiddleName: 'test', aCars: [
          {
            carNumber: 'AA1237AA', brand: 'Avto', model: 'Avtomobile', year: 2010,
          }]
      },

      {
        id: 5, aFirstName: 'test', aLastName: 'test', aMiddleName: 'test', aCars: [
          {
            carNumber: 'AA1238AA', brand: 'Avto', model: 'Avtomobile', year: 2010,
          }]
      }
      
      
    ];
    return {owners};
  }
}
