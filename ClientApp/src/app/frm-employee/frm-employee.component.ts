import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { getDate, getTime, setTimezoneOffset, splitTime } from '../app.helper';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../app.message';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-frm-employee',
  templateUrl: './frm-employee.component.html',
  styleUrls: ['./frm-employee.component.css']
})
export class FrmEmployeeComponent implements OnInit {

  getDate = getDate;
  getTime = getTime;
  employeeFG: FormGroup;
  smpt = new Date();
  usr = 'พิเชษฐ'
  employeeTable: Employee[];

  constructor(
    private sEmployee: EmployeeService,
    private toastr: ToastrService
  ) {
    this.employeeFG = this.createFormGroup();
  }

  ngOnInit() {
    this.sEmployee.getEmployee().subscribe(x => {
      this.employeeTable = x;
    })
  }

  createFormGroup() {
    return new FormGroup({
      emCode: new FormControl(),
      emTname: new FormControl(),
      emEname: new FormControl(),
      emBirthdate: new FormControl(),
      emChild: new FormControl(),
      usr: new FormControl(this.usr),
      smpt: new FormControl(setTimezoneOffset(this.smpt))
    })
  }

  onCreate() {
    if (this.employeeFG.invalid) {
      this.toastr.error(Message.pleaseCheckForm);
      return
    };

    this.sEmployee.postEmployee(this.employeeFG.value)
      .subscribe((x) => {
        this.toastr.success(Message.saveComplete);
        this.employeeTable.push(x);
        this.employeeFG.reset();
      }, () => {
        this.toastr.error(Message.saveFail);
      })
  }

  onEdit() {
    if (!confirm(Message.confirmUpdate)) return;

    if (this.employeeFG.invalid) {
      this.toastr.error(Message.pleaseCheckForm);
      return
    };

    const form = <Employee>this.employeeFG.value;
    this.sEmployee.putEmployee(form)
      .subscribe(() => {
        this.toastr.success(Message.updateComplete);
        this.employeeTable.filter(x => x.emCode == form.emCode)
          .map(x => {
            x.emCode = form.emCode;
            x.emTname = form.emTname;
            x.emEname = form.emEname;
            x.emBirthdate = form.emBirthdate;
            x.emChild = form.emChild | 0;
          });
        this.employeeFG.reset();
      }, () => {
        this.toastr.error(Message.upateFail);
      });
  }

  onDelete() {
    if (!confirm(Message.confirmDelete)) return;

    const form = <Employee>this.employeeFG.value;
    if (!form.emCode) {
      this.toastr.error(Message.pleaseCheckForm);
      return;
    };

    this.sEmployee.deleteEmployee(form.emCode)
      .subscribe(() => {
        this.toastr.success(Message.deleteComplete);
        this.employeeTable = this.employeeTable.filter(x => x.emCode != form.emCode);
        this.employeeFG.reset();

      }, () => {
        this.toastr.error(Message.deleteFail);
      });
  }

  onSelectRow(emCode: string) {
    if (!emCode) return;
    const em = this.employeeTable.find(e => e.emCode == emCode);

    this.employeeFG.patchValue({
      emCode: em.emCode,
      emTname: em.emTname,
      emEname: em.emEname,
      emBirthdate: em.emBirthdate ? splitTime(setTimezoneOffset(em.emBirthdate)) : null,
      emChild: em.emChild,
      usr: this.usr,
      smpt: setTimezoneOffset(new Date())
    })
  }



}
