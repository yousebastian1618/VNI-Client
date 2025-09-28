import {Component, computed, effect, Input, signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-introduction',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss'
})
export class Introduction {
  @Input() images: string[] = [];
  /** ms between slides (default 5s) */
  @Input() intervalTime = 5000;

  readonly index = signal(0);
  private paused = signal(false);
  private animate = signal(true);
  private timerId: any = null;

  containerTransform = computed(() => `translateX(-${this.index() * 100}%)`);
  transitionStyle  = computed(() => (this.animate() ? 'transform 1500ms ease' : 'none'));

  ngOnInit() { this.startAuto(); }
  ngOnDestroy() { this.stopAuto(); }

  selectImageIndex(i: number) {
    if (!this.images.length) return;
    this.animate.set(true);
    this.index.set(i % this.images.length);
    this.restartAuto();
  }

  pause()  { this.paused.set(true); }
  resume() { this.paused.set(false); }

  private next() {
    if (!this.images.length || this.paused()) return;
    this.animate.set(true);
    this.index.update(i => (i + 1) % this.images.length);
  }

  private startAuto() {
    this.stopAuto();
    if (this.images.length > 1 && this.intervalTime > 0) {
      this.timerId = setInterval(() => this.next(), this.intervalTime);
    }
  }

  private stopAuto() {
    if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
  }

  private restartAuto() { this.startAuto(); }

  getImages() {
    return this.images;
  }
}
