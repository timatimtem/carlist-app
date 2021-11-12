import {ICarOwnersService, OwnerEntity, OwnerService} from '../../services/owner.service';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

export class CarNumberValidator {
  static createValidator(ownerService: ICarOwnersService, exceptionCarNumber: string | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const carNumber: string = control.value;
      return ownerService.getOwners()
        .pipe(
          debounceTime(500),
          map((owners: OwnerEntity[]) => {
            let invalidCarNumber = owners.some(owner => owner.aCars.some(car => car.carNumber === carNumber && car.carNumber != exceptionCarNumber));
            return invalidCarNumber ? {invalidCarNumber} : {}
          })
        )
    };
  }
}
