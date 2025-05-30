import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {
  isSpecificRoute: boolean = false;
  isDropdownOpen = false;
  faChevronDown = faChevronDown;
  isMenuOpen: boolean = false;
  isAboutMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleAboutMenu() {
    this.isAboutMenuOpen = !this.isAboutMenuOpen;
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSpecificRoute = ['/partners', '/teams', '/management', '/pricing'].includes(event.url);
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.isDropdownOpen = false;
  }
}
