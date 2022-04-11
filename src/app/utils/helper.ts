import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class Helper {
  public maskFormat(value: string, mask: string): string {
    value = value.replace(/([^0-9])/g, '');
    let newValue = value.split('');
    let result = mask.split('').map((val) => {
      if (newValue.length) {
        return val === '#' ? newValue.shift() : val;
      }
      return '';
    });
    return result.join('');
  }
}
