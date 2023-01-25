// This week’s exercise
// You are given a list of positive integers which represents some range of integers which has been truncated. Find the missing bits, insert ellipses to show that that part has been truncated, and print it. If the consecutive values differ by exactly two, then insert the missing value.
// Examples:
// missingBits([1,2,3,4,20,21,22,23])
// "[1,2,3,4,...,20,21,22,23]"

// missingBits([1,2,3,5,6])
// "[1,2,3,4,5,6]"

// missingBits([1,3,20,27])
// "[1,2,3,...,20,...,27]"

let firstArray = [1, 2, 3, 4, 20, 21, 22, 23];
let secondArray = [1, 2, 3, 5, 6];
let thirdArray = [1, 3, 20, 27];

function missingBits(arr) {
  let result = [];

  arr.forEach((item) => {
    console.log(item);
    console.log(result[result.length - 1]); // this will not include the last item in array

    if (item - result[result.length - 1] > 1) {
      console.log(item);
      result.push("...");
      console.log(result);
    }

    result.push(item);
    console.log(result); // this will add last item in array, that we ignored the first time
  });

  return result;
}

console.log(missingBits(firstArray)); // [ 1, 2, 3, 4, '...', 20, 21, 22, 23 ]
console.log(missingBits(secondArray)); // [ 1, 2, 3, '...', 5, 6 ]
console.log(missingBits(thirdArray)); // [ 1, '...', 3, '...', 20, '...', 27 ]
