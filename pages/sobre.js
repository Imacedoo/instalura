import { GraphQLClient, gql } from 'graphql-request';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';
import AboutScreen from '../src/components/screens/AboutScreen';

export async function getStaticProps() {
  const TOKEN = process.env.DATO_CMS_TOKEN;
  const DatoCMSURL = 'https://graphql.datocms.com/';
  const client = new GraphQLClient(DatoCMSURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const query = gql`
    query {
      pagesobre {
        pageTitle
        pageDescription
      }
    }
  `;

  const messages = await client.request(query);

  return {
    props: {
      messages,
    },
  };
}

export default websitePageHOC(AboutScreen);
