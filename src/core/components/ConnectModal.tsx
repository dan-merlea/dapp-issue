import { Modal } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useAccount } from 'core/hooks/useAccount';
import { AccountType } from '@elrondnetwork/dapp-core/types';
import { useGetLoginInfo, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks'
import { TokensView, Denominate, useCoreContext } from 'core';
import { 
	ExtensionLoginButton,
	WebWalletLoginButton, 
	WalletConnectLoginContainer,
	LedgerLoginContainer
} from '@elrondnetwork/dapp-core/UI';

enum ConnectionType {
	Ledger = 1,
	MaiarApp = 2,
	MaiarAppV2 = 3,
	Wallet = 4,
	None = 5
}

export const ConnectModal = ({
    show,
    onHide,
}: {
    show: boolean;
    onHide: () => void;
}): React.ReactElement => {

	const { isLoggedIn } = useGetLoginInfo()
	const { address } = useGetAccountInfo()
	const { account } = useCoreContext()
	const { disconnect, loadAccount } = useAccount()

	const [type, setType] = React.useState(ConnectionType.None)

	const logout = () => {
		onHide()
		setType(ConnectionType.None)
		disconnect()
	}

	const fetchUser = () => {
		if (isLoggedIn) {
			loadAccount()
		}
	}
	React.useEffect(fetchUser, [address])

	const defaultContent = () => {
		return (
			<React.Fragment>
				<p>Connect with your Elrond Wallet.</p>
				<h4 className="mb-4">Please select your login method:</h4>
				<div className="mb-4 d-flex flex-column">
					<ExtensionLoginButton
						buttonClassName="extension-login"
						loginButtonText="Browser Extension"
					/>
					<button 
						className="dapp-core-component__main__btn dapp-core-component__main__btn-primary dapp-core-component__main__px-4 dapp-core-component__main__m-1 dapp-core-component__main__mx-3"
						onClick={() => setType(ConnectionType.MaiarAppV2)}
					>
						<span className="dapp-core-component__loginButtonStyles__login-text">Maiar App V2.0</span>
					</button>
					<button 
						className="dapp-core-component__main__btn dapp-core-component__main__btn-primary dapp-core-component__main__px-4 dapp-core-component__main__m-1 dapp-core-component__main__mx-3"
						onClick={() => setType(ConnectionType.MaiarApp)}
					>
						<span className="dapp-core-component__loginButtonStyles__login-text">Maiar App V1.0</span>
					</button>
					<WebWalletLoginButton
						buttonClassName="webwallet-login"
						loginButtonText="Web Wallet"
						callbackRoute={window.location.pathname}
					/>
					<button 
						className="dapp-core-component__main__btn dapp-core-component__main__btn-primary dapp-core-component__main__px-4 dapp-core-component__main__m-1 dapp-core-component__main__mx-3"
						onClick={() => setType(ConnectionType.Ledger)}
					>
						<span className="dapp-core-component__loginButtonStyles__login-text">Ledger</span>
					</button>
				</div>
			</React.Fragment>
		)
	}

	const walletContent = (account: AccountType) => {
		return (
			<React.Fragment>
				<h4 className="mb-4 text-break-all">{account.address}</h4>
				<div className="d-flex align-items-center justify-content-center mb-3">
					<Denominate value={account.balance} token="EGLD" decimals={5} />
				</div>
				<TokensView />
				<button onClick={logout} className="disconnect-button center-button px-sm-spacer mx-1 mx-sm-3 mb-3">
					Disconnect
				</button>
			</React.Fragment>
		)
	}

	const chooseTemplate = () => {
		if (account) {
			return walletContent(account)
		}
		switch (type) {
			case ConnectionType.Ledger:
				return (
					<LedgerLoginContainer
						className='ledger-login-modal'
						wrapContentInsideModal={false}
						onClose={onHide}
					/>
				)
			case ConnectionType.MaiarApp:
				return ( 
					<WalletConnectLoginContainer
						loginButtonText="Login with Maiar"
						title='Legacy Maiar Login'
						className='wallect-connect-login-modal'
						lead='Scan the QR code using Maiar'
						wrapContentInsideModal={false}
						onClose={onHide}
						isWalletConnectV2={false}
					/>
				)
			case ConnectionType.MaiarAppV2:
				return ( 
					<WalletConnectLoginContainer
						loginButtonText="Login with Maiar"
						title='Maiar Login'
						className='wallect-connect-login-modal'
						lead='Scan the QR code using Maiar'
						wrapContentInsideModal={false}
						onClose={onHide}
						isWalletConnectV2={true}
					/>
				)
			default:
				return defaultContent()
		}
	}

	const hideModal = () => {
		setType(ConnectionType.None)
		onHide()
	}
	useEffect(() => {
		if (account) hideModal()
	}, [account])
	
	return (
		<Modal
			show={show}
			onHide={hideModal}
			animation={false}
			size="lg"
			centered
		>
			<Modal.Header closeButton className="btn-close-white"></Modal.Header>
			<Modal.Body className="center">
				{ chooseTemplate() }
			</Modal.Body>
		</Modal>
	)
}
