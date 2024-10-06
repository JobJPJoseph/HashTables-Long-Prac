// const { describe } = require('mocha');
// const { describe, it } = require('mocha');
const [ kth, newAlphabet, longestPalindrome, longestSubstr, maxSubarr,
    coinChange, climbingSteps
 ] = require('../phases/03-practice-problems');

const chai = require('chai');
const expect = chai.expect;

describe('', function () {

    describe('Kth', function () {

        it('should return the kth most frequent character in the string', function () {
            let str1 = 'aaabbc';
            let frequency1 = 1;
            let frequency2 = 2;
            let frequency3 = 3;

            expect(kth(str1, frequency1), 'to equal 1').to.equal(1);
            expect(kth(str1, frequency2), 'to equal 2').to.equal(2);
            expect(kth(str1, frequency3), 'to equal 3').to.equal(3);
        });

    });

    describe('newAlphabet', function () {

        it('determine whether the characters in the string appear in lexicographically increase order', function () {
            let alpha = 'abcdefghijklmnopqrstuvwxyz';
            let str1 = 'dino';
            let str2 = 'leetcode';
            let str3 = 'leetcod';

            expect(newAlphabet(str1, alpha)).to.be.true;
            expect(newAlphabet(str2, alpha)).to.be.false;
            expect(newAlphabet(str3, alpha)).to.be.true;
        });

        it('solve in O(m + n) time', function () {

        });

    });

    describe('longestPalindrome', function () {

        it('determine the length of the longest palindrone that can be built with those letters', function () {
            let str = "abccccdd";

            expect(longestPalindrome(str)).to.equal('dccaccd');
        });

        it('solve in O(n) Time', function () {

        });

    });

    describe('longestSubstr', function () {

        it('find the length of the longest substring without repeating characters', function () {
            let str1 = 'abcabcbb';
            let str2 = 'bbbbb';

            expect(longestSubstr(str1)).to.equal('abc');
            expect(longestSubstr(str2)).to.equal('b');
        });

        it('Solve in O(n) Time', function () {

        });

    });

    describe('maxSubarr', function () {

        it('return the length of the longest subarray where the difference between its maximun value and its minimun value is at most 1', function () {
            let arr1 = [1,3,2,2,5,2,3,7];
            let arr2 = [1,1,1,1,3];

            expect(maxSubarr(arr1)).to.equal(5);
            expect(maxSubarr(arr2)).to.equal(4);
        });

        it('Solve this O(n) Time', function () {

        });

    });

    describe('coinChange', function () {

        context('If amount of money cannot be made up by any combinations of coins', function () {

            it('', function () {
                let coins = [5];

                expect(coinChange(coins, 3)).to.equal(-1)
            });

        });

        context('If amount of money can be made up by any combinations of coins', function () {

            it('', function () {
                let coins = [1, 5, 10, 25];

                expect(coinChange(coins, 11)).to.equal(2);
                expect(coinChange(coins, 0)).to.equal(0);
            });

        });

    });

    describe('climbingSteps', function () {

        it('return the number of ways an individual can take up to n steps', function () {
            expect(climbingSteps(0)).to.equal(1);
            expect(climbingSteps(1)).to.equal(1);
            expect(climbingSteps(2)).to.equal(2);
            expect(climbingSteps(3)).to.equal(4);
            expect(climbingSteps(4)).to.equal(6);
        });

    });

});
