import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@shared/hero/hero.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-service-details',
  imports: [CommonModule, HeroComponent, RouterModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})

export class ServiceDetailsComponent {
  serviceId!: number; 
  serviceName: string = '';
  relatedServices: any[] = [];
  clientService: any = {
    id: null,
    name: '',
    description: '',
    image: 'assets/default-image.jpg'
  };
  isLoading = true; 

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.serviceId = Number(this.route.snapshot.paramMap.get('service-id'));
    this.serviceName = this.route.snapshot.paramMap.get('service-name') || '';

    this.loadService();
    this.loadRelatedServices(); 
  }
  
  loadRelatedServices(): void {
    if (!this.serviceId || !this.serviceName) return;
    this.apiService.getClientRelatedService(this.serviceId, this.serviceName).subscribe({
      next: (response) => {
        if (response) {
          this.relatedServices = response.map((item: any) => ({
            id: item.id,
            serviceName: item.serviceName,
            imagePath: item.imagePath ?? 'assets/default-image.jpg',
            clientServiceCategoryId: item.clientServiceCategoryId
          }));
        }
      },
      error: (err) => {
        console.error('Error loading related services:', err);
      }
    });
  }

  loadService(): void {
    this.isLoading = true;
    this.apiService.getClientServiceById(this.serviceId).subscribe({
      next: (item) => {
        if (item) {
          this.clientService = {
            id: item.id,
            name: item.serviceName,
            description: item.description,
            image: item.imagePath ?? 'assets/default-image.jpg'
          };
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching service:', err);
        this.isLoading = false;
      }
    });
  }
}
