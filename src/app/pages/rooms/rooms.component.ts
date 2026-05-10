import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';
import { RoomService } from '../../feature/room/room.service';

type ContactLink = {
	label: string;
	href: string;
	description: string;
};

@Component({
	imports: [NgOptimizedImage, TranslatePipe],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	private readonly _roomService = inject(RoomService);

	protected readonly amenities = [
		'Comfortable rooms',
		'Breakfast for guests',
		'Restaurant or cafe on site',
		'Room service',
		'Wi-Fi in rooms',
		'Parking',
		'Work area',
		'Air conditioning',
		'Transfer on request',
		'Booking support',
	];
	protected readonly loadingCards = [1, 2, 3];
	protected readonly rooms = this._roomService.rooms;
	protected readonly isLoading = this._roomService.isLoading;
	protected readonly hasRooms = computed(() => this.rooms().length > 0);

	protected readonly contactLinks: ContactLink[] = [
		{
			label: 'Call us',
			href: 'tel:+380352251555',
			description: '+380352251555',
		},
		{
			label: 'Chat on Viber',
			href: 'viber://chat?number=%2B380352251555',
			description: 'Reserve a table or contact the restaurant administration.',
		},
		{
			label: 'Chat on Telegram',
			href: 'https://t.me/staryimlyn',
			description: '@staryimlyn',
		},
	];
}
