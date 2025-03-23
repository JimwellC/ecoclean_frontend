import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class FilterByTypePipe implements PipeTransform {
  transform(messages: any[], type: string): any[] {
    if (!type) return messages;
    return messages.filter(msg => msg.type === type);
  }
}
