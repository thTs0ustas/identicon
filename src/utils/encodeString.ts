const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce(async (y, f) => f(await y), x);

const stringToBytes = (str: string) => new TextEncoder().encode(str);
const encodeArrayBuffer = async (buffer: ArrayBuffer) => await crypto.subtle.digest('SHA-256', buffer);
const convertToArrayBuffer = (x: ArrayBuffer) => new Uint8Array(x);
const convertArray = (x: number[]) => Array.from(x);
const isToBeColored = (el: number) => !!(el & 1);

const createMatrix = (rows: number, cols: number) => (arr: number[]) => {
  const matrix: string[][] = [];

  const rgbValue = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

  let counter = 0;
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < cols / 2; j++) {
      const assignColor = !isToBeColored(arr[counter++]) ? rgbValue : 'white';
      matrix[i].push(assignColor);
    }
    matrix[i] = matrix[i].concat(matrix[i].slice(0, 2).reverse());
  }
  return matrix;
};

export const createIdenticonMatrix = async (str: string, rows: number, cols: number) =>
  await pipe(stringToBytes, encodeArrayBuffer, convertToArrayBuffer, convertArray, createMatrix(rows, cols))(str);
