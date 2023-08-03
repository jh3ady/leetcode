function twoSum(numbers: number[], target: number): number[] {
    let numbersMap = new Map();

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const difference = target - number;
        
        if (numbersMap.has(difference)) {
            return [numbersMap.get(difference), i];
        }

        numbersMap.set(number, i);
    }

    return [-1, -1];
};
