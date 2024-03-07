import { environnement as dotenv } from './dotenv';

export const environment = {
    API_KEY_TMDB: dotenv['API_KEY_TMDB']
};