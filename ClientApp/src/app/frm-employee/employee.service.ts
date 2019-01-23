import { Injectable, Inject } from '@angular/core';
import { Employee, EmployeeDropdown } from './employee';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  api: string;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.api = `${baseUrl}api/Employee`
  }

  getSearchEmployee(term: string) {
    const params = { term }
    return this.http.get<EmployeeDropdown[]>(`${this.api}/SearchEmployee`, { params });
  }

  getEmployee(): Observable<Employee[]> {
    return this.httpService.get(this.api).pipe(map(x => x.json()));
  }

  postEmployee(form: any): Observable<Employee> {
    return this.httpService.post(this.api, form).pipe(map(x => x.json()));
  }

  putEmployee(form: any) {
    return this.httpService.put(this.api, form);
  }

  deleteEmployee(emCode: string) {
    const params = { emCode };
    return this.httpService.delete(this.api, { params })
  }

}
