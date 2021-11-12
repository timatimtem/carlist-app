import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

export interface OwnerEntity {
  id: number;
  aFirstName: string;
  aMiddleName: string;
  aLastName: string;
  aCars: CarEntity[];
}

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;

  getOwnerById(aId: number): Observable<OwnerEntity>;

  createOwner(
    aFirstName: string,
    aMiddleName: string,
    aLastName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

export interface CarEntity {
  carNumber: string;
  brand: string;
  model: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class OwnerService implements ICarOwnersService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private ownerUrl = 'api/owners';

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.ownerUrl)

  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    const url = `${this.ownerUrl}/${aOwnerId}`;
    return this.http.delete<OwnerEntity[]>(url, {headers: this.headers})

  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    const url = `${this.ownerUrl}/${aId}`;
    return this.http.get<OwnerEntity>(url)

  }

  createOwner(aFirstName: string,
              aMiddleName: string,
              aLastName: string,
              aCars: CarEntity[],
  ): Observable<OwnerEntity> {
    return this.http
      .post<OwnerEntity>(this.ownerUrl, {
        aFirstName: aFirstName,
        aMiddleName: aMiddleName,
        aLastName: aLastName,
        aCars: aCars
      }, {headers: this.headers})

  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    const url = `${this.ownerUrl}/${aOwner.id}`;
    return this.http
      .put<OwnerEntity>(url, aOwner, {headers: this.headers})

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error)
  }
}

