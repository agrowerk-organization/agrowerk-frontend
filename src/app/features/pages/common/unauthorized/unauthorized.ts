import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MeshGradient } from "../../../../shared/components/mesh-gradient/mesh-gradient";
import { Pattern } from "../../../../shared/components/pattern/pattern";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MeshGradient, Pattern],
  templateUrl: './unauthorized.html',
})
export class Unauthorized {

}
