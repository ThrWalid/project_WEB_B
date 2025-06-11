import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavigationItem {
  label: string;
  route?: string;
  children?: NavigationItem[];
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /* ---------- state ---------- */
  isMenuOpen = false;
  activeDropdown: string | null = null;
  currentLanguage = 'fr';
  isScrolled = false;
  isLoggedIn = false;

  /* ---------- static data ---------- */
  languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English',  flag: 'EN' },
    { code: 'de', name: 'Deutsch',  flag: '🇩🇪' }
  ];

  navigationItems: NavigationItem[] = [
    { label: 'Accueil',     route: '/landing' },
    {
      label: 'Mes Cours',
      children: [
        { label: 'Cours Actuels',  route: '/courses/current'   },
        { label: 'Cours Terminés', route: '/courses/completed' },
        { label: 'Catalogue',      route: '/courses/browse'    }
      ]
    },
    {
      label: 'Évaluations',
      children: [
        { label: 'Examens',      route: '/assessments/upcoming'    },
        { label: 'Résultats',    route: '/assessments/results'     },
        { label: 'Certificats',  route: '/assessments/certificates'}
      ]
    },
    {
      label: 'Ressources',
      children: [
        { label: 'Bibliothèque', route: '/library' },
        { label: 'Outils',       route: '/tools'   },
        { label: 'Support',      route: '/support' }
      ]
    }
  ];

  /* ---------- lifecycle ---------- */
  ngOnInit(): void {}

  /* ---------- scroll: shrink shadow ---------- */
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }

  /* ---------- click outside dropdown ---------- */
  @HostListener('document:click', ['$event'])
  onDocClick(ev: Event): void {
    const target = ev.target as HTMLElement;
    if (!target.closest('.dropdown-container')) this.activeDropdown = null;
  }

  /* ---------- ui helpers ---------- */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.activeDropdown = null;
  }

  toggleDropdown(id: string): void {
    this.activeDropdown = this.activeDropdown === id ? null : id;
  }

  changeLanguage(code: string): void {
    this.currentLanguage = code;
    this.activeDropdown = null;
  }

  onLogin(): void {
    this.isLoggedIn = true;       // just a demo apres nhydoh ! 

    this.activeDropdown = null;
  }

  onLogout(): void {
    this.isLoggedIn = false;
    this.activeDropdown = null;
  }

  getCurrentLanguage(): Language {
    return (
      this.languages.find(l => l.code === this.currentLanguage) ||
      this.languages[0]
    );
  }
}
