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

export const getDistance = async (req, res) => {
    let { coordinates, transportation } = req.body;
    let location = req.params.id
    coordinates = extractCoords(coordinates)
    const distance = await service.getDistance({ coordinates, transportation, location });
    return res.send(distance)
};

export const getTime = async (req, res) => {
    let { coordinates, speed } = req.body;
    let location = req.params.id
    coordinates = extractCoords(coordinates)

    const time = await service.getTime({ coordinates, speed, location });
    return res.send(time)
};

export const extractCoords = (coords) => {
    const regExp = /(?<=\().*?(?=\))/g;
    return coords.match(regExp)[0].trim().split(",").map(str => {
        return Number(str);
    })
}