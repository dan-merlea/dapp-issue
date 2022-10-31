import './App.scss';
import App from './App';
import React from 'react';
import { api, network } from 'config';
import ReactDOM from 'react-dom/client';
import { CoreContextProvider } from 'core';
import * as serviceWorker from './serviceWorker';
import { RoomContextProvider } from 'context/room';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { SignTransactionsModals, TransactionsToastList } from '@elrondnetwork/dapp-core/UI';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<DappProvider environment={network.id} customNetworkConfig={network}>
				<CoreContextProvider api={api}>
					<TransactionsToastList successfulToastLifetime={5000} className="" />
					<SignTransactionsModals />
					<RoomContextProvider>
						<App />
					</RoomContextProvider>
				</CoreContextProvider>
			</DappProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
