class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) { // Simple hash algorithm
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let node = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = node;
      this.count++;
      return;
    }

    // call searchNode
    this.searchNode(index, node);
  }

  searchNode(index, node) {
    let currentNode = this.data[index];

    while(currentNode) {
      if (currentNode.key === node.key) {
        currentNode.value = node.value;
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    this.enqueue(node, index);
  }

  enqueue(node, index) {
    node.next = this.data[index];
    this.data[index] = node;
    this.count++;
  }

  read(key) {
    // Your code here
    let index = this.hashMod(key);

    if (this.data[index] === null) return undefined;

    if (this.data[index].key === key) {
      let result = this.data[index].value;
      return result;
    } else {
      let result = this.find(index, key);
      return result;
    }

  }

  find(index, key) {
    let currentNode = this.data[index];

    while(currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }

      currentNode = currentNode.next;
    }

    return undefined;
  }


  resize() {
    // Your code here
    // This is where the issue is.
    // Each bucket is a linked list and we failed to recognize that.
    this.capacity = this.capacity * 2;
    let newData = new Array(this.capacity).fill(null);

    // the bucket are filled with linked lists
    // This makes this n^2 at worst
    for (let i = 0; i < this.data.length; i++) {
      let node = this.data[i];

      if (node) {

        while(node) {
          let index = this.hashMod(node.key);
          this.reinsert(newData, index, node);
          node = node.next;
        }

      }

    }

    this.data = newData;
  }

  reinsert(newData, index, node) {
    if (newData[index] === null) {
      newData[index] = node;
      return;
    }

    this.enqueueV2(newData, index, node)
  }

  enqueueV2(newData, index, node) {
    node.next = newData[index];
    newData[index] = node;
  }

  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
