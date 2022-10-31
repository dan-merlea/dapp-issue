import { Constants } from "@krogan/common";

export const serverUrl = (): string => {
	if (window.document.location.host.includes('localhost')) {
		const host = window.document.location.host.replace(/:.*/, '');
		const port = Constants.WS_PORT;
		return `wss://${host}${port ? `:${port}` : ''}`;
	} else {
		return `wss://server.kroganverse.com`
	}
}

export const serverApiUrl = (): string => {
	if (window.document.location.host.includes('localhost')) {
		const host = window.document.location.host.replace(/:.*/, '');
		const port = Constants.WS_PORT;
		return `https://${host}${port ? `:${port}` : ''}`;
	} else {
		return `https://server.kroganverse.com`
	}
}

export const clientUrl = (): string => {
	return `${location.protocol === 'https:' ? 'https://' : 'http://'}${window.document.location.host}`
}