import Queue from 'bull'
import { connection } from '../core/redis.js'

const fibonacci = new Queue('compute fibonacci', connection)

var fib = function (n) {
    if (n === 1) {
        return [0, 1];
    } else {
        var arr = fib(n - 1);
        arr.push(arr[arr.length - 1] + arr[arr.length - 2])
        return arr;
    }
}

fibonacci.process((job, done) => {
    const value = job.data
    for (let i = 0; i < 10000000; i++) {

    }
    done(100)
})

export default fibonacci