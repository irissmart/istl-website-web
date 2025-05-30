import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from "../management/components/hero/hero.component";
import { WhoWeAreComponent } from "./components/who-we-are/who-we-are.component";
import { TeamComponent } from "./components/team/team.component";
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-management',
  imports: [CommonModule, FontAwesomeModule, HeroComponent, WhoWeAreComponent, TeamComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})

export class ManagementComponent {
  pages: any[] = [];
  section: any[] = [];
  pageId: number = 0;
  teamDataLoaded = false; 
  teamMembers: any[] = [];

  constructor(private ApiService: ApiService, private router: Router){}
    
    ngOnInit(): void {
      this.loadDataSequentially();
    };

    private loadDataSequentially(): void {
      this.ApiService.getSectionsByPageId(4).pipe(
        concatMap(sectionsResponse => {
          this.section = sectionsResponse.sections;
          this.pageId = sectionsResponse.pageId;
          console.log(this.section);
          return this.ApiService.getAllTeamMembers();
        })
      ).subscribe({
        next: (teamMembers) => {
          if (teamMembers) {
            this.teamMembers = teamMembers;
            this.teamDataLoaded = true;
          }
        },
        error: (err) => {
          console.error('Error loading data:', err);
        }
      });
    }
  

  navigateToDetails(serviceId: string) {
    this.router.navigate(['/services', serviceId]);
  }
}



