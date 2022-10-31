import { ESDTToken } from "../helpers"

export const accountService = {
	fetchAccountTokens: (api: string, address: string, query: string): Promise<ESDTToken[]> => {
		return fetch(`${api}/accounts/${address}/tokens?search=${query}`)
			.then(res => res.json())
			.catch(err => { console.log(err) })
	},
	fetchAccountMetaTokens: (api: string, address: string, query: string): Promise<ESDTToken[]> => {
		return fetch(`${api}/accounts/${address}/nfts?search=${query}&type=MetaESDT`)
			.then(res => res.json())
			.catch(err => { console.log(err) })
	}
}