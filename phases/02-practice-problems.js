const HashTable = require('./01-implementation');

class Value {

  constructor(value) {
    this.value = value;
    this.next = null;
  }

}

class MySet {

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.length = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.loadFactor = 0.7;
  }

  hash(value) { // Simple hash algorithm
    let hashValue = 0;
    let strValue = new String(value);

    for (let i = 0; i < strValue.length; i++) {
      hashValue += strValue.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(value) {
    // Get index after hashing
    return this.hash(value) % this.capacity;
  }

  insert(value) {
    // Your code here
    if ((this.length / this.data.length) >= this.loadFactor) this.resize();
    let index = this.hashMod(value);
    let node = new Value(value);

    if (this.data[index] === null) {
      this.enqueue(this.data, index, node);
      this.count++;
      this.length++;
      return;
    }

    let result = this.searchNode(this.data, index, node.value);

    if (!result) {
      this.enqueue(this.data, index, node);
      this.count++;
      return;
    } else {
      // We need to reject here
      // throw new Error('Key is already set');
      return false;
    }

  }

  searchNode(data, index, value) {
    let currentNode = data[index];

    while(currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return undefined;
  }

  enqueue(data, index, node) {
    node.next = data[index];
    data[index] = node;
  }

  read(value) {
    // Your code here
    let index = this.hashMod(value);

    if (this.data[index] === null) return undefined;
    if (this.data[index].value === value) return this.data[index].value;

    let result = this.searchNode(this.data, index, value);

    if (!result) {
      return result; // undefined
    } else {
      return result.value;
    }

  }

  resize() {
    // Your code here
    this.capacity *= 2;
    let newData = new Array(this.capacity).fill(null);

    for (let i = 0; i < this.data.length; i++) {
      let node = this.data[i];

      if (node) {

        while(node) {
          let index = this.hashMod(node.key);
          let newNode = new Value(node.value);
          this.reinsert(newData, index, newNode);
          node = node.next;
        }

      }

    }

    this.data = newData;
  }

  reinsert(newData, index, node) {
    if (newData[index] === null) {
      this.enqueue(newData, index, node);
      return;
    }

    this.enqueue(newData, index, node);
  }

  delete(value) {
    // Your code here
    let index = this.hashMod(value);
    if (this.data[index] === null) return 'Value not found';

    if (this.data[index].value === value) {
      this.data[index] = this.data[index].next;
      this.count--;
      return;
    }

    // We need to find node then
    let result = this.findNodeMinusOne(this.data, index, value);

    if (typeof result === 'string') {
      return result;
    } else {
      this.dequeue(result);
    }

  }

  findNodeMinusOne(data, index, value) {
    let currentNode = data[index];

    while(currentNode.next !== null) {
      if (currentNode.next.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return (currentNode.value === value) ? currentNode : 'Key not found';
  }

  dequeue(node) {

    if (node.next.next) {
      let temp = node.next.next;
      node.next = temp;
    } else {
      let temp = node.next;
      node = temp;
    }

    this.count--;
  }

}

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

    // if (hashtable.has(value)) {
    //   if (hashtable.read(value) !== key) return false
    // } else {
    //   hashtable.insert(value, key);
    // }

    // false:
      // The amount of keys is not equal to the amount of values

    keySet.add(key);
    valSet.add(value);

    if (keySet.size !== valSet.size) return false;
  }

  return true
}



module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
