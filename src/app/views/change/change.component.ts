import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import {BehaviorSubject, Observable, pipe, of} from 'rxjs'
import {ActivatedRoute, ParamMap, Router} from '@angular/router'
import {OwnerService, OwnerEntity, CarEntity} from "../../services/owner.service";
import {map, debounceTime} from 'rxjs/operators';
import {CarNumberValidator} from "../../validators/carNumberValidator/carNumberValidator";

type ViewType = 'view' | 'edit';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})

export class ChangeComponent implements OnInit {
  displayedColumns: string[] = [];
  properties: FormArray;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  form: FormGroup;
  ownerForm: FormGroup;
  owner: OwnerEntity | undefined;
  routeParams: ParamMap;
  viewType: ViewType;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ownerService: OwnerService, private router: Router) {
    this.ownerForm = new FormGroup({
      id: new FormControl(null,),
      aFirstName: new FormControl('', [Validators.required]),
      aMiddleName: new FormControl('', [Validators.required]),
      aLastName: new FormControl('', [Validators.required])
    },);
    this.properties = fb.array([]);
    this.form = fb.group({carProperties: this.properties});
    this.routeParams = route.snapshot.paramMap;
    this.viewType = this.routeParams.get('viewType') as ViewType;
  }

  get carProperties(): FormArray {
    return this.form.get('carProperties') as FormArray;
  }

  ngOnInit(): void {
    this.displayedColumns = ['carNumber', 'brand', 'model', 'year'];
    if (this.viewType !== "view") {
      this.displayedColumns.push('action');
    }
    if (this.router.url !== "/owner/add") {
      const owner = Number(this.routeParams.get('id'));
      this.ownerService.getOwnerById(owner).subscribe(owner => {
        this.ownerForm.controls['id'].setValue(owner.id);
        this.ownerForm.controls['aFirstName'].setValue(owner.aFirstName);
        this.ownerForm.controls['aMiddleName'].setValue(owner.aMiddleName);
        this.ownerForm.controls['aLastName'].setValue(owner.aLastName);
        if (this.viewType === 'view') {
          this.ownerForm.disable();
        }
        owner.aCars.forEach((car: CarEntity) => {
          const carGroup = this.getCarPropertiesForm(car);
          if (this.viewType === 'view') {
            carGroup.disable();
          }
          this.properties.push(carGroup);
        });
        this.updateView()
      })
    } else {
      this.properties.push(this.getCarPropertiesForm());
      this.updateView()
    }
  }

  getCarPropertiesForm(car?: CarEntity) {
    return new FormGroup({
      carNumber: new FormControl(car?.carNumber || '', [
        Validators.pattern("[A-Z]{2}[0-9]{4}[A-Z]{2}"),
        Validators.required,
      ], CarNumberValidator.createValidator(this.ownerService, car ? car.carNumber : null)),
      brand: new FormControl(car?.brand || '', [Validators.required]),
      model: new FormControl(car?.model || '', [Validators.required]),
      year: new FormControl(car?.year || '', [
        Validators.min(1990),
        Validators.max(new Date().getFullYear()),
        Validators.required,
      ]),
    },);
  }

  addNewProperty() {
    this.properties.push(this.getCarPropertiesForm());
    this.updateView()
  }

  saveChanges() {
    this.validateAllFormFields(this.ownerForm);
    this.validateAllFormFields(this.properties);
    if (this.ownerForm.valid && this.properties.valid) {
      if (this.router.url === '/owner/add') {
        this.ownerService.createOwner(this.ownerForm.value.aFirstName, this.ownerForm.value.aMiddleName, this.ownerForm.value.aLastName, this.properties.value).subscribe()
      } else {
        this.ownerService.editOwner({...this.ownerForm.value, aCars: this.properties.value}).subscribe()
      }
      this.router.navigateByUrl('/');
    }
  }

  updateView() {
    this.dataSource.next(this.properties.controls);
  }

  validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  deleteCarProperty(index: number) {
    this.properties.removeAt(index);
    this.updateView()
  }

  goBack() {
    history.back();
  }
}
