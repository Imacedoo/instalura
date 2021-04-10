import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';
import AboutScreen, { getContent } from '../src/components/screens/AboutScreen';

export async function getStaticProps() {
  const messages = await getContent();

  return {
    props: {
      messages,
    },
  };
}

export default websitePageHOC(AboutScreen);
