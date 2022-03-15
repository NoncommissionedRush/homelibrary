import pool from "../config.js";
import redis from "redis";

const client = redis.createClient();
client.connect();

client.on("error", (err) => {
  console.log("Redis error :", err);
});

const createKey = (query, params) => {
  return "postgres:" + query + JSON.stringify(params);
};

/**
 * Runs a Postgres query and stores the result in redis cache
 *
 * @param   {String}    query       SQL query
 * @param   {String[]}  params      array of query parameters
 * @param   {Integer}   expiration  cache expiration in seconds
 * @returns {Object}    Array of objects returned from db / cache
 */

const Query = async (query, params, expiration) => {
  let cache = true;

  if (typeof params === "number") {
    expiration = params;
    params = [];
  }

  if (typeof expiration !== "number") {
    cache = false;
    next = expiration;
  }

  if (!cache) {
    const response = await pool.query(query, params);
    return response.rows;
  }

  const key = createKey(query, params);

  const cacheResult = await client.get(key);

  if (cacheResult) {
    return JSON.parse(cacheResult);
  }

  const response = await pool.query(query, params);

  await client.set(key, JSON.stringify(response.rows), { EX: expiration });

  return response.rows;
};

export const clearCache = (query, params = []) => {
  const key = createKey(query, params);
  client.del(key);
};

export default Query;
