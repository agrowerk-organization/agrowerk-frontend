import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Breadcrumb } from "../../../../shared/components/breadcrumb/breadcrumb";
import { ICONS_ABOUT_US } from '../../../../core/ui/icons/icons.about-us';
import { Title } from "../../../../shared/components/title/title";
import { Subtitle } from "../../../../shared/components/subtitle/subtitle";
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule, 
    Breadcrumb, 
    Title, 
    Subtitle, 
    MeshGradient, 
    Pattern],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  icons = ICONS_ABOUT_US;
}
