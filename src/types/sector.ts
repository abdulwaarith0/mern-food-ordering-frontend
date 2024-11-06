export interface ISector {
	auth0Id: string;
	email: string;
	name: string;
	addressLine1: string;
	city: string;
	country: string;
}

export interface ICheckoutSession {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
		country: string;
	};
	restaurantId: string;
}

export interface User {
	_id: string;
	email: string;
	name: string;
	addressLine1: string;
	city: string;
	country: string;
}

export interface MenuItem {
	_id: string;
	name: string;
	price: number;
}

export interface Restaurant {
	_id: string;
	user: string;
	restaurantName: string;
	city: string;
	country: string;
	deliveryPrice: number;
	estimatedDeliveryTime: number;
	cuisines: string[];
	menuItems: MenuItem[];
	imageUrl: string;
	lastUpdated: string;
}

export interface IRestaurantSearchResponse {
	data: Restaurant[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	}
}

