import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { MeshGradient } from '../../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../../shared/components/pattern/pattern';
import { DigitalHarvest } from './digital-harvest/digital-harvest';
import { HarvestCycle } from './harvest-cycle/harvest-cycle';
import { Benefits } from "./benefits/benefits";

@Component({
  selector: 'app-home.page',
  imports: [Hero, MeshGradient, Pattern, DigitalHarvest, HarvestCycle, Benefits],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

}
