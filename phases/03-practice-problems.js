const HashTable = require('./01-implementation');
const MySet = require('./01-implementation-set');

function kth(str, frequency) {
    const hashTable = new HashTable();

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        if (hashTable.has(char)) {
            hashTable.insert(char, hashTable.read(char) + 1);
        } else {
            hashTable.insert(char, 1);
        }

    }

    let pairs = hashTable.pairs();

    for (let i = 0; i < pairs.length - 1; i++) {

        for (let j = 0; j < pairs.length - 1; j++) {

            if ((pairs[j][1] < pairs[j + 1][1])) {
                sort(pairs, j, (j + 1));
            }

        }

    }

    return pairs[frequency - 1][0];
}

function sort(arr, index1, index2) {
    [ arr[index1], arr[index2] ] = [ arr[index2], arr[index1] ];
}

function newAlphabet(str, alpha) {
    let hashTable = new HashTable();

    for (let i = 0; i < alpha.length; i++) {
        let char = alpha[i];

        hashTable.insert(char, i);
    }

    for (let j = 0; j < str.length - 1; j++) {
        let val1 = hashTable.read(str[j]);
        let val2 = hashTable.read(str[j + 1]);

        if (val1 > val2) return false;
    }

    return true;
}

function longestPalindrome(str) {

}

function longestSubstr(str) {
    let set = new MySet();
    let result = "";

    for (let i = 0; i < str.length; i++) {
        let letter = str[i];

        if (!(set.has(letter))) {
            set.insert(letter);
            result += letter;
        }

    }

    return result.length;
}

function maxSubarr() {

}

function coinChange() {

}

function climbingSteps() {

}

module.exports = [kth, newAlphabet, longestPalindrome, longestSubstr,
    maxSubarr, coinChange, climbingSteps
];
