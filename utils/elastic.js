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
