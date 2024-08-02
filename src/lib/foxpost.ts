import { FoxpostCreateParcelRequestBody } from './types';

const {
  FOXPOST_API_USERNAME,
  FOXPOST_API_PASSWORD,
  FOXPOST_API_KEY,
  FOXPOST_API_URL,
} = process.env;

const foxpostHeaders = new Headers({
  Authorization:
    'Basic ' + btoa(FOXPOST_API_USERNAME + ':' + FOXPOST_API_PASSWORD),
  'Content-Type': 'application/json',
  'Api-key': FOXPOST_API_KEY || 'missing-api-key',
});

export function createParcel(body: FoxpostCreateParcelRequestBody) {
  return fetch(`${FOXPOST_API_URL}/parcel?isWeb=true`, {
    method: 'POST',
    headers: foxpostHeaders,
    body: JSON.stringify([body]),
  });
}
