import { BaseNetworkType } from '@elrondnetwork/dapp-core/types';
import { DelegationContractType } from 'core';

export const api = 'https://api.elrondnftswap.com';
export const gateway = 'https://gateway.elrond.com';

export const network: BaseNetworkType = {
	id: 'mainnet',
    chainId: '1',
    name: 'Mainnet',
    egldLabel: 'EGLD',
    decimals: '18',
    digits: '2',
    gasPerDataByte: '1500',
    walletConnectDeepLink: 'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/',
    walletAddress: 'https://wallet.elrond.com/dapp/init',
    apiAddress: 'https://api.elrond.com',
    explorerAddress: 'http://explorer.elrond.com',
    apiTimeout: '4000',
    walletConnectV2ProjectId: '5d32c9ea1f8f3ae6c7b9b1cb3fd14b92',
};

export const delegationContractData: DelegationContractType[] = [
	{
		name: 'ESDTTransfer',
		gasLimit: 8000000,
		data: 'ESDTTransfer@',
	},{
		name: 'ESDTNFTTransfer',
		gasLimit: 8000000,
		data: 'ESDTNFTTransfer@',
	}
];
