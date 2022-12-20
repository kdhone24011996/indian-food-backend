
import { ApiOptions } from "Interfaces";
import { IFood } from "Interfaces/Api/food";
import { apiProvider } from "Services/API/Provider";
import { ApiCore } from "../../Core";

const url = "food";

class FoodAPICore extends ApiCore<IFood> {
  getIngredientOptions: (param:String) => Promise<any>;
  dishSuggester: (param:string) => Promise<any>;
  constructor(options: ApiOptions) {
    super(options);
    this.getIngredientOptions = (param) => {
      return apiProvider.getAll(`${options.url}/ingredients?${param}`);
    };
    this.dishSuggester = (param: string) => {
      return apiProvider.getAll(`${options.url}/suggester/arr?${param}`);
    };
  }
}

const apiFoods = new FoodAPICore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: false,
  remove: false,
  url: url,
});
export { apiFoods };
