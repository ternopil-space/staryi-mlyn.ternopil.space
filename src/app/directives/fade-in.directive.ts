import {
	AfterViewInit,
	Directive,
	ElementRef,
	NgZone,
	OnDestroy,
	PLATFORM_ID,
	Renderer2,
	inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
	selector: '[appFadeIn]',
	standalone: true,
})
export class FadeInDirective implements AfterViewInit, OnDestroy {
	private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly _ngZone = inject(NgZone);
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _renderer = inject(Renderer2);
	private _observer: IntersectionObserver | null = null;

	ngAfterViewInit() {
		const element = this._elementRef.nativeElement;
		this._renderer.addClass(element, 'app-fade-in');

		if (!isPlatformBrowser(this._platformId) || !('IntersectionObserver' in window)) {
			this._renderer.addClass(element, 'visible');
			return;
		}

		this._ngZone.runOutsideAngular(() => {
			this._observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							this._renderer.addClass(element, 'visible');
							this._observer?.unobserve(element);
						}
					}
				},
				{
					rootMargin: '0px 0px -8% 0px',
					threshold: 0.12,
				},
			);

			this._observer.observe(element);
		});
	}

	ngOnDestroy() {
		this._observer?.disconnect();
	}
}
