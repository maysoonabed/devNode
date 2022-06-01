export default interface Opts {
    jobId: string
    repeat: {
        every: number
        limit: number
        endDate ? : Date
    }
}