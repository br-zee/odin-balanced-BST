import { Tree } from "./Tree.js";

function printOrder(tree, orderFunc) {
    let arr = [];
    tree[orderFunc]((node) => arr.push(node.data));
    console.log(arr);
}

function generateRandomTree() {
    const arr = [];
    for (let i = 0; i < 25; i++) {
        arr.push(Math.floor(Math.random()*100));
    }
    const tree = new Tree(arr);
    return tree;
}

function main() {
    console.log("Generating tree...");
    const tree = generateRandomTree();
    tree.prettyPrint(tree.root);

    if (tree.isBalanced()) {
        console.log("Tree is balanced!\n");
    } else {
        console.log("Tree is unbalanced!\n");
    }

    console.log("Printing elements Level Order...");
    printOrder(tree, "levelOrder");

    console.log("Printing elements Pre Order...");
    printOrder(tree, "preOrder");

    console.log("Printing elements Post Order...");
    printOrder(tree, "postOrder");

    console.log("Printing elements In Order...");
    printOrder(tree, "inOrder");

    console.log("Inserting random values...");
    const randNums = [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)];

    for (let num of randNums) {
        tree.insert(num);
    }
    tree.prettyPrint(tree.root);

    if (tree.isBalanced()) {
        console.log("Tree is balanced!\n");
    } else {
        console.log("Tree is unbalanced!\n");
    }

    console.log("Rebalancing tree...");
    tree.rebalance();
    tree.prettyPrint(tree.root);

    if (tree.isBalanced()) {
        console.log("Tree is balanced!\n");
    } else {
        console.log("Tree is unbalanced!\n");
    }

    console.log("Printing elements Level Order...");
    printOrder(tree, "levelOrder");

    console.log("Printing elements Pre Order...");
    printOrder(tree, "preOrder");

    console.log("Printing elements Post Order...");
    printOrder(tree, "postOrder");

    console.log("Printing elements In Order...");
    printOrder(tree, "inOrder");

}

main();





// let values = [1, 7, 23, 8, 9, 4, 3, 5, 67, 99, 85];

// const tree = new Tree(values);
// tree.prettyPrint(tree.root);

// tree.prettyPrint(tree.root);



