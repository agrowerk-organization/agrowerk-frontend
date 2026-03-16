import { CommonModule } from '@angular/common';
import { Component, input, signal, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamMember } from '../../../../../../core/ui/types/about-us/team-member';
import { ICONS_ABOUT_US } from '../../../../../../core/ui/icons/icons-common/icons-about-us/icons.about-us';
import { CardPerson } from "../../../../../../shared/components/cards/card-person/card-person";
import { Carousel } from '../../../../../../shared/components/carousel/carousel';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    Carousel,
    CardPerson],
  templateUrl: './team.html'
})
export class Team implements OnInit {
  icons = ICONS_ABOUT_US;
  team = input.required<TeamMember[]>(); 

  private breakpoint = inject(BreakpointObserver);  

  isMobile = signal(false);

  ngOnInit(): void {
    this.breakpoint.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }
}
