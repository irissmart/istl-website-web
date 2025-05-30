import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, RouterLink],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.scss'
})
export class SiteMapComponent {

  section: any = {};
  pageId: number = 0;

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.loadBannerSectionImage();
  }

  loadBannerSectionImage(): void {
    this.apiService.getSectionsByPageId(11).subscribe({
      next: (response) => {
        this.section = response.sections;
        this.pageId = response.pageId;
        
      },
      error: (err) => {
        console.error('Error fetching section:', err);
      }
    });
  }


}