// 1
// function binarySearch(array, value, start, end) {
//   start = start === undefined ? 0 : start;
//   end = end === undefined ? array.length : end;

//   if (start > end) {
//     return -1;
//   }

//   const index = Math.floor((start + end) / 2);
//   const item = array[index];

//   console.log(start, end);
//   if (item == value) {
//     return index;
//   }
//   else if (item < value) {
//     return binarySearch(array, value, index + 1, end);
//   }
//   else if (item > value) {
//     return binarySearch(array, value, start, index - 1);
//   }
// }
// looking for 8
// given 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// first call: 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 2nd call: 3, 5, 6, 8, 11, 12
// 3rd call: 8 is the value looking for and then is returned

// looking for 16
// given 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// first call: 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 2nd call: 14, 15, 17, 18
// 3rd call: 14, 15
// 4th call: 15
// 5th call: start is greater than end so returns -1


// 3
// so if looking for book with dewey decimal system would first know the number of the book that we are looking for
// would look at the aisles and know what numbers that aisle contains, so would figure out in which aisle the book would live if it is there
// then would look through that aisle looking for a number that is close to the one that I need
// would walk to essentially where that book would belong in numerical order and then would get closer to where book belongs and ignore 
// either would eventually look through all the books and it isn't there or find the book


// 4
/**
 *       35
 *      /  \
 *    25    89
 *    / \   / \
 *   15 27  79 90
 *  / \      \
 * 14 19      91
 * 
 * In order: 14 15 19 25 27 35 79 89 90 91
 * Pre order: 35 25 15 14 19 27 89 79 91 90
 * Post order: 14 19 91 15 27 79 90 25 89 35
 * 
 * 
 *        8
 *       / \
 *      6   10
 *     / \   /\
 *    5   7 9  11  
 * 
 * Post order: 5 7 6 9 11 10 8
 * Pre order: 8 6 5 7 10 9 11
 */


//  5
class BinarySearchTree {
  constructor (key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if(this.key == null) {
      this.key = key;
      this.value = value;
    } else if(key < this.key) {
      if(this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    else {
      if(this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if(this.key === key) {
      return this.value;
    } else if(key < this.key && this.left) {
      return this.left.find(key);
    } else if(key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key error');
    }
  }

  remove(key) {
    if(this.key === key) {
      if(this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if(this.left) {
        this._replaceWith(this.left);
      } else if(this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    }
    else if(key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error ('Key Error');
    }
  }

  _replaceWith(node) {
    if(this.parent) {
      if(this === this.parent.left) {
        this.parent.left = node;
      } else if(this === this.parent.right) {
        this.parent.right = node;
      }
      if(node) {
        node.parent = this.parent;
      }
    }
    else {
      if(node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
      }
    }
  }

  _findMin() {
    if(!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

let arr = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
let newTree = new BinarySearchTree();
for(let i = 0; i < arr.length; i++) {
  newTree.insert(arr[i]);
}

// function inOrder(tree) {
//   console.log('key',tree.key);
//   if(tree == null) {
//     return;
//   }
//   if(tree.left !== null) {
//     return inOrder(tree.left);
//   }
//   if(tree.left == null) {
//     console.log('left side key', tree.key);
//   }
//   if(tree.right !== null) {
//     return inOrder(tree.right);
//   }
//   if(tree.right == null) {
//     console.log('right side key', tree.parent.right.key);
//   }
// } 
// console.log(inOrder(newTree)); //4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90
function inOrder(tree) {
  if(tree !== null) {
    inOrder(tree.left);
    console.log(tree.key);
    inOrder(tree.right);
  }
}
// inOrder(newTree);

function preOrder(tree) {
  if(tree !== null) {
    console.log(tree.key);
    preOrder(tree.left);
    preOrder(tree.right);
  }
}
// preOrder(newTree);

function postOrder(tree) {
  if(tree !== null) {
    postOrder(tree.left);
    postOrder(tree.right);
    console.log(tree.key);
  }
}
// postOrder(newTree);

// function preOrder(array, value, start, end) {
// let result = [];
// let tree = new BinarySearchTree();
// array.forEach(item => {
//   tree.insert(item);
// });
// console.log(tree);
// }
// preOrder(arr);

// function postOrder(array, value, start, end) {
// let result = [];
// let tree = new BinarySearchTree();
// array.forEach(item => {
//   tree.insert(item);
// });
// console.log(tree);
// }
// postOrder(arr);