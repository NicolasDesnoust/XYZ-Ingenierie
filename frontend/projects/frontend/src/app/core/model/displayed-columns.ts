interface DisplayedColumnsProperties {
  label: string;
  // * displayedAuto is used to tell if a column is displayed automatically in a
  // * *ngFor loop or manually, outside of it
  displayedAuto: boolean;
}

export type DisplayedColumns<T> = Partial<
  Record<keyof T | 'actions', DisplayedColumnsProperties>
>;
