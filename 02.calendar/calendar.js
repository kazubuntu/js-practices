#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const year = argv.y || new Date(Date.now()).getFullYear();
const month = argv.m || new Date(Date.now()).getMonth() + 1;

const SATURDAY = 6;

const first = new Date(year, month - 1);
const last = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write("   ".repeat(first.getDay()));
while (first <= last) {
  process.stdout.write(first.getDate().toString().padStart(2));
  if (first.getDay() === SATURDAY) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
  first.setDate(first.getDate() + 1);
}
console.log();
