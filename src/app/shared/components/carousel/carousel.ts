import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, ContentChild, ChangeDetectorRef, AfterViewInit, TemplateRef, inject } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html'
})
export class Carousel<T> implements OnInit, OnDestroy, AfterViewInit {

  @Input() items: T[] = [];
  @Input() autoplayDelay = 3500;
  @Input() showAutoplay = true;
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T}>

  currentIndex = 0;

  private autoplayInterval: number | undefined;
  private touchStartX = 0;
  private touchEndX = 0;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.currentIndex = 0;
  }

  ngAfterViewInit(): void {
    if (this.showAutoplay && this.items.length > 1) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.cdr.detectChanges();
    this.resetAutoplay();
  }

  prev(): void {
    this.currentIndex = this.currentIndex === 0
      ? this.items.length - 1
      : this.currentIndex - 1;
    this.cdr.detectChanges();
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.cdr.detectChanges(); 
    this.resetAutoplay();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  private startAutoplay(): void {
    this.autoplayInterval = window.setInterval(() => {
      this.next();
    }, this.autoplayDelay);
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      window.clearInterval(this.autoplayInterval);
      this.autoplayInterval = undefined;
    }
  }

  private resetAutoplay(): void {
    if (this.showAutoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
}
