import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';
import AboutScreen, { getContent } from '../src/components/screens/AboutScreen';

export async function getStaticProps({ preview }) {
  const messages = await getContent({ preview });

  return {
    props: {
      messages,
    },
  };
}

export default websitePageHOC(AboutScreen);
