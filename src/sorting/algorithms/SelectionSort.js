import swap from "./Helper";

export default function selectionSort(array) {
  const duplicate = array.slice();
  const visualization = [];

  for (let i = 0; i < duplicate.length; i++) {
    for (let j = i + 1; j < duplicate.length; j++) {
      visualization.push([i, j, null, null]);

      if (duplicate[j] < duplicate[i]) {
        swap(duplicate, i, j);
        visualization.push([i, j, duplicate.slice(), null]);
      }
    }
    visualization.push([null, null, null, i]);
  }

  return visualization;
}
