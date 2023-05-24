import { SimpleChanges } from '@angular/core';

export class onChangesMapper {
  readonly value: any;
  readonly expectedChange: boolean;

  constructor(changes: SimpleChanges, variableName: string) {
    this.expectedChange = this.validateChange(changes, variableName);
    if (!this.expectedChange){
        return;
    }
    this.value = changes[variableName].currentValue;
  }

  private validateChange(changes: SimpleChanges, variableName: string): boolean {
    if (changes.hasOwnProperty(variableName) &&
        changes[variableName].currentValue !== changes[variableName].previousValue) {
      return true;
    }
    return false;
  }
}
