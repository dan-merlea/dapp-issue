import {
	Address, Code, CodeMetadata, ContractFunction, SmartContract,
	Transaction, TransactionPayload, TypedValue
} from '@elrondnetwork/erdjs/out';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { quickDenominate } from './denominate';


export interface IAccountType {
	address: string;
	balance: string;
	nonce: number;
	code?: string;
}

export interface DelegationContractType {
	name: string;
	gasLimit: number;
	data: string;
}

export class NetworkConfig {
	chainId: string;
	public constructor(
		chainId: string
	) {
		this.chainId = chainId;
	}
}

export class AccountType {
	balance: string;
	nonce: number;
	address: string;
	public constructor(address: string, balance = '', nonce: number) {
		this.balance = balance;
		this.nonce = nonce;
		this.address = address;
	}

	getNonceThenIncrement(): number {
		const old = this.nonce
		this.nonce++
		return old;
	}

	async reload(proxy: ProxyNetworkProvider) {
		const account = await proxy.getAccount(new Address(this.address))
		this.nonce = account.nonce
		this.balance = quickDenominate(account.balance.toString(), 3)
	}

	static empty() {
		return new AccountType('..', '0', 0)
	}
}

export class DelegationTransactionType {
	value: string;
	type: string;
	chainId: string;
	receiver: string;
	args: string;
	multiplier: number;

	public constructor(
		receiver = '',
		value = '',
		type: string,
		args = '',
		gasMultiplier = 1,
	) {
		this.value = value;
		this.type = type;
		this.args = args;
		this.chainId = '1';
		this.receiver = receiver;
		this.multiplier = gasMultiplier;
	}

	getData(): string {
		let data = this.type;
		if (this.args !== '') {
			data = data + '@' + this.args
		}
		return data
	}

	getPayload() {
		let funcName = this.type;
		if (this.args !== '') {
			funcName = funcName + '@' + this.args
		}
		const func = new ContractFunction(funcName);
		return TransactionPayload.contractCall()
			.setFunction(func)
			.build();
	}
}

export class UpgradeTransactionType {
	chainId: string;
	receiver: string;
	codeMetadata: CodeMetadata;
	initialArgs: TypedValue[];
	code: Code;

	/**
	 * @param receiver string address
	 * @param initialArgs TypedValue[]
	 * @param code use static loadCode
	 * @param codeMetadata new CodeMetadata(true, false, true, true)
	 */
	public constructor(
		receiver = '',
		initialArgs = [] as TypedValue[],
		code: Code,
		codeMetadata: CodeMetadata,
	) {
		this.initialArgs = initialArgs;
		this.chainId = '1';
		this.receiver = receiver;
		this.code = code;
		this.codeMetadata = codeMetadata;
	}

	static async loadCode(path: string): Promise<Code> {
		const file = await fetch(path)
		const buffer = Buffer.from(await file.arrayBuffer())
		return Code.fromBuffer(buffer)
	}

	async getPayload() {
		return TransactionPayload.contractUpgrade()
			.setCode(this.code)
			.setCodeMetadata(this.codeMetadata)
			.setInitArgs(this.initialArgs)
			.build();
	}

	getTransaction(): Transaction {
		const smartContract = new SmartContract({
			address: new Address(this.receiver)
		})
		return smartContract.upgrade({
			code: this.code,
			codeMetadata: this.codeMetadata,
			initArguments: this.initialArgs,
			gasLimit: 100000000,
			chainID: this.chainId
		})
	}
}

export interface ESDTToken {
	identifier: string,
	name: string,
	ticker: string,
	nonce?: number,
	owner: string,
	assets?: { pngUrl: string },
	decimals: number,
	balance: string,
	attributes?: string,
	transactions: number,
	accounts: number,
	circulatingSupply: string,
}

// USED FOR ELROND API CALLS
export interface APIESDT {
	attributes: string;
	nonce: string;
	supply: string;
	creator: string;
	name: string;
	royalties: string;
	identifier: string;
	collection: string;
	type: string;
	url: string;
	assets?: {
		pngUrl?: string;
	}
	uris: string[];
	metaData: ESDTMetaData;
	media?: ESDTMedia[];
	decimals: number;
	balance?: string;
}

export interface ESDTMedia {
	url: string;
	fileType: string;
	originalUrl: string;
	thumbnailUrl: string;
}

export interface ESDTAttribute {
	trait_type: string;
	value: string;
	rarity?: string;
}

export interface ESDTMetaData {
	id?: string;
	grade?: number;
	description: string;
	native_attributes: ESDTAttribute[];
	attributes: ESDTAttribute[];
	rarity_score?: number;
	total_minted?: number;
	rank?: number;
}