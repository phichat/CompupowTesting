import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../core/http.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { EmpAddr } from './emp-addr';

@Injectable()
export class EmpAddrService {
  api: string;
  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private httpService: HttpService
  ) {
    this.api = `${baseUrl}api/EmpAddr`
  }

  getByEmCode(emCode: string): Observable<EmpAddr> {
    const params = { emCode };
    return this.httpService.get(`${this.api}/GetByEmCode`, { params }).pipe(map(x => x.json()))
  }

  postEmAddr(form: EmpAddr) {
    return this.httpService.post(this.api, form);
  }

}
