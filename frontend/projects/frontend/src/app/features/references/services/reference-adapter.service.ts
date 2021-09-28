import { Injectable } from '@angular/core';
import { Reference } from '../model/reference';

/**
 * Service responsable du mapping des entités de cette SPA vers
 * leur équivalent au format JSON (gérées par l'API REST) et vice-versa.
 */
@Injectable({
  providedIn: 'root',
})
export class ReferenceAdapter {
  getReferenceFromRawJson(rawReference: any): Reference {
    return {
      ...rawReference,
    };
  }

  getReferencesFromRawJson(rawReferences: any[]): Reference[] {
    return rawReferences.map((rawReference) =>
      this.getReferenceFromRawJson(rawReference)
    );
  }

  getRawJsonFromReference(reference: Reference): any {
    return {
      ...reference,
    };
  }
}
