import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgriculturalPracticeResponse } from '@core/types/agricultural-practice/agricultural-pratice.response';
import { PracticeType, PracticeTypeDesc, PracticeTypeColor } from '@core/enums/agricultural-practice-type';
import { UnitOfMeasure } from '@core/enums/unit-of-measure';
import { ICONS_AGRICULTURAL_PRACTICES } from '@core/ui/icons/icons-producer/icons-agricultural-practices/icons-agricultural-practices';

@Component({
  selector: 'app-agricultural-practice-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './agricultural-practice-card.html',
})
export class AgriculturalPracticeCard {
  practice = input.required<AgriculturalPracticeResponse>();

  readonly icons = ICONS_AGRICULTURAL_PRACTICES;

  typeLabel = computed(() =>
    PracticeTypeDesc[this.practice().practipeType as PracticeType] ?? this.practice().practipeType
  );

  typeColor = computed(() =>
    PracticeTypeColor[this.practice().practipeType as PracticeType] ?? 'text-primary border-primary'
  );

  unitLabel = computed(() => {
    const key = this.practice().unitOfMeasure as keyof typeof UnitOfMeasure;
    return UnitOfMeasure[key]?.abbreviation ?? this.practice().unitOfMeasure;
  });
}