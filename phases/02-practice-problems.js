const HashTable = require('./01-implementation');
const MySet = require('./01-implementation-set');


function anagrams(str1, str2) {
  // Your code here
  const set = new MySet();

  for (let i = 0; i < str1.length; i++) {
    let charOne = str1[i];

    set.insert(charOne);
  }

  const myEvery = function () {

    for (let i = 0; i < this.length; i++) {
      let char = this[i];
      if (set.read(char) === undefined) return false;
    }

    return true;
  }

  return myEvery.call(str2);
}


function commonElements(arr1, arr2) {
  // Your code here
  const set = new MySet();
  let result = [];

  for (let i = 0; i < arr2.length; i++) {
    let num = arr2[i];

    set.insert(num);
  }

  for (let i = 0; i < arr1.length; i++) {
    let num = arr1[i];

    let value = set.read(num);
    if (value !== undefined) result.push(value);
  }

  return result;
}


function duplicate(arr) {
  // Your code here
  // const set = new MySet();

  // for (let i = 0; i < arr.length; i++) {
  //   let num = arr[i];

  //   let result = set.insert(num);
  //   if (result === false) return num;
  // }

  const set = new Set();

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];

    if (set.has(num)) return num;

    set.add(num);
  }

  return false;
}


function twoSum(nums, target) {
  // Your code here
  // let set = new MySet();

  // for (let i = 0; i < nums.length; i++) {
  //   let num = nums[i];
  //   let result = target - num;

  //   if (set.read(result)) return true;

  //   set.insert(num);
  // }

  // return false;

  let set = new Set();

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let result = target - num;

    if (set.has(result)) return true;

    set.add(num);
  }

  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  // both pattern and strings are the same length
  // let keySet = new MySet();
  // let valSet = new MySet();

  let keySet = new Set();
  let valSet = new Set();

  for (let i = 0; i < pattern.length; i++) {
    let key = pattern[i];
    let value = strings[i];

    // false:
      // The amount of keys is not equal to the amount of values

    // keySet.insert(key);
    // valSet.insert(value);

    keySet.add(key);
    valSet.add(value);

    // if (keySet.count !== valSet.count) return false;
    if (keySet.size !== valSet.size) return false;
  }

  return true
}



module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
