import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InitialCta } from "./initial-cta/initial-cta";
import { Mockup } from './mockup/mockup';
import { MeshGradient } from '../../../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../../../shared/components/pattern/pattern';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, InitialCta, Mockup, MeshGradient, Pattern],
  templateUrl: './hero.html'
})

export class Hero {

}
