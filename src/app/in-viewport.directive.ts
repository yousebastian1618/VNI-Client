import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true,
})
export class InViewportDirective implements OnInit, OnDestroy {
  /** The CSS class to add when the element enters the viewport */
  @Input('appInViewport') animateClass = '';

  /** Optional class added before observing to keep it hidden/offset */
  @Input() preClass = 'pre-animate';

  /** Observe once by default */
  @Input() once = true;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    if (this.preClass) this.r.addClass(this.el.nativeElement, this.preClass);

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (this.animateClass) this.r.addClass(this.el.nativeElement, this.animateClass);
            if (this.preClass) this.r.removeClass(this.el.nativeElement, this.preClass);
            if (this.once) this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px', // trigger a bit before fully in view
        threshold: 0.15,
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
