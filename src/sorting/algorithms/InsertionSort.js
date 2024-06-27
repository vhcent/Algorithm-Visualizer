import swap from "./Helper";

export default function insertionSort(array) {
  const duplicate = array.slice();
  const visualization = [];

  for (let i = 1; i < duplicate.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      visualization.push([j, j + 1, null, null]);
      if (duplicate[j] > duplicate[j + 1]) {
        swap(duplicate, j, j + 1);
        visualization.push([j, j + 1, duplicate.slice(), null]);
      } else {
        break;
      }
    }
  }

  for (let i = 0; i < duplicate.length; i++) {
    visualization.push([null, null, null, i]);
  }

  return visualization;
}
