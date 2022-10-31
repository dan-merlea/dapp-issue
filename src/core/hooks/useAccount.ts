import { getAccount } from '@elrondnetwork/dapp-core/utils'
import { AccountType } from '@elrondnetwork/dapp-core/types'
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks'
import { logout } from '@elrondnetwork/dapp-core/utils'
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { gateway } from 'config';
import { useCoreDispatch } from 'core/context';

export function useAccount() {
	const dispatch = useCoreDispatch()
	const { address } = useGetAccountInfo()
	const { isLoggedIn } = useGetLoginInfo()

	const loadAccount = async () => {
		if (isLoggedIn) {
			const account = await getAccount(address)
			if (account) {
				console.log(`Account loaded ${account.address}`)
				setLocalContext(account)
			}
		} else {
			setLocalContext(undefined)
		}
	}

	const disconnect = () => {
		logout()
		setLocalContext(undefined)
	}

	const setLocalContext = (account: AccountType | undefined) => {
		dispatch({ type: 'setAccount', account: account ? account : undefined })
		dispatch({ type: 'setAddress', address: account ? account.address : '...' })
		dispatch({ type: 'setIsLoggedIn', isLoggedIn: account != undefined })
	}

	const proxy = () => {
		return new ProxyNetworkProvider(gateway, { timeout: 4000 })
	}

	return {
		loadAccount,
		disconnect,
		proxy
	}
}