import { computed, Injectable, signal } from '@angular/core';
import dishCategoriesData from '../../../data/dishCategories.json';
import { DishCategory } from './dish.interface';

@Injectable({
	providedIn: 'root',
})
export class DishCategoryService {
	private readonly _fallbackCategories = (dishCategoriesData as DishCategory[]).map(
		(category) => ({
			...category,
		}),
	);

	private readonly _categories = signal<DishCategory[]>(this._fallbackCategories);

	readonly flatCategories = this._categories.asReadonly();
	readonly categories = computed<DishCategory[]>(() =>
		this._categories()
			.filter((category) => !category.parent)
			.map((category) => this._mapCategory(category)),
	);
	readonly selectedCategories = signal<DishCategory[]>([]);

	setCategories(categories: DishCategory[] | null | undefined) {
		this._categories.set(
			Array.isArray(categories) && categories.length > 0
				? categories
				: this._fallbackCategories,
		);
	}

	selectCategory(
		category: DishCategory,
		_categories: DishCategory[],
		selectedCategories: DishCategory[] = [],
	) {
		const parentIndex = category.parent
			? selectedCategories.findIndex(
					(selectedCategory) => selectedCategory.slug === category.parent,
				)
			: -1;
		const nextSelectedCategories =
			parentIndex >= 0
				? selectedCategories.slice(0, parentIndex + 1)
				: [];

		nextSelectedCategories.push(category);
		this.selectedCategories.set(nextSelectedCategories);
	}

	private _mapCategory(category: DishCategory): DishCategory {
		const children = this._categories()
			.filter((_category) => _category.parent === category.slug)
			.map((_category) => this._mapCategory(_category));

		return {
			...category,
			children,
		};
	}
}
