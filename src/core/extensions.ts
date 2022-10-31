import { Dictionary } from "lodash";

/**
 * Array functions
 */

declare global {
    interface Array<T> {    
        insert(index: number, item: T): void
        remove(element: T): boolean
        serialized<T>(min: boolean): T[]
        last(): T
        first(): T
        unique(): Array<T>

        image(): T | undefined
        json(): T | undefined
    }

    interface Date {
        addSeconds: (seconds: number) => Date
    }

    interface String {
        truncate: (strLen: number, separator?: string) => string
        toJson(): string
        capitalizeFirstLetter(): string
    }
}

Array.prototype.unique = function() {
    const a = this.concat();
    for(let i = 0; i < a.length; ++i) {
        for(let j = i+1; j < a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

Array.prototype.insert = function<T>(index: number, item: T) {
    const vm = this;
    vm.splice(index, 0, item);
};

Array.prototype.serialized = function<T>(min: boolean = false): T[] {
    const vm = this;
    if (min) return vm.map((obj: any) => obj.serializeMin());
    return vm.map((obj: any) => obj.serialize());
};

Array.prototype.remove = function<T>(element: T): boolean {
	const vm = this;
    const index = vm.indexOf(element);
    if (index > -1) {
        vm.splice(index, 1);
        return true
    }
    return false
};

Array.prototype.last = function<T>(): T | null {
    const vm = this;
    if (vm.length > 0) {
        return vm[vm.length - 1]
    }
    return null
}

Array.prototype.first = function<T>(): T | null {
    const vm = this;
    if (vm.length > 0) {
        return vm[0]
    }
    return null
}

Array.prototype.image = function<T>(): T | undefined {
    const vm = this;
    if (vm.length == 1) return vm[0]
    if (vm.length > 0) {
		const newArr = vm.filter(elm => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(elm))
        return newArr.length > 0 ? newArr[0] : undefined
    }
    return undefined
}

Array.prototype.json = function<T>(): T | undefined {
    const vm = this;
    if (vm.length > 0) {
		const newArr = vm.filter(elm => (/\.(json)$/i).test(elm))
        return newArr.length > 0 ? newArr[0] : undefined
    }
    return undefined
}

Date.prototype.addSeconds = function(seconds: number) {
    const myTimeSpan = seconds * 1000;
    this.setTime(this.getTime() + myTimeSpan);
    return this
}

/**
 * String functions
 */

 String.prototype.truncate = function (strLen: number, separator?: string): string {
    const vm = this;
    if (vm.length <= strLen) return "" + vm;

    separator = separator || '...';

    const sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return vm.substr(0, frontChars) + 
           separator + 
           vm.substr(vm.length - backChars);
};

String.prototype.toJson = function (): string {
    const vm = this;
    return vm.replace(/\.[^.]+$/, '.json');
};

String.prototype.capitalizeFirstLetter = function (): string {
    const vm = this;
    return vm.charAt(0).toUpperCase() + vm.slice(1);
}


/**
 * Dictionary functions
 */

export interface IKeyedCollection<T> {
    add(key: string, value: T): void;
    containsKey(key: string): boolean;
    count(): number;
    item(key: string): T;
    keys(): string[];
    remove(key: string): T;
    values(): T[];
    enumerate(fn: (object: T) => void): void;
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
    private items: { [index: string]: T } = {};
    
    private length: number = 0;

    constructor(items?: Dictionary<T>) {
        if (items) {
            this.items = items;
            this.updateLenght()
        }
    }

    updateLenght() {
        this.length = Object.keys(this.items).length
    }
 
    containsKey(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.items, key);
    }
 
    count(): number {
        return this.length;
    }
 
    add(key: string, value: T) {
        if(!Object.prototype.hasOwnProperty.call(this.items, key))
             this.length++;
 
        this.items[key] = value;
    }
 
    remove(key: string): T {
        const val = this.items[key];
        if (val) {
            delete this.items[key];
            this.length--;
        }
        return val;
    }
 
    item(key: string): T {
        return this.items[key];
    }
 
    keys(): string[] {
        const keySet: string[] = [];
 
        for (const prop in this.items) {
            if (Object.prototype.hasOwnProperty.call(this.items, prop)) {
                keySet.push(prop);
            }
        }
 
        return keySet;
    }
 
    values(): T[] {
        const values: T[] = [];
 
        for (const prop in this.items) {
            if (Object.prototype.hasOwnProperty.call(this.items, prop)) {
                values.push(this.items[prop]);
            }
        }
 
        return values;
    }

    clear() {
        this.items = {}
        this.length = 0
    }

    enumerate(fn: (object: T) => void) {
        for (const prop in this.items) {
            if (Object.prototype.hasOwnProperty.call(this.items, prop)) {
                fn(this.items[prop]);
            }
        }
    }

    serialized<S>(): Dictionary<S> {
        const result: Dictionary<S> = {}
        for (const prop in this.items) {
            if (Object.prototype.hasOwnProperty.call(this.items, prop)) {
                const element = this.items[prop];
                result[prop] = (element as any).serialize()
            }
        }
        return result
    }
} 