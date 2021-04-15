import { isStaging } from '../../infra/env/isStagingEnv';
import { httpClient } from '../../infra/http/httpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api.omariosouto.vercel.app';

export const userService = {
  async getProfilePage(context) {
    const url = `${BASE_URL}/api/users/posts`;
    try {
      const token = await authService(context).getToken();
      const response = await httpClient(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        user: {
          totalLikes: 100,
        },
        posts: response.data,
      };
    } catch (error) {
      throw new Error('Não conseguimos oegar os posts.');
    }
  },
};
