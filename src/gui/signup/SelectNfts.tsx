import '@krogan/common/src/extensions'
import React, { useEffect, useState } from 'react';
import { NftCheckbox } from 'gui/nft';
import { Space, Button } from 'gui/uielements';
import { accountService } from 'services/account.service';
import { Player } from 'state/Player';
import { Types, Constants } from '@krogan/common';
import { useCoreContext } from 'core';


interface SelectNftsProps {
	player: Player,
	selected: (nonces: number[]) => void
}

export const SelectNfts = ({
	player,
	selected
}: SelectNftsProps): React.ReactElement => {
	
	const { account, address } = useCoreContext()

	const [nfts, setNfts] = useState([] as Types.ESDTToken[])
    const [selectedNfts, setSelectedNfts] = useState([] as number[])

	const [, updateState] = React.useState<Record<string, unknown>>();
    const forceUpdate = React.useCallback(() => updateState({}), []);

	const playerChanged = () => {
        if (player && account) {
            accountService.fetchAccountNfts(address, Constants.KROGAN_MAIN)
                .then(values => {
                    console.log(`Account got ${values.length} nfts`)
                    setNfts(values)
                })
        }
    }
    useEffect(playerChanged, [player])

    // ACTIONS
    const selectNft = (nft: Types.ESDTToken) => {
        if (!nft.nonce) return
        const copy = selectedNfts
        if (copy.includes(nft.nonce)) {
            copy.remove(nft.nonce)
        } else {
            copy.push(nft.nonce)
        }
        setSelectedNfts(copy)
        forceUpdate()
        console.log(selectedNfts)
    }

	const save = () => {
		selected(selectedNfts)
	}

	return (
		<>
        {nfts.length == 0 && 
            <p>You do not own any Krogan NFTs. To play this game, you can purchase or rent one on <a href="https://elrondnftswap.com">our marketplace.</a></p>
        }
		{nfts.map((nft, i) => (
			<NftCheckbox key={i} nft={nft} selected={selectedNfts.includes(nft.nonce!)} onClick={selectNft} />
		))}
		<Space size="s" />
		<Button text="Save" onClick={save} />
		</>
	)
}

