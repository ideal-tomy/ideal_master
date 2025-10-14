import { createClient } from 'microcms-js-sdk';

const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;

console.log('Environment variables check:');
console.log('API Key exists:', !!apiKey);
console.log('Service Domain exists:', !!serviceDomain);

if (!serviceDomain || !apiKey) {
  throw new Error('Required environment variables are missing');
}

export const client = createClient({
  serviceDomain,
  apiKey
});