import { CommonModule } from '@angular/common';
import { Component, input, Input, OnDestroy, OnInit } from '@angular/core';
import { Pillar } from '../../../../../../core/ui/types/login/pillar/pillar';

@Component({
  selector: 'app-feature-pillar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-pillar.html'
})
export class FeaturePillar implements OnInit, OnDestroy{
  featurePillars = input.required<Pillar[]>();
  @Input() autoRotate = true;
  @Input() rotationInterval = 4000;

  currentPillarIndex = 0;
  private pillarInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    const pillars = this.featurePillars;
    if (this.autoRotate && pillars.length > 1) {
      this.startPillarRotation();
    }
  }

  ngOnDestroy(): void {
    if (this.pillarInterval) {
      clearInterval(this.pillarInterval);
    }
  }

  get currentPillar(): Pillar {
    const pillars = this.featurePillars();
    return pillars[this.currentPillarIndex] || pillars[0];
  }

  private startPillarRotation(): void {
    const pillars = this.featurePillars();
    this.pillarInterval = setInterval(() => {
      this.currentPillarIndex = (this.currentPillarIndex + 1) % pillars.length;
    }, this.rotationInterval);
  }

  goToPillar(index: number): void {
    this.currentPillarIndex = index;
    
    if (this.autoRotate && this.pillarInterval) {
      clearInterval(this.pillarInterval);
      this.startPillarRotation();
    }
  }
}

