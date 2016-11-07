class Enum {
    constructor(keys) {
        for(const key of keys)
            this[key] = Symbol(key);
    }
}

export default new Enum(['APPLE', 'BANANA', 'ORANGE']);