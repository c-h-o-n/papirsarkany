import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';

export function getKites() {
  const kites = client.fetch(groq`*[_type == "kites"]`)
}