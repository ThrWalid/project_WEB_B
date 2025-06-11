import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-footer',
  standalone: true, // <= هادي ضرورية
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}

