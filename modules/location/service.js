import UserLocation from "../../models/UserLocation.js";
import mongoose from "mongoose";

export const create = async ({ user_id, location }) => {
    return await UserLocation.create({ user_id, location });
};

export const find = async ({ lng, lat }) => {
    return await UserLocation.aggregate([{
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            distanceField: "dist.calculated",
            maxDistance: 20,
            spherical: true,
        },
    }, ]);
};

export const getDistance = async ({ coordinates, transportation, location }) => {
    const loc = await UserLocation.aggregate([{
        $geoNear: {
            near: {
                type: "Point",
                coordinates
            },
            distanceField: "dist.calculated",
            query: { "_id": mongoose.Types.ObjectId(location) },
            spherical: true,
        },
    }, ]);

    let distance = loc[0].dist.calculated
    let time = 0
    switch (transportation) {
        case "walking":
            time = distance / 5
            break;
        case "driving":
            time = distance / 70
            break;
        default:
    }
    return { distance, time }
};



export const getTime = async ({ coordinates, speed, location }) => {
    const loc = await UserLocation.aggregate([{
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates
                },
                distanceField: "Time",
                distanceMultiplier: 1 / speed,
                query: { "_id": mongoose.Types.ObjectId(location) },
                spherical: true,
            },
        },
        { $project: { Time: 1, _id: 0 } }

    ]);

    return loc[0]
};


export const findById = async (id) => {
    return await UserLocation.findById(id)
};