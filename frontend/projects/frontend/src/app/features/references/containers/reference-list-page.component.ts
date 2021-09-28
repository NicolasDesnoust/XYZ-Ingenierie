import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllOptions } from '../../../core/model/get-all-options';
import { Reference } from '../model/reference';
import { ReferenceListPageActions } from '../store/actions';
import { ReferenceFacade } from '../store/reference.facade';


@Component({
  selector: 'app-reference-list-page',
  template: `
    <app-reference-list-card
      [references]="(references$ | async) || []"
    ></app-reference-list-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceListPageComponent implements OnInit {
  references$: Observable<Reference[]>;

  constructor(private referenceFacade: ReferenceFacade) {
    this.references$ = this.referenceFacade.references$;
  }

  ngOnInit(): void {
    this.load({});
  }

  /* --------------------------- Action dispatchers --------------------------- */

  load(loadOptions?: GetAllOptions<Reference>): void {
    this.referenceFacade.dispatch(
      ReferenceListPageActions.loadTablePage({ loadOptions })
    );
  }
}
