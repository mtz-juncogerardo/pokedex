import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { nameOfVar } from 'src/app/core/name-of-variable.function';
import { onChangesMapper } from 'src/app/core/on-changes-mapper.class';

@Component({
  selector: 'pokemon-search-box',
  templateUrl: './pokemon-search-box.component.html',
  styleUrls: ['./pokemon-search-box.component.scss'],
})
export class PokemonSearchBoxComponent implements OnChanges {
  dexNumber = 0;

  @Input() resetToDefault: boolean;
  @Output() onDexNumberEntered = new EventEmitter<number>();

  constructor() {
    this.resetToDefault = false;
  }

  onKeyUp($event: KeyboardEvent) {
    if ($event.keyCode === 13) {
      this.onDexNumberEntered.emit(this.dexNumber);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const myChanges = new onChangesMapper(changes, nameOfVar(this.resetToDefault));
    if (myChanges.expectedChange) {
      this.resetToDefault = myChanges.value;
    }
    if (this.resetToDefault) {
      this.dexNumber = 0
    }
  }
}
