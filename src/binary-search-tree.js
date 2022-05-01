
const {NotImplementedError} = require('../extensions/index.js');

// const {Node} = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {

  constructor() {
    this.rootNode = null
  }


  root() {
    return this.rootNode
  }

  add(data) {
    let newNode = new Node(data)
    if (this.rootNode === null) {
      this.rootNode = newNode
    } else {
      insertNode(this.rootNode, newNode)
    }

    function insertNode(node, newNode) {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          insertNode(node.right, newNode)
        }
      }
    }
  }

  has(data) {
    if (this.find(data) !== null) {
      return true
    }
    return false
  }

  find(data) {
    let node = this.rootNode
    return search(node, data)

    function search(node, data) {
      if (node === null) return null
      if (data < node.data) return search(node.left, data)
      if (data > node.data) return search(node.right, data)
      return node
    }
  }

  min() {
    let node = this.rootNode
    return this.findMin(node).data
  }

  findMin(node) {
    if (node === null) return null
    if (node.left === null) return node
    return this.findMin(node.left)
  }

  max() {
    let node = this.rootNode
    return this.findMax(node).data
  }

  findMax(node) {
    if (node === null) return null
    if (node.right === null) return node
    return this.findMax(node.right)
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data)
  }

  removeNode(node, data) {
    if (node === null) return null
    if (data < node.data) {
      node.left = this.removeNode(node.left, data)
      return node
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, data)
      return node
    }

    if (node.left === null && node.right === null) {
      node = null
      return node
    }
    if (node.left === null) {
      node = node.right
      return node
    }
    if (node.right === null) {
      node = node.left
      return node
    }

    let newNode = this.findMin(node.right)
    node.data = newNode.data
    node.right = this.removeNode(node.right, newNode.data)

    return node
  }
}

module.exports = {
  BinarySearchTree
};