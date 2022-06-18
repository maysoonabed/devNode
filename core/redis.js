export const connection = {
    redis: {
        host: 'localhost',
        port: 6379,
        retryStrategy: times => {
            // reconnect after
            return Math.min(times * 50, 2000);
          }
    }
}