import client from '../core/elasticsearch'

export const index = async (id, index, doc) => {
    return await client.index({
        id,
        refresh: 'wait_for',
        index,
        body: doc
    })
}

export const groupBy = async (index, skip, projectId) => {

    return await client.search({
        from: skip,
        size: 10,
        index,
        body: {
            "query": {
                "match": {
                    "project_info._id": {
                        query: projectId
                    }
                }
            },
            "aggs": {
                "stages": {
                    "terms": { "field": "stage" }
                }
            }
        }
    })
}

export const advanceSearch = async (index, skip, text, fields, projectId) => {

    return await client.search({
        from: skip,
        size: 10,
        index,
        body: {

            "query": {
                "bool": {
                    "must": [{
                            "match": {
                                "project_info._id": projectId
                            }
                        },
                        text ? {
                            "query_string": {
                                "query": text || "",
                                "fuzziness": "auto",
                                "fields": fields
                            }
                        } : { "match_all": {} },
                    ]

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