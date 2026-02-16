import { Component } from '@angular/core';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons.about-us';

@Component({
  selector: 'app-plans',
  imports: [
    CommonModule,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    Breadcrumb
  ],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  icons = ICONS_ABOUT_US;
}
