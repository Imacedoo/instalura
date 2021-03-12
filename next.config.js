import redirects from './config/redirects';

module.exports = {
  trailingSlash: true,
  async redirects() {
    return redirects;
  },
};
