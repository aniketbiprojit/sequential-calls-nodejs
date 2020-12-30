export class queue {
	index: number = 0
	list_of_functions: Array<{ fn: () => Promise<any>; index: number }> = []
	list_of_values: Map<number, Promise<any>> = new Map()

	constructor() {}

	enqueue(fn: () => Promise<any>) {
		this.index += 1

		this.list_of_functions.push(Object.assign({ fn }, { index: this.index }))

		return this.index
	}

	async add_function(fn) {
		this.list_of_functions.push(fn)
		this.list_of_functions[this.list_of_functions.length - 1]
	}

	processing: boolean = false

	poll() {
		setInterval(() => this.start_process(), 100)
	}

	async start_process() {
		if (this.processing !== true) {
			this.processing = true
			if (this.list_of_functions.length !== 0) {
				const current_head = this.list_of_functions[0]

				this.list_of_values[current_head.index] = await current_head.fn()
				this.list_of_functions = this.list_of_functions.slice(1)

				console.log(this.list_of_values[current_head.index], 'top')
				// console.log(this.list_of_values[current_head.index], current_head.index, this.list_of_functions.length)
				;(process as any).emit(`resolved ${current_head.index}` as any, this.list_of_values[current_head.index])
			}
			this.processing = false
		}
	}
}

/**Driver Code */
// console.log('start')
// const q = new queue()
// q.poll()
// for (let i = 0; i < 10; i++) {
// 	const index = q.enqueue(() => {
// 		const p = new Promise((resolve) => {
// 			setTimeout(() => resolve('ok' + i), 1000)
// 		})
// 		return p
// 	})
// 	process.on(`resolved ${index}` as any, (data) => {
// 		console.log(data)
// 	})
// }

// q.enqueue(() => {
// 	const p = new Promise((resolve) => {
// 		setTimeout(() => resolve('ok'), 1000)
// 	})
// 	return p
// })
