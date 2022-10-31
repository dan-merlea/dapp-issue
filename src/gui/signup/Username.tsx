import { Constants } from '@krogan/common';
import { Input, Space, Text, View, Button } from 'gui/uielements';
import React, { useEffect, useState } from 'react';


interface UsernameProps {
	onSave: (username: string) => void;
}

export const Username = ({
	onSave,
}: UsernameProps): React.ReactElement => {

	const [playerName, setPlayerName] = useState('')

	useEffect(() => {
		setPlayerName(localStorage.getItem('playerName') ?? '')
	}, [])

	// HANDLERS
    const handlePlayerNameChange = (event: any) => {
        setPlayerName(event.target.value)
    };

    // ACTIONS
    const saveUsername = () => {
        if (playerName == '') return
		localStorage.setItem('playerName', playerName)
        onSave(playerName)
    };

	return (
		<>
		<View flex>
			<Text type='body'>Pick your name:</Text>
		</View>
		<Space size="s" />
		<Input
			value={playerName}
			placeholder="Name"
			maxLength={Constants.PLAYER_NAME_MAX}
			onChange={handlePlayerNameChange}
		/>
		<Space size="s" />
		<Button text="Save" onClick={saveUsername} />
		</>
	)
}

