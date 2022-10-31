import React, { Fragment } from 'react';
import Home from './scenes/Home';
import { Routes, Route } from 'react-router-dom'
import { ConnectModal, useCoreContext, useCoreDispatch } from 'core';

(window as any).React1 = require('react');

const App = (): React.ReactElement => {
	
	const coreDispatch = useCoreDispatch()
	const { showLoginModal } = useCoreContext()

	return (
		<Fragment>
			<ConnectModal show={showLoginModal} onHide={() => {
				coreDispatch({ type: 'setShowLoginModal', showLoginModal: false })
			}} /> 
			<Routes>
				<Route path="/" element={ <Home /> } />
			</Routes>
		</Fragment>
	)
}

export default App;