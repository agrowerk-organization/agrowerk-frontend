import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons-common/icons-about-us/icons.about-us';

@Component({
  selector: 'app-help-and-support',
  imports: [
    CommonModule,
    Title,
    Subtitle,
    MeshGradient,
    Pattern,
    Breadcrumb
  ],
  templateUrl: './help-and-support.html',
  styleUrl: './help-and-support.css',
})
export class HelpAndSupport {
  icons = ICONS_ABOUT_US;
}
