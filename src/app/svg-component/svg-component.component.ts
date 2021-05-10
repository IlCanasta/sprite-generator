import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'svg-component',
  templateUrl: './svg-component.component.html',
  styleUrls: ['./svg-component.component.scss']
})
export class SvgComponentComponent {

  @Input()
  iconClass: string;

  @Input()
  iconReference: string;

  iconHref = 'assets/sprite.svg#';

  constructor() { }



}
