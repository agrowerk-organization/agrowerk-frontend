import { CommonModule } from '@angular/common';
import {
  Component, computed, input, output,
  inject, NgZone, OnInit, OnDestroy, signal
} from '@angular/core';
import { Cycle } from '../../../../core/ui/types/cycle/cycle';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ICONS_HARVEST_CYCLE } from '../../../../core/ui/icons/icons-common/icons-home/icons.harvest-cycle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cycle-node',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cycle-node.html',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CycleNode implements OnInit, OnDestroy {
  node = input.required<Cycle>();
  isSelected = input<boolean>(false);
  isHovered = input<boolean>(false);

  nodeClick = output<number>();
  nodeHover = output<number | null>();

  private ngZone = inject(NgZone);
  private resizeObserver!: ResizeObserver;

  private windowWidth = signal(window.innerWidth);

  isMobile = computed(() => this.windowWidth() < 768);

  icons = ICONS_HARVEST_CYCLE;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.windowWidth.set(window.innerWidth);
      });
      this.resizeObserver.observe(document.body);
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  position = computed(() => {
    const angle = this.node().angle;
    const radius = this.isMobile() ? 32 : 38; 
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: `calc(50% + ${radius * Math.cos(radian)}%)`,
      y: `calc(50% + ${radius * Math.sin(radian)}%)`
    };
  });
  
  labelPosition = computed(() => '-45%');

  lineLength = computed(() => Math.round(1000 * 0.40));

  lineTransform = computed(() => {
    const angle = this.node().angle;
    return `translate(-50%, -50%) rotate(${angle + 90}deg)`;
  });

  nodeSize = computed(() => {
    const mobile = this.isMobile();
    const selected = this.isSelected();
    if (mobile) return selected ? 80 : 64;
    return selected ? 120 : 96;
  });

  glowShadow = computed(() => {
    if (!this.isSelected()) return 'none';
    const c = this.node().color;
    return `0 0 30px ${c}80, 0 0 60px ${c}40`;
  });

  getGlassStyle = computed(() => {
    const color = this.node().color;
    const selected = this.isSelected();
    const rgb = this.hexToRgb(color);

    return {
      'background': selected
        ? `linear-gradient(135deg, rgba(${rgb.r},${rgb.g},${rgb.b},0.6) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},0.2) 100%)`
        : `linear-gradient(135deg, rgba(${rgb.r},${rgb.g},${rgb.b},0.35) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},0.1) 100%)`,
      'border': selected
        ? `1.5px solid rgba(255,255,255,0.4)`
        : `1px solid rgba(255,255,255,0.15)`,
      'box-shadow': selected
        ? `0 12px 40px 0 rgba(0,0,0,0.3), 0 0 20px 0 rgba(${rgb.r},${rgb.g},${rgb.b},0.4), inset 0 1px 2px 0 rgba(255,255,255,0.03)`
        : `0 8px 32px 0 rgba(0,0,0,0.25), inset 0 1px 1px 0 rgba(255,255,255,0.2)`,
      'transition': 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      'will-change': 'transform' 
    };
  });

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 0, g: 0, b: 0 };
  }

  emoji = computed(() => {
    const label = this.node().label.toLowerCase();
    const emojis: Record<string, IconDefinition> = {
      'planejamento': this.icons.CLIPBOARD_LIST,
      'plantio': this.icons.SEEDLING,
      'manejo': this.icons.TRACTOR,
      'colheita': this.icons.WHEAT_AWN,
      'estoque': this.icons.BOX,
      'negociação': this.icons.HANDSHAKE
    };
    return emojis[label] ?? this.icons.GEAR;
  });
}