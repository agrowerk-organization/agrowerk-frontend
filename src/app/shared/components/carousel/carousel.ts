import { 
  Component, 
  input, 
  signal, 
  effect, 
  OnDestroy, 
  ContentChild, 
  TemplateRef, 
  AfterViewInit 
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html'
})
export class Carousel<T> implements OnDestroy, AfterViewInit {
  readonly items = input<T[]>([]);
  readonly autoplayDelay = input<number>(3500);
  readonly showAutoplay = input<boolean>(true);

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T }>;

  readonly currentIndex = signal<number>(0);

  private autoplayInterval: ReturnType<typeof setInterval> | undefined;
  private touchStartX = 0;

  constructor() {
    effect(() => {
      const count = this.items().length;
      if (count > 0 && this.currentIndex() >= count) {
        this.currentIndex.set(0);
      }
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit(): void {
    if (this.showAutoplay() && this.items().length > 1) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  next(): void {
    const count = this.items().length;
    if (count <= 1) return;
    this.currentIndex.update((val) => (val + 1) % count);
    this.resetAutoplay();
  }

  prev(): void {
    const count = this.items().length;
    if (count <= 1) return;
    this.currentIndex.update((val) => (val === 0 ? count - 1 : val - 1));
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.resetAutoplay();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    if (!touch) return;
    const touchEndX = touch.screenX;
    const diff = this.touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.autoplayDelay());
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval !== undefined) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = undefined;
    }
  }

  private resetAutoplay(): void {
    if (this.showAutoplay()) {
      this.startAutoplay();
    }
  }
}