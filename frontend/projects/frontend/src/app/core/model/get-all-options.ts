import { SortDirection } from "@angular/material/sort";

/**
 * Représente les options que peuvent prendre en paramètres les requêtes
 * destinées à récupérer des collections d'entités.
 */
export interface GetAllOptions<T> {
  filter?: string;
  _sort?: keyof T;
  _order?: SortDirection;
  _page?: number; // ! Start to 1
  _limit?: number;
}
