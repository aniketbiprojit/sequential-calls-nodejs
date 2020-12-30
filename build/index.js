"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = void 0;
class queue {
    constructor() {
        this.index = 0;
        this.list_of_functions = [];
        this.list_of_values = new Map();
        this.processing = false;
    }
    enqueue(fn) {
        this.index += 1;
        this.list_of_functions.push(Object.assign({ fn }, { index: this.index }));
        return this.index;
    }
    add_function(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.list_of_functions.push(fn);
            this.list_of_functions[this.list_of_functions.length - 1];
        });
    }
    poll() {
        setInterval(() => this.start_process(), 100);
    }
    start_process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.processing !== true) {
                this.processing = true;
                if (this.list_of_functions.length !== 0) {
                    const current_head = this.list_of_functions[0];
                    this.list_of_values[current_head.index] = yield current_head.fn();
                    this.list_of_functions = this.list_of_functions.slice(1);
                    console.log(this.list_of_values[current_head.index], 'top');
                    process.emit(`resolved ${current_head.index}`, this.list_of_values[current_head.index]);
                }
                this.processing = false;
            }
        });
    }
}
exports.queue = queue;
//# sourceMappingURL=index.js.map