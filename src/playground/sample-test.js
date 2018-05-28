const add = (a, b) => a + b;
const generateGreeting = (name) => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(3, 4);

    expect(result).toBe(7);

    // if (result !== 7) {
    //     throw new Error(`You added 4 and 3. The result was ${result}. Expect 7.`);
    // }
});

test('should return greeting', () => {
    const result = generateGreeting('Mike');
    expect(result).toBe(`Hello Mike!`);
});