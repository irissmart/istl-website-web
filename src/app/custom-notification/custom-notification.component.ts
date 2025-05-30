import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-notification',
  standalone: true,
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss'],
  imports: [CommonModule]
})
export class CustomNotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  visible: boolean = true;

  close() {
    this.visible = false;
  }
}
