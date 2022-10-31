import { CoreStateType } from './state';

export type CoreDispatchType = (action: CoreActionType) => void;

export type CoreActionType =
	{ type: 'setTokens'; tokens: CoreStateType['tokens'] }
	| { type: 'setShowLoginModal'; showLoginModal: CoreStateType['showLoginModal'] }
	| { type: 'setAccount'; account: CoreStateType['account'] }
	| { type: 'setAddress'; address: CoreStateType['address'] }
	| { type: 'setIsLoggedIn'; isLoggedIn: CoreStateType['isLoggedIn'] }

export function reducer(state: CoreStateType, action: CoreActionType): CoreStateType {
	switch (action.type) {

		case 'setTokens': {
			const { tokens } = action;
			return {
				...state,
				tokens,
			};
		}

		case 'setShowLoginModal': {
			const { showLoginModal } = action;
			return {
				...state,
				showLoginModal,
			};
		}

		case 'setAccount': {
			const { account } = action;
			return {
				...state,
				account,
			};
		}

		case 'setAddress': {
			const { address } = action;
			return {
				...state,
				address,
			};
		}

		case 'setIsLoggedIn': {
			const { isLoggedIn } = action;
			return {
				...state,
				isLoggedIn,
			};
		}

		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
}
