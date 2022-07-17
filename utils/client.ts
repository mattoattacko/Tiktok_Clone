import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'eh0a6d2c',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false, //set to 'false' because we fetch new videos each time we reload the page, so we need them instantly 
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
