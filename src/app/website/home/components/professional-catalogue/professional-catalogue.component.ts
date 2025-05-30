import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-professional-catalogue',
  imports: [CommonModule],
  templateUrl: './professional-catalogue.component.html',
  styleUrls: ['./professional-catalogue.component.scss', '../../home.component.scss']
})
export class ProfessionalCatalogueComponent {
  @Input() section: any;
}
