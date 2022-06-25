import * as service from "./service.js";

export const create = async (req, res) => {
  const { user_id, location } = req.body;
  const result = await service.create({ user_id, location });
  res.status(201).send(result);
};

export const find = async (req, res) => {
  const { lng, lat } = req.query;
  const locations = await service.find({ lng, lat });
  return res.send(locations);
};
