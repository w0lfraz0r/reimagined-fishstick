/*
    1.Total sales of the store.
    2.Month wise sales totals.
    3.Most popular item (most quantity sold) in each month.
    4.Items generating most revenue in each month.
    5.For the most popular item, find the min, max and average number of orders each month.
*/

/*
format of sales entry
  {
    Date: '2019-01-01',
    SKU: 'Vanilla Double Scoop',
    'Unit Price': '80',
    Quantity: '5',
    'Total Price': '400'
  }

*/
const months = ['January', 'February', 'March', 'April', 'May', "June", 'July', 'August', 'September', 'October', 'November', 'December'];

// 1.Total sales of the store.
export const totalSales = function (records) {
    let totalSales = 0;
    records.forEach(record => {
        totalSales += Number(record['Total Price']);
    });
    console.log(`Total sales of the store is ${totalSales}`);
    return totalSales;
}

// 2.Month wise sales totals.
export const monthlySales = function (records) {
    const monthlySales = {};
    records.forEach(record => {
        const month = record['Date'].split("-")[1];
        if (monthlySales[months[Number(month) - 1]]) {
            monthlySales[months[Number(month) - 1]] += Number(record['Total Price']);
        } else {
            monthlySales[months[Number(month) - 1]] = Number(record['Total Price']);
        }
    });

    console.log(`Month wise sales total is ${JSON.stringify(monthlySales)}`);
    return monthlySales;
}

// 3.Most popular item (most quantity sold) in each month.
export const mostPopularItem = function (records) {

    const monthlySales = records.reduce((accumulator, record) => {
        const month = months[Number(record['Date'].split("-")[1]) - 1];
        const sku = record['SKU'];

        if (!accumulator[month]) {
            accumulator[month] = {};
        }
        if (!accumulator[month][sku]) {
            accumulator[month][sku] = 0;
        }
        accumulator[month][sku] += Number(record['Quantity']);

        return accumulator;
    }, {});

    const mostPopularItem = Object.keys(monthlySales).reduce((accumulator, month) => {
        const popularItem = Object.keys(monthlySales[month]).reduce((acc, sku) => {
            if (acc.quantity < monthlySales[month][sku]) {
                acc.quantity = monthlySales[month][sku];
                acc.sku = sku;
            }
            return acc;
        }, { quantity: 0, sku: "" });
        accumulator[month] = popularItem;
        return accumulator;
    }, {});

    console.log(`Most popular item (most quantity sold) in each month. ${JSON.stringify(mostPopularItem)}`);
    return mostPopularItem;

}

// 4.Items generating most revenue in each month.
export const highestRevenueItem = function (records) {

    const monthlySales = records.reduce((accumulator, record) => {
        const month = months[Number(record['Date'].split("-")[1]) - 1];
        const sku = record['SKU'];

        if (!accumulator[month]) {
            accumulator[month] = {};
        }
        if (!accumulator[month][sku]) {
            accumulator[month][sku] = 0;
        }
        accumulator[month][sku] += Number(record['Total Price']);

        return accumulator;
    }, {});

    const flagshipItemPermonth = Object.keys(monthlySales).reduce((accumulator, month) => {
        const flagshipItem = Object.keys(monthlySales[month]).reduce((acc, sku) => {
            if (acc.revenue < monthlySales[month][sku]) {
                acc.revenue = monthlySales[month][sku];
                acc.sku = sku;
            }
            return acc;
        }, { revenue: 0, sku: "" });
        accumulator[month] = flagshipItem;
        return accumulator;
    }, {});

    console.log(`Items generating most revenue in each month. ${JSON.stringify(flagshipItemPermonth)}`);
    return flagshipItemPermonth;
}

// 5.For the most popular item, find the min, max and average number of orders each month.
export const moreOnMostPopularItem = function (records) {
    const mostPopularItem = { quantity: 0, sku: "" };
    const itemSales = records.reduce((accumulator, record) => {
        const sku = record['SKU'];
        if (!accumulator[sku]) {
            accumulator[sku] = 0;
        }
        accumulator[sku] += Number(record['Quantity']);

        return accumulator;
    }, {});

    Object.keys(itemSales).forEach((item) => {
        if (mostPopularItem.quantity < itemSales[item]) {
            mostPopularItem.quantity = itemSales[item];
            mostPopularItem.sku = item;
        }
    });
    // console.log(mostPopularItem.sku);

    const groupBymonth = records.filter(record => record['SKU'] === mostPopularItem.sku).
        reduce((accumulator, record) => {
            const month = months[Number(record['Date'].split("-")[1]) - 1];
            if (!accumulator[month]) {
                accumulator[month] = [];
            }
            accumulator[month].push(record);

            return accumulator;
        }, {});
    // console.log(Object.keys(groupBymonth));

    const minMaxAvg = Object.keys(groupBymonth).reduce((accumulator, month) => {
        const quantity = groupBymonth[month].reduce((acc, record) => {
            acc += Number(record['Quantity']);
            return acc;
        }, 0);
        accumulator[month] = {
            min: Math.min(...groupBymonth[month].map(record => Number(record['Quantity']))),
            max: Math.max(...groupBymonth[month].map(record => Number(record['Quantity']))),
            avg: quantity / groupBymonth[month].length
        };
        return accumulator;

    }, {});

    console.log(`For the most popular item, find the min, max and average number of orders each month. (most popular item - ${mostPopularItem.sku}) ${JSON.stringify(minMaxAvg)}`);
    return minMaxAvg

}
