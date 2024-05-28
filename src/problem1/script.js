function sum_to_n_a(n) {
    return n * (n + 1) / 2;
}

function sum_to_n_b(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_c(n) {
    let val
    function* sumGenerator(n) {
        let total = 0;
        for (let i = 1; i <= n; i++) {
            total += i;
            yield total;
        }
    }
    const gen = sumGenerator(n);
    let result = gen.next();
    while (!result.done) {
        val = result.value
        result = gen.next();
    }
    return val
}

function run(type = "a" | "b" | "c", INPUT) {
    if(!(Boolean(INPUT) && typeof INPUT === "number")) {
        throw new Error("Input is not valid!")
    }
    const start = Date.now();
    let rs
    switch(type) {
        case "a":
            rs = `sum_to_n_a: ${sum_to_n_a(INPUT)}`
            break;
        case "b":
            rs = `sum_to_n_b: ${sum_to_n_b(INPUT)}`
            break
        case "c":
            rs = `sum_to_n_c: ${sum_to_n_c(INPUT)}`
            break
        default:
            break
    }
    const end = Date.now();
    const elapsedTime = end - start;
    console.log(`${rs} timing: ${elapsedTime / 1000} seconds`);
}
const INPUT = 100
run("a", INPUT)
run("b", INPUT)
run("c", INPUT)


