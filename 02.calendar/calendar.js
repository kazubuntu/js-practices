#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const year = argv.y || new Date(Date.now()).getFullYear();
const month = argv.m || new Date(Date.now()).getMonth() + 1;

const SATURDAY = 6;

const beginning_of_the_month = new Date(year, month - 1, 1);
const end_of_the_month = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

process.stdout.write("   ".repeat(beginning_of_the_month.getDay()));
for (
  const day_of_the_month = new Date(beginning_of_the_month);
  day_of_the_month <= end_of_the_month;
  day_of_the_month.setDate(day_of_the_month.getDate() + 1)
) {
  process.stdout.write(day_of_the_month.getDate().toString().padStart(2));
  day_of_the_month.getDay() === SATURDAY
    ? console.log()
    : process.stdout.write(" ");
}
console.log();
