import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Account } from '../core';

@Injectable({ providedIn: 'root' })
export class AccountService extends EntityCollectionServiceBase<Account> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Account', serviceElementsFactory);
  }
}
