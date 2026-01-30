import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { MeshGradient } from '../../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../../shared/components/pattern/pattern';
import { DigitalHarvestTimelineComponent } from './digital-harvest/digital-harvest';
import { HarvestCycleDiagramComponent } from './harvest-cycle/harvest-cycle';

@Component({
  selector: 'app-home.page',
  imports: [Hero, MeshGradient, Pattern, DigitalHarvestTimelineComponent, HarvestCycleDiagramComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

}
