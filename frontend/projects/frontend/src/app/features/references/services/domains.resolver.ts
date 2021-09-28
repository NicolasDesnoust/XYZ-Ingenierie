import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Domain } from '../model/domain';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsResolver implements Resolve<Domain[]> {
  constructor(private domainService: DomainService) {}

  resolve(): Observable<Domain[]> {
    return this.domainService.getAll().pipe(map((response) => response.items));
  }
}
