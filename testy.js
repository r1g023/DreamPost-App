// Given a string of any length which contains only digits from 0 to 9, replace each consecutive run of the digit 0 with its length.

// replaceZeros('1234500362000440')
// 1234523623441

// > replaceZeros('123450036200044')
// > 123452362344

// > replaceZeros('000000000000')
// > 12

// > replaceZeros('123456789')
// > 123456789

function replaceZeros(str) {
  let count = 0;
  let result = "";
  let split = str.split("");

  // worst case
  if (split.length === 0 || split === undefined || split == " ") {
    return false;
  }

  split.forEach((item, i) => {
    console.log(item);

    if (item === "0") {
      console.log(count); // there's 12 zeros in the array so we can add this to my count variable
      count++;
      console.log("count", count); // 1
    } else {
      if (count > 0) {
        result = result + count;
      }

      result = result + item;
      console.log("result", result);
      count = 0;
    }

    console.log("my initial count of zeros", count);
  });

  if (count > 0) {
    console.log("final count", count); // 12
    result = result + count;
  }
  console.log("result", result);
  return result;
}

console.log(replaceZeros("000000000000")); // 12
console.log(replaceZeros("1234500362000440")); // 1234523623441
console.log(replaceZeros("123450036200044")); // 123452362344
console.log(replaceZeros("123456789")); // 123456789

console.log(replaceZeros("1009")); // 129
console.log(replaceZeros(" ")); //  false
