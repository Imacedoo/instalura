import { GraphQLClient, gql as GraphQLTag } from 'graphql-request';

export const gql = GraphQLTag;

export function CMSGraphQLClient({ preview } = { preview: false }) {
  const DatoCMSURL = preview
    ? 'https://graphql.datocms.com/preview'
    : 'https://graphql.datocms.com/';

  const TOKEN = process.env.DATO_CMS_TOKEN;
  const client = new GraphQLClient(DatoCMSURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return {
    // eslint-disable-next-line no-unused-vars
    async query({ query, variables }) {
      const messages = await client.request(query);

      return {
        data: {
          messages,
        },
      };
    },
  };
}
