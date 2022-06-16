import client from '../core/elasticsearch'

export const index = async (id, index, doc) => {
    return await client.index({
        id,
        refresh: 'wait_for',
        index,
        body: doc
    })
}

export const groupBy = async (index, skip) => {

    return await client.search({
        from: skip,
        size: 10,
        index,
        body: {
            "aggs": {
                "stages": {
                    "terms": { "field": "stage" }
                }
            }
        }
    })
}

export const advanceSearch = async (index, skip, text, fields) => {

    return await client.search({
        from: skip,
        size: 10,
        index,
        body: {
            "query": {
                "query_string": {
                    "query": text,
                    "fuzziness": "auto",
                    "fields": fields
                }
            }
        }
    })
}


export const updateDocument = async (id, index, doc) => {

    return await client.update({
        index,
        id,
        body: {
            doc
        }
    })
}

export const deleteDocument = async (id, index) => {

    return await client.delete({
        index,
        id
    });
}


export const deleteQuery = async (query, index) => {

    return await client.deleteByQuery({
        index,
        body: {
            query
        }
    });
}