import { supabase } from "../config";
import NodeCache from "node-cache";
import "dotenv/config";

const cache = new NodeCache({stdTTL: 100, checkperiod: 120 })

const createKey = (query, params) => {
  return "postgres:" + query + JSON.stringify(params);
};

/**
 * Runs a Postgres query and stores the result in node cache
 *
 * @param   {String}    query       SQL query
 * @param   {String[]}  params      array of query parameters
 * @param   {Integer}   expiration  cache expiration in seconds
 * @returns {Object}    Array of objects returned from db / cache
 */

const Query = async (query, params, expiration) => {
  let cacheEnabled = true;

  if (typeof params === "number") {
    expiration = params;
    params = [];
  }

  if (typeof expiration !== "number") {
    cacheEnabled = false;
    next = expiration;
  }

  if (!cacheEnabled) {
    const { data, error } = await supabase.rpc('execute_sql', { sql: query, params })

    if(error) {
      console.log(error)
      return []
    }

    return data;
  }

  const key = createKey(query, params);

  const cacheResult = await cache.get(key);

  if (cacheResult) {
    console.log("serving from cache");
    return JSON.parse(cacheResult);
  }

  const { data, error } = await supabase.rpc('execute_sql', { sql: query, params })

  if(error) {
    console.log(error)
    return []
  }

  cache.set(key, JSON.stringify(data), expiration);

  return data;
};

export const clearCache = (query, params = []) => {
  const key = createKey(query, params);
  cache.del(key);
};

export default Query;
