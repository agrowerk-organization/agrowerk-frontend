import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons-about-us/icons.about-us';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    Breadcrumb
  ],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  icons = ICONS_ABOUT_US;
}
