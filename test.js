const { queue } = require('./build/index')

/**Driver Code */
console.log('start')
const q = new queue()
q.poll()
for (let i = 0; i < 10; i++) {
	const index = q.enqueue(() => {
		const p = new Promise((resolve) => {
			setTimeout(() => resolve('ok' + i), 1000)
		})
		return p
	})
	process.on(`resolved ${index}`, (data) => {
		console.log(data)
	})
}
