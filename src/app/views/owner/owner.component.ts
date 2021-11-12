import {Component, OnInit} from '@angular/core';
import {OwnerService, OwnerEntity} from '../../services/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})

export class OwnerComponent implements OnInit {
  displayedColumns: string[] = ['aFirstName', 'aLastName', 'aMiddleName', 'amount'];
  dataSource: OwnerEntity[] = [];
  selectedOwnerId: OwnerEntity['id'] | undefined = undefined;

  constructor(private ownerService: OwnerService) {

  }

  ngOnInit(): void {
    this.ownerService.getOwners().subscribe(owners => this.dataSource = owners)
  }

  onRowClick(id: OwnerEntity['id']) {
    this.selectedOwnerId = id;
  }

  onDeleteButtonClick() {
    this.ownerService.deleteOwner(this.selectedOwnerId as number).subscribe(() => {
      const index = this.dataSource.findIndex(item => item.id === this.selectedOwnerId);
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    })
  }

}
