import { supabase } from '../config.js';
import NodeCache from 'node-cache';
import { SupabaseViews } from '../client/src/supabase-views.enum.js';
import 'dotenv/config';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const createKey = (query, params) => {
    const key = 'postgres:' + query;
    if (params) {
        key += JSON.stringify(params);
    }
    return key;
};

/**
 * Cache wrapper for executing suapbase view
 *
 * @param   {SupabaseViews}    string          Name of the supabase view
 * @returns {Object}                           Array of objects returned from db / cache
 */

const Query = async (supabaseView, expiration) => {
    let cacheEnabled = true;

    if (typeof params === 'number') {
        expiration = params;
        params = [];
    }

    if (typeof expiration !== 'number') {
        cacheEnabled = false;
        next = expiration;
    }

    if (!cacheEnabled) {
        const { data, error } = await supabase.from(supabaseView).select('*');

        if (error) {
            console.log(error);
            return [];
        }

        return data;
    }

    const cacheResult = await cache.get(supabaseView);

    if (cacheResult) {
        console.log('serving from cache');
        return JSON.parse(cacheResult);
    }

    const { data, error } = await supabase.from(supabaseView).select('*');

    if (error) {
        console.log(error);
        return [];
    }

    cache.set(supabaseView, JSON.stringify(data), expiration);

    return data;
};

export const clearCache = (query, params = []) => {
    const key = createKey(query, params);
    cache.del(key);
};

export default Query;
