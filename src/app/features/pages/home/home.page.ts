import { Component } from '@angular/core';
import { MeshGradient } from "../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../shared/components/pattern/pattern";
import { Hero } from "./hero/hero";

@Component({
  selector: 'app-home.page',
  imports: [MeshGradient, Pattern, Hero],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

}
