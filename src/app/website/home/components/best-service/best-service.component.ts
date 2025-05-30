import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-best-service',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './best-service.component.html',
  styleUrls: ['../../home.component.scss', './best-service.component.scss']
})
export class BestServiceComponent {
  @Input() section: any;
  
  faCircleCheck = faCircleCheck;
}
