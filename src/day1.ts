import assert from "node:assert";
import fs from "node:fs";

let data: string;

try {
  data = fs.readFileSync("input/day1.txt").toString();
} catch (err) {
  console.log(`Failed to read day1.txt:\n${err}`);
  process.exit(1);
}

const left: number[] = [];
const right: number[] = [];

data.split("\n").forEach((line) => {
  if (line.length == 0) return;

  const split = line.split(/\s+/);
  left.push(+split[0]);
  right.push(+split[1]);
});

left.sort();
right.sort();

const count = new Map<number, number>();
for (let i = 0; i < right.length; i++) {
  count.set(right[i], (count.get(right[i]) || 0) + 1);
}

let totalDistance = 0;
let similarityScore = 0;
assert(left.length == right.length);
for (let i = 0; i < left.length; i++) {
  totalDistance += Math.abs(left[i] - right[i]);
  similarityScore += left[i] * (count.get(left[i]) || 0);
}

console.log(`Total Distance: ${totalDistance}`);
console.log(`similarity Score: ${similarityScore}`);
