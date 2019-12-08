import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, type: string): any[] {
    if (!items) {
        return [];
    }
    if (!searchText || !type) {
        return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter( it => {
        return String(it[type]).toLowerCase().includes(searchText);
    });
   }
}