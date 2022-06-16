import { Client } from '@elastic/elasticsearch'

let client = new Client({
    node: 'http://localhost:9200',
})

export default client