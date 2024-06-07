import fs from "fs";
import path from "path";
import { totalSales, monthlySales, mostPopularItem, highestRevenueItem, moreOnMostPopularItem } from "./problems.mjs";


async function readFileFn() {
    try {
        const readData = await fs.promises.readFile(path.join("sales-data.txt"), "utf8");

        const data = readData.trim().split("\n");
        const keys = data[0].split(",");
        const records = data.slice(1).map(salesEntry => {
            const record = {};
            salesEntry.split(",").forEach((value, index) => {
                record[keys[index]] = value;
            });
            return record;
        })
        // console.log(records);
        return records;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const salesData = await readFileFn();

totalSales(salesData);
console.log('---------------');
monthlySales(salesData);
console.log('---------------');
mostPopularItem(salesData);
console.log('---------------');
highestRevenueItem(salesData);
console.log('---------------');
moreOnMostPopularItem(salesData);

