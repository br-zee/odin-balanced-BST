export function isSorted(arr) {

    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i] > arr[i+1]) {
            return false;
        }
    }
    return true;
}

export function quickSort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    let pivot = 0;
    let storedIndex = 1;

    for (let i in arr) {
        if (arr[i] < arr[pivot]) {
            const temp = arr[i];
            arr[i] = arr[storedIndex];
            arr[storedIndex] = temp;

            storedIndex++;
        }
    }    

    const temp = arr[pivot];
    arr[pivot] = arr[storedIndex-1];
    arr[storedIndex-1] = temp;
    pivot = storedIndex-1;

    const left = arr.slice(0, pivot);
    const right = arr.slice(pivot+1, arr.length);

    const sortedArr = quickSort(left).concat([arr[pivot]]).concat(quickSort(right));
    return sortedArr;
}