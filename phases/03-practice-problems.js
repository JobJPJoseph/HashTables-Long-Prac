const HashTable = require('./01-implementation');
const MySet = require('./02-practice-problems');

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

function newAlphabet() {

}

function longestPalindrome() {

}

function longestSubstr() {

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
