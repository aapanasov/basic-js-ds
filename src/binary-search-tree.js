
const { NotImplementedError } = require('../extensions/index.js');

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

  #insertNode(node, newNode) {
    if (newNode.data < node.data) {
      node.left ? this.#insertNode(node.left, newNode) : node.left = newNode
    } else {
      node.right ? this.#insertNode(node.right, newNode) : node.right = newNode
    }
  }

  #search(node, data) {
    if (node === null) return null
    if (data < node.data) return this.#search(node.left, data)
    if (data > node.data) return this.#search(node.right, data)
    return node
  }

  #findMin(node) {
    if (node === null) return null
    if (node.left === null) return node
    return this.#findMin(node.left)
  }

  #findMax(node) {
    if (node === null) return null
    if (node.right === null) return node
    return this.#findMax(node.right)
  }

  #removeNode(node, data) {
    if (data < node.data) {
      node.left = this.#removeNode(node.left, data)
      return node
    }

    if (data > node.data) {
      node.right = this.#removeNode(node.right, data)
      return node
    }

    if (node.left === null && node.right === null) {
      return null
    }

    if (node.left === null) {
      return node.right
    }

    if (node.right === null) {
      return node.left
    }

    const newNode = this.#findMin(node.right)
    node.data = newNode.data
    node.right = this.#removeNode(node.right, node.data)

    return node
  }

  root = () => this.rootNode

  has = (data) => this.find(data) ? true : false

  find = (data) => this.#search(this.rootNode, data)

  min = () => this.#findMin(this.rootNode).data

  max = () => this.#findMax(this.rootNode).data

  add = (data) => {
    const newNode = new Node(data)
    this.rootNode ? this.#insertNode(this.rootNode, newNode) : this.rootNode = newNode
  }

  remove = (data) => {
    this.rootNode = this.#removeNode(this.rootNode, data)
  }
}

module.exports = {
  BinarySearchTree
};