import { isSorted, quickSort } from "./quickSort.js";
import { Queue } from "./DataStructures.js";

class Node {
    data = null;
    left = null;
    right = null;

    constructor(data, left=null, right=null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export class Tree {
    root = null;

    constructor(arr) {
        if (!isSorted(arr)) arr = quickSort(arr);
        this.root = this.#buildTree(arr);
    }

    #buildTree(arr) {
        if (arr.length <= 1) {
            return new Node(arr[0]);
        }

        const mid = Math.floor(arr.length/2);
        const midNode = new Node(arr[mid]);

        const left = arr.slice(0, mid);
        const right = arr.slice(mid+1, arr.length);

        const leftNode = this.#buildTree(left);
        if (leftNode.data) midNode.left = leftNode;

        const rightNode = this.#buildTree(right);
        if (rightNode.data) midNode.right = rightNode;

        return midNode;
    }

    insert(value) {
        let node = this.root;
        let prevNode;
        let direction;

        while (node) {

            if (node.data >= value) {
                if (node.left == null) prevNode = node;
                node = node.left;
                direction = "left";
            }
            else {
                if (node.right == null) prevNode = node;
                node = node.right;
                direction = "right";
            }
        }
        node = new Node(value);
        prevNode[direction] = node;

    }

    // doesnt work lol
    delete(value) {
        let node = this.root
        let prevNode;
        let direction;

        while (node) {
 
            if (node.data === value) {

                // Handle deletion if node has two children
                if (node.left && node.right) {
                    prevNode = node;
                    node = node.left;

                    const temp = node.data;
                    node.data = prevNode.data;
                    prevNode.data = temp;
                    direction = 'left';

                    prevNode[direction] = null;
                }

                // Handle deletion if node has one child
                else if (node.left || node.right) {

                    prevNode = node;

                    if (node.left) {
                        node = node.left; 
                        direction = 'left';
                    }
                    else {
                        node = node.right;
                        direction = 'right;';
                    }

                    const temp = node.data;
                    node.data = prevNode.data;
                    prevNode.data = temp;

                    prevNode[direction] = null;     
                }

                // Handle deletion if node is leaf node/has no children
                else {
                    prevNode[direction] = null;
                }

                // Finished deleting, so exit loop
                break;
            }   

            // Mark node before traversing to next
            prevNode = node;
            if (node.data > value) node = node.left;
            else node = node.right;
        }
    }

    find(value) {
        let node = this.root;

        while (node) {
            if (node.data === value) return node;
            else if (node.data > value) node = node.left;
            else node = node.right;
        }
        return null;
    }

    levelOrder(callback) {
        try {
            if (typeof callback !== "function") throw Error("Error: Expected function, unknown argument " + callback);

            let node = this.root;
            const queue = new Queue;

            queue.enqueue(node);

            while (node) {
                if (!queue.isEmpty()) {
                    node = queue.dequeue();
                    callback(node);
                    if (node.left) queue.enqueue(node.left);
                    if (node.right) queue.enqueue(node.right);
                }
                else break;
            }
        }
        catch(err) {
            console.error(err.message);
        }
    }

    preOrder(callback, node=this.root) {        
        callback(node);
        if (node.left) this.preOrder(callback, node.left);
        if (node.right) this.preOrder(callback, node.right);
        return;
    }

    inOrder(callback, node=this.root) {
        if (node.left) this.inOrder(callback, node.left);
        callback(node);
        if (node.right) this.inOrder(callback, node.right);
        return;
    }

    postOrder(callback, node=this.root) {
        if (node.left) this.postOrder(callback, node.left);
        if (node.right) this.postOrder(callback, node.right);
        callback(node);
        return;
    }

    height(node) {
        if (!node) return -1;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return left > right ? left+1 : right+1;
    }

    depth(node) {
        let root = this.root;
        let depth = 0;

        while (node) {
            if (node == root) return depth;
            else if (node.data > root.data) {
                root = root.right;
            }
            else {
                root = root.left;
            }
            depth++;

        }
        return -1;
    }

    isBalanced(node=this.root) {
        if (!node) return true;
        
        if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const arr = [];
        this.levelOrder((node) => arr.push(node.data));
        
        const newTree = new Tree(arr);
        this.root = newTree.root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}



