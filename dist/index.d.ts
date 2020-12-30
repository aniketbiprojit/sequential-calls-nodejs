export declare class queue {
    index: number;
    list_of_functions: Array<{
        fn: () => Promise<any>;
        index: number;
    }>;
    list_of_values: Map<number, Promise<any>>;
    constructor();
    enqueue(fn: () => Promise<any>): number;
    add_function(fn: any): Promise<void>;
    processing: boolean;
    poll(): void;
    start_process(): Promise<void>;
}
