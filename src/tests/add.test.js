const add = (a, b) => (a + b);
const generateGreeting = (name) => `Hello ${name}!` 

test("Adding two numbers", () => {
    const result = add (4,5);
    expect(result).toBe(9);
});

test("Meet & Greet", () => {
    const greeting = generateGreeting('Sankar');
    expect(greeting).toBe("Hello Sankar!");
});
