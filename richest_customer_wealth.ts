function sumArray(array: number[]): number {
    let sum = 0;

    for (let item of array) {
        sum += item;
    }

    return sum;
}

function maximumWealth(accounts: number[][]): number {
    let maxWealth = 0;

    for (let account of accounts) {
        const currentAccountWealth = sumArray(account);

        maxWealth = Math.max(maxWealth, currentAccountWealth);
    }

    return maxWealth;
};
