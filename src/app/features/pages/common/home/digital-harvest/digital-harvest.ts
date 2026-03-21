import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelinePhase } from '@core/ui/types/timeline-phase/timeline-phase';
import { ICONS_DIGITAL_HARVEST } from '@core/ui/icons/icons-common/icons-home/icons.digital-harvest';
import { PhaseConnector } from './digital-harvest-components/phase-connector/phase-connector';
import { PhaseDetails } from './digital-harvest-components/phase-details/phase-details';
import { PhaseCard } from './digital-harvest-components/phase-card/phase-card';
import { Title } from "@shared/components/title/title";
import { Subtitle } from "@shared/components/subtitle/subtitle";
import PHASES_DATA from '@assets/files/home/digital-harvest.json';

@Component({
  selector: 'app-digital-harvest',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, PhaseConnector, PhaseDetails, PhaseCard, Title, Subtitle],
  templateUrl: './digital-harvest.html',
  styleUrls: ['./digital-harvest.css']
})

export class DigitalHarvest implements OnInit, OnDestroy {
  icons = ICONS_DIGITAL_HARVEST;

  activePhase = signal(0);

  phases: TimelinePhase[] = PHASES_DATA.map(phase => ({
    ...phase,
    icon: this.icons[phase.iconKey as keyof typeof ICONS_DIGITAL_HARVEST],
    stats: phase.stats.map(stat => ({
      ...stat,
      icon: this.icons[stat.iconKey as keyof typeof ICONS_DIGITAL_HARVEST]
    }))
  }));

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.startAutoRotation();
  }

  selectPhase(index: number): void {
    this.activePhase.set(index);
  }

  private startAutoRotation(): void {
    setInterval(() => {
      const current = this.activePhase();
      const next = (current + 1) % this.phases.length;
      this.activePhase.set(next);
    }, 10000);
  }

  getPhaseClasses(index: number): string {
    const isActive = this.activePhase() === index;
    return isActive ? 'scale-105 shadow-green-lg' : 'scale-100 opacity-70 hover:opacity-100';
  }

  getConnectorClasses(index: number): string {
    const isActive = this.activePhase() >= index;
    return isActive ? 'bg-primary scale-y-100' : 'bg-neutral-secondary scale-y-0';
  }
}