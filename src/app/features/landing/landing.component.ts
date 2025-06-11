import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
      CommonModule,
      HeroComponent,
      HeaderComponent,
      FooterComponent
    ],
    templateUrl: './landing.component.html'
  })
  export class LandingComponent {}
  