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
    // I think we need keep track of the amount
    // of chars. We can start from there
    const hashTable = new HashTable();
    let addIn = false;
    let sums = 0;

    for (let i = 0; i < str.length; i++) {
        let char = str[i]

        if (hashTable.has(char)) {
            hashTable.insert(char, (hashTable.read(char) + 1));
        } else {
            hashTable.insert(char, 1);
        }

    }

    for (let i = 0; i < hashTable.data.length; i++) {
        let node = hashTable.data[i];

        if (node) {
            if (node.value % 2 === 0) {
                sums += node.value;
            } else {
                if (addIn === false) {
                    sums += 1;
                    addIn = true;
                }
             }
        }
    }

    return sums;
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

function maxSubarr(arr)  {
    let hashTable = new HashTable();

    for (let i = 0; i < arr.length - 1; i++) {
        let num1 = arr[i];
        let num2 = arr[i + 1];

        if ( ((num1 + 1) === num2) || ((num1 - 1) === num2 || (num1 === num2)) ) {
            hashTable.insert(`${i}`, num1);
            hashTable.insert(`${i + 1}`, num2);
        }

    }

    return hashTable.values().length;
}

function coinChange(coins, target) {
    if (target <= 0) return 0;

    const hashTable = new HashTable();

    let coinRecurse = function (coins, permutation, sums) {
        let index = 0;

        if (sums === target) {
            hashTable.insert(String(permutation), permutation.length);
            return;
        }

        if (sums < target) {
            let sum = sums;
            sum += coins[index];
            let copiedPermutation = permutation.slice(0);
            copiedPermutation.push(coins[index]);
            coinRecurse(coins, copiedPermutation, sum);
            index++;
        }

        if (sums > target) return;

        while (index < coins.length) {
            let sum = sums;
            sum += coins[index];
            let copiedPermutation = permutation.slice(0);
            copiedPermutation.push(coins[index]);
            coinRecurse(coins.slice(index), copiedPermutation, sum);
            index++;
        }

        return;
    }

    coinRecurse(coins, [], 0);

    if (hashTable.length === 0) return -1;

    let smallestPermutation = Math.min(...hashTable.values());

    return smallestPermutation;
}

function climbingSteps(target) {
    if (target <= 0) return 1;
    const set = new MySet();
    let steps = [];

    for (let i = 1; i <= target; i++) {
        steps.push(i);
    }

    const findPermutations = function (sums, permutation, steps) {

        if (sums === target) {
            set.insert(String(permutation));
            return;
        }

        if (sums > target) return;

        let index = 0;

        while(index < steps.length) {
            let num = sums;

            let temp;
            if (index === 3) {
                temp = 2;
            } else {
                temp = index;
            }

            num += steps[temp];
            let copiedPermutation = permutation.slice(0);
            copiedPermutation.push(steps[temp]);
            findPermutations(num, copiedPermutation, steps);
            index++;
        }

        return;
    }

    findPermutations(0, [], steps);

    return set.count;
}

module.exports = [kth, newAlphabet, longestPalindrome, longestSubstr,
    maxSubarr, coinChange, climbingSteps
];
