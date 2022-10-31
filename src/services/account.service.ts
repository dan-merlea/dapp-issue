import { Models, Types } from '@krogan/common';
import { api } from 'config';
import { serverApiUrl } from 'utils/server';

export const accountService = {
	fetchAccountTokens: (address: string, query: string): Promise<Types.ESDTToken[]> => {
		return fetch(`${api}/accounts/${address}/tokens?search=${query}`)
			.then(res => res.json())
			.catch(err => { console.error(err) })
	},
	fetchAccountMetaTokens: (address: string, query: string): Promise<Types.ESDTToken[]> => {
		return fetch(`${api}/accounts/${address}/nfts?search=${query}&type=MetaESDT`)
			.then(res => res.json())
			.catch(err => { console.error(err) })
	},
	fetchAccountNfts: (address: string, collection: string): Promise<Types.ESDTToken[]> => {
		return fetch(`${api}/accounts/${address}/nfts?search=${collection}`)
			.then(res => res.json())
			.catch(err => { console.error(err) })
	},
	fetchAllSpaceships: (): Promise<Models.ISpaceship[]> => {
		return fetch(`${serverApiUrl()}/main/getSpaceshipsStats`)
			.then(res => res.json())
			.then(res => {
				if (res.status) return res.objects
				return []
			})
			.catch(err => { console.error(err) })
	}
}