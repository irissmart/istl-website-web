import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-services',
  imports: [HeroComponent, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  serviceCategories: any[] = [];
  services: any[] = [];
  pages: any[] = [];
  sections: any[] = [];
  pageId: number = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllServiceCategory().subscribe({
      next: (response) => {
        if (response) {
          this.serviceCategories = response.map((serviceCategory: any) => ({
            id: serviceCategory.id,
            title: serviceCategory.serviceCategoryName,
            image: serviceCategory.imagePath ?? 'assets/default-avatar.png', 
            description: serviceCategory.description
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching section', err);
      }
    });
  

    this.apiService.getSectionsByPageId(3).subscribe({
      next: (response) => {
        this.sections = response.sections;
        this.pageId = response.pageId;
      },
      error: (err) => {
        console.error('Error fetching section', err);
      }
    });
  }

  navigateToDetails(categoryId: string) {
    this.router.navigate(['/service-category', categoryId]);
  }
}
