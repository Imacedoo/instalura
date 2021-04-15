import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { LOGIN_COOKIE_APP_TOKEN, loginService } from '../login/loginService';
import { httpClient } from '../../infra/http/httpClient';
import { isStaging } from '../../infra/env/isStagingEnv';

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api.omariosouto.vercel.app';

export const authService = (context) => {
  const cookies = parseCookies(context);
  const token = cookies[LOGIN_COOKIE_APP_TOKEN];

  return {
    async getToken() {
      return token;
    },
    async hasActiveSession() {
      return httpClient(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          if (data.autenticated) {
            return true;
          }
          loginService.logout(context);
          return false;
        })
        .catch(() => {
          loginService.logout(context);
          return false;
        });
    },
    async getSession() {
      const session = jwt.decode(token);
      return session.user;
    },
  };
};
