import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Account: {},
  Reference: {},
};

const pluralNames = {};

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
