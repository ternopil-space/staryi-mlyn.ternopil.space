import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	computed,
	inject,
	input,
	signal,
} from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { TranslatePipe } from '../../shared/translate.pipe';
import { DishCategoryService } from '../../feature/dish/dish-category.service';
import { toDishCard } from '../../feature/dish/dish.data';
import { Dish, DishCard, DishCategory } from '../../feature/dish/dish.interface';
import { DishService } from '../../feature/dish/dish.service';
import { MenuDishComponent } from '../menu-dish/menu-dish.component';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface DishSection {
	id: string;
	name: string;
	description: string;
	hasDescription: boolean;
	dishes: DishCard[];
}

@Component({
	selector: 'app-menu-dishes',
	imports: [FadeInDirective, MenuDishComponent, TranslatePipe],
	templateUrl: './menu-dishes.component.html',
	animations: [
		trigger('categorySwitch', [
			transition('* => *', [
				group([
					query(
						':leave',
						[
							style({ opacity: 1, transform: 'translateY(0)' }),
							animate('0.25s ease', style({ opacity: 0, transform: 'translateY(-10px)' })),
						],
						{ optional: true },
					),
					query(
						':enter',
						[
							style({ opacity: 0, transform: 'translateY(20px)' }),
							animate('0.4s ease', style({ opacity: 1, transform: 'translateY(0)' })),
						],
						{ optional: true },
					),
				]),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDishesComponent {
	private readonly _dishService = inject(DishService);
	private readonly _dishCategoryService = inject(DishCategoryService);
	private readonly _platformId = inject(PLATFORM_ID);
	readonly selectedCategories = input<DishCategory[]>();
	protected readonly motionDisabled = signal(false);

	readonly categories = computed(() => {
		const selectedCategories =
			this.selectedCategories() ?? this._dishCategoryService.selectedCategories();
		const lastSelectedCategory = selectedCategories[selectedCategories.length - 1];

		if (lastSelectedCategory?.children?.length) {
			return lastSelectedCategory.children;
		}

		if (lastSelectedCategory) {
			return [lastSelectedCategory];
		}

		return this._dishCategoryService.flatCategories().filter((category) => !category.parent);
	});

	protected readonly sections = computed(() =>
		this.categories()
			.map((category) => this._toSection(category))
			.filter((section) => section.dishes.length > 0),
	);
	protected readonly categorySwitchKey = computed(() =>
		this.categories()
			.map((category) => category.slug)
			.join('|'),
	);

	constructor() {
		if (isPlatformBrowser(this._platformId)) {
			this.motionDisabled.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
		}
	}

	private _toSection(category: DishCategory): DishSection {
		return {
			id: category.slug,
			name: category.name,
			description: category.description,
			hasDescription: Boolean(category.description?.trim()),
			dishes: this._collectDishes(category),
		};
	}

	private _collectDishes(category: DishCategory): DishCard[] {
		const categories = this._dishCategoryService.flatCategories();
		const categorySlugs = [
			category.slug,
			...categories
				.filter((entry) => entry.parent === category.slug)
				.map((entry) => entry.slug),
		];

		return this._dishService
			.dishes()
			.filter((dish) => categorySlugs.includes(dish.categorySlug))
			.map((dish) => this._toMenuDish(dish));
	}

	private _toMenuDish(dish: Dish): DishCard {
		return toDishCard(dish);
	}
}
