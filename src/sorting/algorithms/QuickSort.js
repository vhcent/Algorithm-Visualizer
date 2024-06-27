import swap from "./Helper";

export default function quickSort(array) {
  const duplicate = array.slice();
  const visualization = [];

  function quickSortHelper(start, end) {
    if (start >= end) {
      visualization.push([null, null, null, start]);
      return;
    }

    var pivot = start;

    for (let i = start; i < end; i++) {
      if (i !== pivot) {
        visualization.push([i, end, null, null]);
      }
      if (duplicate[i] < duplicate[end]) {
        if (i !== pivot) {
          visualization.push([i, pivot, null, null]);
          swap(duplicate, i, pivot);
          visualization.push([i, pivot, duplicate.slice(), null]);
        }
        pivot++;
      }
    }
    if (end !== pivot) {
      visualization.push([end, pivot, null, null]);
      swap(duplicate, end, pivot);
      visualization.push([end, pivot, duplicate.slice(), null]);
    }
    if (pivot !== start) {
      visualization.push([null, null, null, pivot]);
    }

    quickSortHelper(start, pivot - 1);
    quickSortHelper(pivot + 1, end);
  }

  quickSortHelper(0, duplicate.length - 1);
  console.log(visualization);
  return visualization;
}
