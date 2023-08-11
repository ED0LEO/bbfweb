import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private currentStyle: string = 'default'; // Default style

  getCurrentStyle(): string {
    return this.currentStyle;
  }

  setCurrentStyle(style: string): void {
    this.currentStyle = style;
  }
}
