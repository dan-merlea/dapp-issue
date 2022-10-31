import React from 'react';

export function useStateRef(initialValue) {
	const [value, setValue] = React.useState(initialValue)
	const ref = React.useRef(value)
  
	React.useEffect(() => {
		ref.current = value
	}, [value])
  
	return [value, setValue, ref]
}