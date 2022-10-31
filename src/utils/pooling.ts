
export const actionWhenTrue = (check: () => boolean, action: () => void, delay: number) => {
	const interval = setInterval(() => {
		if (check()) {
			action()
			clearInterval(interval)
		}
	}, delay)
}