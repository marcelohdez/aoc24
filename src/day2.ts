import fs from "node:fs";

let data: string;

try {
  data = fs.readFileSync("input/day2.txt").toString();
} catch (err) {
  console.log(`Failed to read day2.txt:\n${err}`);
  process.exit(1);
}

let totalValid = 0;
data.split("\n").forEach((line) => {
  if (!line) return;

  const splits = line.split(/\s+/).map((split) => +split);

  let valid = true;
  let previous: number | undefined;
  let increasing: boolean | undefined;
  for (const level of splits) {
    if (previous == undefined) {
      previous = level;
      continue;
    }

    let increasingNow = level > previous;
    if (increasing == undefined) increasing = increasingNow;
    if (increasing != increasingNow) {
      valid = false;
      break;
    }

    const diff = Math.abs(level - previous);
    if (diff > 3 || diff == 0) {
      valid = false;
      break;
    }

    previous = level;
  }

  if (valid) totalValid++;
});

console.log(`Total Valids: ${totalValid}`);
