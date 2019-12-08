import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Account: {},
  Reference: {}
};

const pluralNames = { /* Hero: 'Heroes' */ };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
