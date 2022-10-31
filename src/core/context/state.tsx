import { ESDTToken } from "core/helpers";
import { AccountType } from '@elrondnetwork/dapp-core/types';


const defaultLocalApiAddress = 'https://api.elrondnftswap.com';

export interface CoreStateType {
	api: string;
	tokens: ESDTToken[];
	showLoginModal: boolean;
	account?: AccountType;
	address: string;
	isLoggedIn: boolean;
}

export const initialState = (api: string): CoreStateType => {
	
	return {
		api: api !== undefined ? api : defaultLocalApiAddress,
		tokens: [],
		showLoginModal: false,
		address: '...',
		isLoggedIn: false,
	};
};
