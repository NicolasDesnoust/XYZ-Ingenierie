import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Reference } from '../model/reference';
import { ReferenceEditPageActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';

@Component({
  selector: 'app-reference-edit-page',
  template: `
    <app-reference-edit-card
      [reference]="selectedReference$ | async"
    ></app-reference-edit-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceEditPageComponent implements OnInit, OnDestroy {
  selectedReference$: Observable<Reference> | undefined;
  actionsSubscription: Subscription | undefined;

  constructor(
    private referenceFacade: ReferenceFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam$ = this.route.params.pipe(map((params) => params.id));
    const blankReference$: Observable<any> = idParam$.pipe(
      filter((id) => !id),
      map(() => {})
    );

    this.selectedReference$ = merge(
      this.referenceFacade.selectedReference$,
      blankReference$
    ).pipe(tap(a => console.log("ref " +JSON.stringify(a))));

    this.actionsSubscription = idParam$.subscribe((id: number | null) => {
      if (id) {
        this.selectToEdit(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.actionsSubscription?.unsubscribe();
  }

  /* --------------------------- Action dispatchers --------------------------- */

  selectToEdit(id: number): void {
    this.referenceFacade.dispatch(
      ReferenceEditPageActions.selectToEdit({ id })
    );
  }
}
