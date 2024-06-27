import swap from "./Helper";

export default function bubbleSort(array) {
  const duplicate = array.slice();
  const visualization = [];

  for (var i = 0; i < duplicate.length; i++) {
    for (var j = 0; j < duplicate.length - i - 1; j++) {
      visualization.push([j, j + 1, null, null]);
      if (duplicate[j] > duplicate[j + 1]) {
        swap(duplicate, j, j + 1);
        visualization.push([j, j + 1, duplicate.slice(), null]);
      }
    }
    visualization.push([null, null, null, j]);
  }
  return visualization;
}
