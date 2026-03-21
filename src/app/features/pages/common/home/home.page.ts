import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { MeshGradient } from '@shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '@shared/components/pattern/pattern';
import { DigitalHarvest } from './digital-harvest/digital-harvest';
import { HarvestCycle } from './harvest-cycle/harvest-cycle';
import { Benefits } from "./benefits/benefits";
import { Testimonials } from "./testimonials/testimonials";
import { Statistics } from "./statistics/statistics";
import { FinalCta } from "./final-cta/final-cta";

@Component({
  selector: 'app-home.page',
  imports: [Hero, MeshGradient, Pattern, DigitalHarvest, HarvestCycle, Benefits, Testimonials, Statistics, FinalCta],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

}
