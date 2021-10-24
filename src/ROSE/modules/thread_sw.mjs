self.addEventListener('message', event => {
	const func = new Function('return ' + event.data)(),
		result = func()

	postMessage(result)
})