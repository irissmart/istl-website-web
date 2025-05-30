import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-subscriptions',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {

  faCheckCircle = faCheckCircle

  subscriptions = [
    {
      name: 'Basic',
      price: '$2,500/month',
      description: 'Figma ipsum component variant main layer. Background clip bullet editor outline. Component ipsum component variant main layer. Background clip bullet editor outline.',
      features: [
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Allow 1-5 Users',
        'Allow 1-5 Users'
      ]
    },
    {
      name: 'Standard',
      price: '$2,500/month',
      description: 'Figma ipsum component variant main layer. Background clip bullet editor outline. Component ipsum component variant main layer. Background clip bullet editor outline.',
      features: [
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Allow 1-5 Users',
        'Allow 1-5 Users'
      ]
    },
    {
      name: 'Premium',
      price: '$2,500/month',
      description: 'Figma ipsum component variant main layer. Background clip bullet editor outline. Component ipsum component variant main layer. Background clip bullet editor outline.',
      features: [
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Figma Ipsum Component',
        'Allow 1-5 Users',
        'Allow 1-5 Users'
      ]
    }
  ];
}
