export default function mergeSort(array) {
  const visualization = [];
  const duplicate = array.slice();

  function mergeSortHelper(start, end) {
    if (start >= end) {
      return;
    }

    let mid = Math.floor((start + end) / 2);

    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);

    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const temp = [];
    let leftIndex = start;
    let rightIndex = mid + 1;

    while (leftIndex <= mid && rightIndex <= end) {
      visualization.push([leftIndex, rightIndex, null, null]);
      if (duplicate[leftIndex] < duplicate[rightIndex]) {
        temp.push(duplicate[leftIndex]);
        visualization.push([leftIndex, null, null, null]);
        leftIndex++;
      } else {
        temp.push(duplicate[rightIndex]);
        visualization.push([rightIndex, null, null, null]);
        rightIndex++;
      }
    }

    while (leftIndex <= mid) {
      visualization.push([leftIndex, null, null, null]);
      temp.push(duplicate[leftIndex]);
      leftIndex++;
    }

    while (rightIndex <= end) {
      visualization.push([rightIndex, null, null, null]);
      temp.push(duplicate[rightIndex]);
      rightIndex++;
    }

    for (let i = start; i <= end; i++) {
      duplicate[i] = temp[i - start];
      visualization.push([i, null, duplicate.slice(), null]);
    }
  }

  mergeSortHelper(0, duplicate.length - 1);

  for (let i = 0; i < duplicate.length; i++) {
    visualization.push([null, null, null, i]);
  }

  return visualization;
}
