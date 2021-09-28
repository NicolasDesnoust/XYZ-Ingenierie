import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reference } from '../model/reference';
import { ReferenceDetailPageActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

@Component({
  selector: 'app-reference-detail-page',
  template: `
    <app-reference-detail-card
      [reference]="selectedReference$ | async"
    ></app-reference-detail-card>
  `,
})
export class ReferenceDetailPageComponent implements OnDestroy {
  selectedReference$: Observable<Reference>;
  actionsSubscription: Subscription;

  constructor(
    private referenceFacade: ReferenceFacade,
    private route: ActivatedRoute
  ) {
    this.actionsSubscription = this.route.params
      .pipe(map((params) => params.id))
      .subscribe((id: number) => this.selectToShow(id));

    this.selectedReference$ = this.referenceFacade.selectedReference$;
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }

  /* --------------------------- Action dispatchers --------------------------- */

  selectToShow(id: number): void {
    this.referenceFacade.dispatch(
      ReferenceDetailPageActions.selectToShow({ id })
    );
  }
}
