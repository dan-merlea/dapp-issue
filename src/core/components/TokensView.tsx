import React, { useEffect } from 'react';
import moment from 'moment';
import { Address } from '@elrondnetwork/erdjs/out';
import { DelegationTransactionType, ESDTToken, nominateNumberToHex, nominateStringToHex } from '../helpers';
import { b64ToBn, denominate } from '../helpers/denominate/formatters';
import { useGetAccountInfo, useTrackTransactionStatus } from '@elrondnetwork/dapp-core/hooks';
import { getCleanApiAddress } from '@elrondnetwork/dapp-core/apiCalls/utils';
import { useCoreContext, useCoreDispatch } from 'core/context/context';
import { accountService } from 'core/services/account.service';
import { useTransactions } from 'core/hooks';

export const kroTicker = 'KRO-df97ec';
export const lkkroTicker = 'LKKRO-e6ef92';

export const TokensView = (): React.ReactElement => {

	const dispatch = useCoreDispatch()
	const { tokens } = useCoreContext()
	const { address } = useGetAccountInfo()
	const { sendTransaction } = useTransactions()

	/**** Transaction Handler ****/
	const [sessionId, setSessionId] = React.useState(null as string | null)
	const _ = useTrackTransactionStatus({
		transactionId: sessionId,
		onSuccess: (transactionId) => {
			if (sessionId == transactionId) {
				// nothing
			}
		},
		onFail: () => {},
		onCancelled: () => {},
	});
	/**** Transaction Handler ****/

	const unlock = (token: ESDTToken) => {
		const tokenId = nominateStringToHex(token.ticker)
		const tokenNonce = nominateNumberToHex('' + token.nonce ?? 0)
		const amount = nominateNumberToHex(token.balance)
		const receiver = new Address('erd1qqqqqqqqqqqqqpgqyq5g6uvx0hzwdl0864sxpdtquv0hhaa5we0s5hpa90').hex()
		const func = nominateStringToHex('claimTokens')

		const data = tokenId+'@'+tokenNonce+'@'+amount+'@'+receiver+'@'+func
		const txArguments = new DelegationTransactionType(address, '0', 'ESDTNFTTransfer', data)
		sendTransaction([txArguments], 'claimRewards', 'Claim Rewards').then(id => setSessionId(id))
	}

	const fetchAccount = () => {
		if (address) {
			const tokens = accountService.fetchAccountTokens(getCleanApiAddress(), address, kroTicker)
			const metaTokens = accountService.fetchAccountMetaTokens(getCleanApiAddress(), address, lkkroTicker)
			Promise.all([tokens, metaTokens]).then(tokens => {
				dispatch({ type: 'setTokens', tokens: [...tokens[0], ...tokens[1]] });
			})
		}
	};
	useEffect(() => { fetchAccount() },  [address]);

	const tokenView = (token: ESDTToken, index: number) => {
		let vesting
		if (token.attributes) {
			const timestamp = parseInt(b64ToBn(token.attributes).toString()) * 1000
			if (new Date().getTime() > timestamp) {
				vesting = ( 
				<div className="ms-3">
					<button
						className="link-button text-medium px-0"
						onClick={() => unlock(token)}
					>
						Unlock now
					</button>
				</div> 
				)
			} else {
				vesting = ( <p>&nbsp;- Vesting {moment(timestamp).from(moment())}</p> )
			}
		}

		return (
			<div key={index} className="d-flex align-items-center justify-content-center">
				<p className="text-action">
					{denominate({ input: token.balance, denomination: token.decimals, decimals: 4})}
				</p>
				&nbsp;
				{token.identifier == kroTicker ? <img src={`/images/${kroTicker}.gif`} width={20} alt="KRO Token" /> : <span>{token.ticker.split('-').first()}</span>}
				{vesting}
			</div>
		)
	}

	return (
		<React.Fragment>
			<div className="d-flex flex-column align-items-center justify-content-center mb-3">
				{tokens.map((token, i) => tokenView(token, i))}
			</div>
		</React.Fragment>
	)
}