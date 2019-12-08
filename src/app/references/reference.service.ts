import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Reference } from '../core';

@Injectable({ providedIn: 'root' })
export class ReferenceService extends EntityCollectionServiceBase<Reference> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Reference', serviceElementsFactory);
  }
}
