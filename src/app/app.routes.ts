import { Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { HomePageComponent } from './website/homepage/homepage.component';
import { AboutComponent } from './website/about/about.component';
import { ManagementComponent } from './website/management/management.component';
import { TeamsComponent } from './website/teams/teams.component';
import { PartnersComponent } from './website/partners/partners.component';
import { SubscriptionsComponent } from './website/subscriptions/subscriptions.component';
import { CareerComponent } from './website/career/career.component';
import { ContactComponent } from './website/contact/contact.component';
import { NotFoundComponent } from './website/not-found/not-found.component';
import { VacancyComponent } from './website/vacancy/vacancy.component';
import { ServicesComponent } from './website/services/services.component';
import { CategoryDetailsComponent } from './website/services/category-details/category-details.component';
import { ServiceDetailsComponent } from './website/services/category-details/service-details/service-details.component';
import { SiteMapComponent } from './website/sitemap/sitemap.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { hideHeaderFooter: true }},
    { path: 'home', component: HomePageComponent},
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'service-category/:id', component: CategoryDetailsComponent },
    { path: 'service-category/:id/service/:service-id/name/:service-name', component: ServiceDetailsComponent },
    { path: 'management', component: ManagementComponent},
    { path: 'teams', component: TeamsComponent},
    { path: 'partners', component: PartnersComponent},
    { path: 'pricing', component: SubscriptionsComponent},
    { path: 'career', component: CareerComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'sitemap', component: SiteMapComponent},
    { path: 'vacancy', component: VacancyComponent },
    { path: '**', component: NotFoundComponent }
];
