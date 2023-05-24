import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-bars',
  templateUrl: './skill-bars.component.html',
  styleUrls: ['./skill-bars.component.scss']
})
export class SkillBarsComponent {

  @Input()statValue: any;
  @Input()statName: string;

  constructor() {
    this.statValue = '';
    this.statName = '';
  }
}
