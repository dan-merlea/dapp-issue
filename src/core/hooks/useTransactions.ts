import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks'
import { sendTransactions } from '@elrondnetwork/dapp-core/services'
import { getAccount } from '@elrondnetwork/dapp-core/utils'
import { SimpleTransactionType } from '@elrondnetwork/dapp-core/types'
import { delegationContractData, network } from 'config';
import { DelegationTransactionType, nominate } from 'core/helpers';
import { signMessage } from '@elrondnetwork/dapp-core/utils';

export function useTransactions() {
	
	const { address } = useGetAccountInfo()

	const sendTransaction = async (args: DelegationTransactionType[], id: string, comment: string): Promise<string> => {

		const reloadedAccount = await getAccount(address)
		if (!reloadedAccount) throw new Error('Account not found');
		let nonce = reloadedAccount.nonce

		return new Promise<string>((resolve, reject) => {
			sendTransactions({
				transactions: args.map(transaction => {
					const delegationContract = delegationContractData.find(d => d.name === transaction.type);
					if (!delegationContract) throw new Error('The contract for this action in not defined');
	
					return {
						chainID: network.chainId,
						value: nominate(transaction.value, 18),
						data: transaction.getData(),
						receiver: transaction.receiver,
						gasLimit: delegationContract.gasLimit * transaction.multiplier,
						nonce: nonce++,
					} as SimpleTransactionType
				}),
				transactionsDisplayInfo: comment,
				sessionInformation: id,
			}).then(({ sessionId, error }) => {
				if (error) {
					reject(error)
				} else {
					resolve(sessionId)
				}
			});
		})		
	}

	const signAccountMessage = async (message: string): Promise<string> => {
		const signed = await signMessage({ message: message })
		return signed.getSignature().hex()
	}

	return {
		sendTransaction,
		signAccountMessage,
	}
}