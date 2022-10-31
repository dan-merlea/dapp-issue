import moment from 'moment';

export const setItem = (key: string, item: any, ttl: number = 3600) => {
	const expires = moment().unix() + ttl;
	localStorage.setItem(
		key,
		JSON.stringify({
			expires,
			data: item,
		})
	);
};

export const getItem = (key: string): any => {
	const item = localStorage.getItem(key);
	if (!item) {
		return null;
	}

	const deserializedItem = JSON.parse(item);
	if (!deserializedItem) {
		return null;
	}

	if (!Object.prototype.hasOwnProperty.call(deserializedItem, 'expires') || !Object.prototype.hasOwnProperty.call(deserializedItem, 'data')) {
		return null;
	}

	const expired = moment().unix() >= deserializedItem.expires;
	if (expired) {
		localStorage.removeItem(key);
		return null;
	}

	return deserializedItem.data;
};

export const removeItem = (key: string) => localStorage.removeItem(key);
