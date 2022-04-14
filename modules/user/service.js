import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const create = async ({
  email,
  password,
  firstName,
  lastName,
  date_of_birth,
}) => {
  const hash = await bcrypt.hash(password, 3);
  return await User.create({
    email,
    password: hash,
    firstName,
    lastName,
    date_of_birth,
  });
};

export const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) return Promise.reject("incorrect email or password");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return Promise.reject("incorrect email or password");
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    fs.readFileSync("./privateKey"),
    { algorithm: "RS256" }
  );

  return token;
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};
export const userWithAge = async () => {
  const result = await User.aggregate([
    addAge,
    {
      $project: {
        password: 0,
        date_of_birth: 0,
      },
    },
  ]);
  return result;
};
export const usersNoLikes = async () => {
  const lastMonthFromToday = new Date();
  lastMonthFromToday.setMonth(lastMonthFromToday.getMonth() - 1);
  const result = await User.aggregate([
    addAge,
    {
      $match: {
        age: { $gte: 20, $lte: 30 },
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "user_id",
        as: "likes",
      },
    },
    {
      $project: {
        age: 1,
        email: 1,
        "likes.createdAt": 1,
      },
    },
    {
      $unwind: "$likes",
    },
    {
      $sort: { "likes.createdAt": -1 },
    },
    {
      $group: {
        _id: "$_id",
        age: { $first: "$age" },
        createdAt: { $first: "$likes.createdAt" },
      },
    },
    {
      $match: {
        createdAt: { $lt: lastMonthFromToday },
      },
    },
  ]);
  return result;
};
export const ageGroups = async () => {
  const result = await User.aggregate([
    addAge,
    {
      $group: {
        _id: {
          $cond: {
            if: { $lt: ["$age", 30] }, // $and: [{ $gte: ["$age", 20] }, { $lt: ["$age", 30] }]
            then: "age_less_than_30",
            else: {
              $cond: {
                if: { $lt: ["$age", 40] },
                then: "age_30_40",
                else: "age_over_40",
              },
            },
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  return result;
};
const addAge = {
  $addFields: {
    age: {
      $dateDiff: {
        startDate: "$date_of_birth",
        endDate: "$$NOW",
        unit: "year",
      },
    },
  },
};
