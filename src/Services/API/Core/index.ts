import {
  ApiOptions,
  getAllI,
  getSingleI,
  patchI,
  postI,
  putI,
  removeI,
  // getPaginationI,
} from "../../../Interfaces";
import { apiProvider } from "../Provider";

export class ApiCore<T> {
  [x: string]: any;
  getAll: getAllI<T[]>;
  getSingle: getSingleI<T>;
  post: postI<T>;
  put: putI<T>;
  patch: patchI<T>;
  remove: removeI<T>;
  // getPagination:getPaginationI<T>;
  constructor(options: ApiOptions) {
    if (options.getAll) {
      this.getAll = (page = 1, perPage = 10, otherQueryParam = "") => {
        return apiProvider.getAll(
          `${options.url}?page=${page}&perPage=${perPage}${otherQueryParam}`
        );
      };
    }

    if (options.getSingle) {
      this.getSingle = (id, queryParam = "") => {
        return apiProvider.getSingle(options.url, id, queryParam);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(options.url, model);
      };
    }

    if (options.put) {
      this.put = (id, model) => {
        return apiProvider.put(options.url, id, model);
      };
    }

    if (options.patch) {
      this.patch = (id, model) => {
        return apiProvider.patch(options.url, id, model);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}
