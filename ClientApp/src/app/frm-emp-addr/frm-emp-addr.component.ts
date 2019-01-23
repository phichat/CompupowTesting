import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { distinctUntilChanged, tap, debounceTime, switchMap } from 'rxjs/operators';
import { EmpAddrService } from './emp-addr.service';
import { EmployeeDropdown } from '../frm-employee/employee';
import { EmployeeService } from '../frm-employee/employee.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Message } from '../app.message';
import { ToastrService } from 'ngx-toastr';
import { Addresses } from './emp-addr';

@Component({
  selector: 'app-frm-emp-addr',
  templateUrl: './frm-emp-addr.component.html',
  styleUrls: ['./frm-emp-addr.component.css']
})
export class FrmEmpAddrComponent implements OnInit {

  constructor(
    private sEmployee: EmployeeService,
    private sEmpAddr: EmpAddrService,
    private chRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  empAddrFG: FormGroup;
  emTypeahead = new EventEmitter<string>();
  emDropdown = new Array<EmployeeDropdown>();
  usr = 'พิเชษฐ'

  get Address(): FormArray {
    return this.empAddrFG.get('address') as FormArray;
  }

  ngOnInit() {
    this.empAddrFG = this.createFormGroup();
    this.searchEmployee();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      emCode: new FormControl(),
      usr: new FormControl(this.usr),
      smrt: new FormControl(),
      address: this.createAddressArray()
    })
  }

  createAddressArray() {
    let arr = new FormArray([]);
    for (let index = 1; index <= 2; index++) {
      arr.push(
        this.fb.group({
          emType: new FormControl(index),
          emAddr1: new FormControl(),
          emAddr2: new FormControl(),
        })
      );
    };
    return arr;
  }

  searchEmLoading = false;
  searchEmLoadingTxt = '';
  searchEmployee() {
    this.emTypeahead.pipe(
      tap(() => {
        this.searchEmLoading = true;
        this.searchEmLoadingTxt = 'รอสักครู่...'
      }),
      distinctUntilChanged(),
      debounceTime(100),
      switchMap(term => this.sEmployee.getSearchEmployee(term))
    ).subscribe(x => {
      this.chRef.markForCheck();
      this.searchEmLoading = false;
      this.searchEmLoadingTxt = '';
      this.emDropdown = x;
    }, () => {
      this.searchEmLoading = false;
      this.searchEmLoadingTxt = '';
      this.emDropdown = new Array<EmployeeDropdown>();
    });
  }

  getEmpAddrByCode(e: EmployeeDropdown) {
    this.sEmpAddr.getByEmCode(e.emCode).subscribe(x => {
      this.empAddrFG.patchValue({
        emCode: x.emCode,
        usr: x.usr || this.usr
      })

      x.address.map(_x => {
        const addrIndex = this.Address.value.findIndex((__x: Addresses) => __x.emType == _x.emType);
        if (addrIndex >= 0) {
          this.Address.at(addrIndex).patchValue({
            emAddr1: _x.emAddr1,
            emAddr2: _x.emAddr2
          });
        }
      });
    }, () => {
      this.toastr.error(Message.saveFail);
    });
  }

  onSave() {
    this.sEmpAddr.postEmAddr(this.empAddrFG.value)
      .subscribe(() => {
        this.toastr.success(Message.saveComplete);
        this.empAddrFG.patchValue({
          emCode: null
        });

        for (let i = 0; i < this.Address.length; i++) {
          this.Address.at(i).patchValue({
            emAddr1: null,
            emAddr2: null
          })
        }
      }, () => {
        this.toastr.error(Message.saveFail);
      });
  }
}


