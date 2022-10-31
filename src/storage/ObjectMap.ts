
export declare type Dict<T> = {
    [key: string]: T;
};


// REMOVE - USE THE ONE FROM COMMON

export default class ObjectMap<T> {
    protected entities: { [key: string]: T };

    constructor() {
        this.entities = {}
    }

    // Entities
    public add = (key: string, entity: T) => {
        this.entities[key] = entity
    };

    public get = (key: string): T | undefined => {
        return this.entities[key]
    };

    public getAll = (): T[] => {
        return Object.values(this.entities)
    };

	public length = (): number => {
		return Object.keys(this.entities).length
	}

    public remove = (key: string) => {
        delete this.entities[key]
    };
}
