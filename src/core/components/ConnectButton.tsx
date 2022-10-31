import React from 'react'
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks'
import { quickDenominate, useCoreContext, useCoreDispatch } from '..'

export const ConnectButton = (): React.ReactElement => {

	const coreDispatch = useCoreDispatch()
	const { address } = useGetAccountInfo()
	const { isLoggedIn } = useGetLoginInfo()
	const { account } = useCoreContext()

	const walletView = () => {
		if (isLoggedIn) {
			return (
				<button className="side-button right center-mobile d-flex align-items-center justify-content-center" onClick={() => {
					coreDispatch({ type: 'setShowLoginModal', showLoginModal: true })
				}}>
					<img src="/images/wallet.svg" className="me-2" width="18" height="18" alt="Wallet Krogan" />
					<p className="text--action">{address.truncate(12, "...")}</p>
					<i className="separator ms-2 me-2"></i>
					<p className="text--action">{account?.balance ? quickDenominate(account.balance, 2) : '...'}</p>
					<img src="/images/egld.svg" className="ms-2" width="18" height="18" alt="EGLD" />
				</button>
			)
		} else {
			return (
				<button className="side-button right center-mobile d-flex align-items-center justify-content-center" onClick={() => {
					coreDispatch({ type: 'setShowLoginModal', showLoginModal: true })
				}}>
					<img src="/images/connect.svg" className="me-2" width="18" height="18" alt="Connect wallet to Krogan" />
					<p className="text--action">CONNECT WALLET</p>
				</button>
			)
		}
	}

	return (
		<React.Fragment>
			{walletView()}
		</React.Fragment>

	)
}