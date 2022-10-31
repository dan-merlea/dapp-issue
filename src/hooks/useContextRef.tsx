import { useRoomContext } from 'context/room';
import { StateType } from 'context/room/room.state';
import React from 'react';

export function useContextRef(): [StateType, React.RefObject<StateType>] {
	const state = useRoomContext()
	const ref = React.useRef(state)
  
	React.useEffect(() => {
		ref.current = state
	}, [state])
  
	return [state, ref]
}