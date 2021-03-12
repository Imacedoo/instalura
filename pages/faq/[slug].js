import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

export default websitePageHOC(FAQQuestionScreen);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (respostaDoServer) => {
      const resposta = await respostaDoServer.json();
      return resposta.data;
    });

  const dadosDaPagina = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => question.slug === params.slug);

    if (foundQuestion) {
      return {
        ...valorAcumulado,
        category: faqCategory,
        question: foundQuestion,
      };
    }

    return valorAcumulado;
  }, {});

  return {
    props: {
      category: dadosDaPagina.category,
      question: dadosDaPagina.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: dadosDaPagina.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (respostaDoServer) => {
      const resposta = await respostaDoServer.json();
      return resposta.data;
    });

  const paths = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const questionPaths = faqCategory.questions.map((question) => (
      { params: { slug: question.slug } }
    ));

    return [
      ...valorAcumulado,
      ...questionPaths,
    ];
  }, []);

  return {
    paths,
    fallback: false,
  };
}
