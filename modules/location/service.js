import UserLocation from "../../models/UserLocation.js";

export const create = async ({ user_id, location }) => {
  return await UserLocation.create({ user_id, location });
};

export const find = async ({ lng, lat }) => {
  return await UserLocation.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        distanceField: "dist.calculated",
        maxDistance: 100000,
        spherical: true,
      },
    },
  ]);
};
