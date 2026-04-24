import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UnitOfMeasure } from '@core/enums/unit-of-measure';
import { ToxicologicalClass } from '@core/enums/toxicological-class';
import { ButtonPages } from '@shared/components/buttons/button-pages/button-pages';
import { InputResponse } from '@core/types/input/input.response';
import { ICONS_ADMIN_INPUTS } from '@core/ui/icons/icons-admin/icons-admin-inputs/icons-admin-inputs';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@shared/components/badge/badge';

@Component({
  selector: 'app-input-card',
  standalone: true,
  imports: [
    CurrencyPipe, 
    FontAwesomeModule, 
    ButtonPages,
    Badge
  ],
  templateUrl: './input-card.html'
})
export class InputCard {
  readonly input = input.required<InputResponse>();
  readonly edit = output<InputResponse>();
  readonly deactivate = output<string>();
  readonly icons = ICONS_ADMIN_INPUTS;

  readonly formattedUnit = computed(() => {
    const key = this.input().unitOfMeasure;
    const unit = UnitOfMeasure[key as keyof typeof UnitOfMeasure];
    return unit ? `${unit.description} (${unit.abbreviation})` : key;
  });

  readonly formattedToxClass = computed(() => {
    const key = this.input().toxicologicalClass;
    const cls = ToxicologicalClass[key as keyof typeof ToxicologicalClass];
    return cls?.description ?? key;
  });

  readonly codeBadges = computed(() => {
    const input = this.input();
    return [
      input.internalCode    && { icon: this.icons.BARCODE, text: `Interno: ${input.internalCode}` },
      input.manufacturerCode && { icon: this.icons.INDUSTRY, text: `Fab.: ${input.manufacturerCode}` },
      input.mapaRegistration && { icon: this.icons.CERTIFICATE, text: `MAPA: ${input.mapaRegistration}` },
    ].filter(Boolean) as { icon: IconDefinition; text: string }[];
  });

  readonly toxColor = computed(() => {
    const map: Record<string, string> = {
      'I':   'text-red-400 border-red-500/70 bg-red-950/60 shadow-red-900/30',
      'II':  'text-orange-400 border-orange-500/70 bg-orange-950/60 shadow-orange-900/30',
      'III': 'text-yellow-400 border-yellow-500/70 bg-yellow-950/60 shadow-yellow-900/30',
      'IV':  'text-green-400 border-green-500/70 bg-green-950/60 shadow-green-900/30',
    };
    return map[this.input().toxicologicalClass] 
      ?? 'text-primary border-primary/90 bg-black/20 shadow-primary/30';
  });

  readonly stockStatus = computed(() => {
    const { minimumStock, maximumStock } = this.input();
    if (!minimumStock && !maximumStock) return null;
    return { min: minimumStock, max: maximumStock };
  });

  readonly priceInfo = computed(() => {
    const { averagePurchasePrice, lastPurchasePrice } = this.input();
    if (!averagePurchasePrice && !lastPurchasePrice) return null;
    return { avg: averagePurchasePrice, last: lastPurchasePrice };
  });

}
