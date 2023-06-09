#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const year = argv.y || new Date(Date.now()).getFullYear();
const month = argv.m || new Date(Date.now()).getMonth() + 1;

const SATURDAY = 6;

const beginningOfTheMonth = new Date(year, month - 1, 1);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write("   ".repeat(beginningOfTheMonth.getDay()));

const lastDay = new Date(year, month, 0).getDate();
for (let day = 1; day <= lastDay; day++) {
  process.stdout.write(day.toString().padStart(2));
  const dayOfWeek = new Date(year, month - 1, day).getDay();
  if (dayOfWeek === SATURDAY) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
console.log();
