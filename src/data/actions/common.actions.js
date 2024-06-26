import { ALL_CATEGORIES_GET } from 'data/constants';
import { common as API } from 'data/fetch';

export const fetchAllCategories = (id) => {
  const promise = API.fetchAllCategories(id);

  return {
    type: ALL_CATEGORIES_GET,
    promise,
  };
};
