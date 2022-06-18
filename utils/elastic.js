import client from "../core/elasticsearch.js";

export const index = async (id, index_name, document) => {
  return await client.index({
    id,
    refresh: "wait_for", // max 1 sec.
    index: index_name,
    body: document,
  });
};

export const search = async (index_name, query) => {
  const response = await client.search({
    index: index_name,
    from: 1,
    size: 100,
    body: {
      query: {
        match_all: {},
      },
    },
  });
  return response.body;
};

export const bulkApi = async (index, dataset) => {
  // const operations = dataset.flatMap(doc => [{ index: { _index: index, _id: doc._id } }, doc])
  const operations = dataset.flatMap(doc => {
    const copy = JSON.parse(JSON.stringify(doc))
    const id = copy._id
    delete copy._id
    delete copy.__v
    return [
      { index: { _index: index, _id: id } },
      copy
    ]
  })
  console.log(JSON.stringify(operations, null, 2))
  const bulkResponse = await client.bulk({ refresh: true, body: operations })
  console.log(bulkResponse)
  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error
        })
      }
    })
    console.log(erroredDocuments)
  }
}