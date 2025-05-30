import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-business',
  imports: [],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})

export class BusinessComponent {
  @Input() section: any;
}
