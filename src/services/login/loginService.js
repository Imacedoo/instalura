import { setCookie, destroyCookie } from 'nookies';
import { isStaging } from '../../infra/env/isStagingEnv';
import { httpClient } from '../../infra/http/httpClient';

export const LOGIN_COOKIE_APP_TOKEN = 'LOGIN_COOKIE_APP_TOKEN';

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api.omariosouto.vercel.app';

export const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    httpClientModule = httpClient,
  ) {
    return httpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((respostaConvertida) => {
        const { token } = respostaConvertida.data;
        const hasToken = token;
        if (!hasToken) {
          throw new Error('Failed to login');
        }

        const DAY_IN_SECONDS = 86400;
        setCookieModule(null, LOGIN_COOKIE_APP_TOKEN, token, {
          path: '/',
          maxAge: DAY_IN_SECONDS * 7,
        });

        return {
          token,
        };
      });
  },

  logout(context, destroyCookieModule = destroyCookie) {
    destroyCookieModule(context, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
  },
};
