import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeroComponent } from "../../shared/hero/hero.component";
import { ClientsComponent } from "../about/components/clients/clients.component";
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule, HeroComponent, ClientsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})  
export class AboutComponent {
  pages: any[] = [];
  sections: any[] = [];
  pageId: number = 0;
  showClients = false;

  constructor(private apiService: ApiService, private router: Router) {}
  
    ngOnInit(): void {
      this.apiService.getSectionsByPageId(2).subscribe({
        next: (response) => {
          this.sections = response.sections;
          this.pageId = response.pageId;
          console.log(this.sections);
          if (this.sections.length >= 2) {
            this.showClients = true;
          }
        },
        error: (err) => {
          console.error('Error fetching section:', err);
        }
      }); 

      
    }

    navigateToDetails(serviceId: string){
      this.router.navigate(['/services', serviceId])
    }
}
