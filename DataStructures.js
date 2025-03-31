export class Queue {
    queue = [];

    enqueue(val) {
        this.queue.push(val);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length <= 0;
    }
}