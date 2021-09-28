import { GetAllOptions } from "./get-all-options";

/**
 * Représente le format standard des réponses aux requêtes
 * destinées à récupérer des collections d'entités.
 */
export interface GetAllResponse<T> {
  items: T[];
  totalCount: number;
  options: GetAllOptions<T>;
}
