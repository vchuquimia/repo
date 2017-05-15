import { Component, Input } from '@angular/core';
@Component({
  selector: 'avatar',
  template: `
<div class="circle-badge" [ngStyle]="style" [ngClass]="styleClass">
  <strong>{{text}}</strong>
</div>`,
styles:[`.circle-badge {
  height: 2.4em;
  width: 2.4em;
  line-height:2.4em;
  text-align: center;
  border-radius: 50px;
  color:white;
}`]
}) export class AvatarComponent {
    @Input() text: string;
    @Input() size: number = 50;
    @Input() style: any;
    @Input() styleClass: any;
}
