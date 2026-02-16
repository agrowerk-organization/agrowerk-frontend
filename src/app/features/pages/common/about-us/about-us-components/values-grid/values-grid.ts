import { CommonModule } from '@angular/common';
import { Component, input, inject, signal, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardPages } from "../../../../../../shared/components/cards/card-pages/card-pages";
import { Value } from '../../../../../../core/ui/types/about-us/value';
import { Carousel } from '../../../../../../shared/components/carousel/carousel';

@Component({
  selector: 'app-values-grid',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    Carousel,
    CardPages],
  templateUrl: './values-grid.html',
})
export class ValuesGrid implements OnInit {
  values = input.required<Value[]>();

  private breakpoint = inject(BreakpointObserver);  

  isMobile = signal(false);

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }
}
