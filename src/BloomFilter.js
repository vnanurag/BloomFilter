class BloomFilter{
    constructor(length){
        this.length = length;
        this.memory = new Array(length).fill(0); // filling the array with all 0s
    }

    // string passes through 4 hash functions and the indices returned
    // from the hash functions are set to 1 in the memory array
    add = (str) => {        
        this.memory[this.hashFn1(str, this.length)] = 1;
        this.memory[this.hashFn2(str, this.length)] = 1;
        this.memory[this.hashFn3(str, this.length)] = 1;
        this.memory[this.hashFn4(str, this.length)] = 1;
    }

    // returns true if all the values are 1 in the array for that string
    contains = (str) =>{
        return this.memory[this.hashFn1(str, this.length)] 
                && this.memory[this.hashFn2(str, this.length)]
                && this.memory[this.hashFn3(str, this.length)]
                && this.memory[this.hashFn4(str, this.length)];
    }

    hashFn1 = (str, length) => {
        let index = 0;
        for(let i=0; i < str.length; i++){
            index += (str.charCodeAt(i)*i)+1;
        }
        return Math.floor(index % length);
    }

    hashFn2 = (str, length) => {
        let index = 0;
        for(let i=0; i < str.length; i++){
            index += ((str.charCodeAt(i)-i)*i) + 1;
        }
        return Math.floor((index*2) % length);
    }

    hashFn3 = (str, length) => {
        let index = 0;
        for(let i=0; i < str.length; i++){
            index += ((str.charCodeAt(i)+1)*i)+1;
        }
        return Math.floor((index*3) % length);
    }

    hashFn4 = (str, length) => {
        let index = 0;
        for(let i=0; i < str.length; i++){
            index += ((str.charCodeAt(i)+2)*i)+1;
        }
        return Math.floor((index*4) % length);
    }
}

export default BloomFilter;
