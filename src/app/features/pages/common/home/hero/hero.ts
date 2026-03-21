import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InitialCta } from "./initial-cta/initial-cta";
import { Mockup } from './mockup/mockup';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, InitialCta, Mockup],
  templateUrl: './hero.html'
})

export class Hero {

}
