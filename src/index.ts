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
				;(process as any).emit(`resolved ${current_head.index}` as any, this.list_of_values[current_head.index])
			}
			this.processing = false
		}
	}
}
