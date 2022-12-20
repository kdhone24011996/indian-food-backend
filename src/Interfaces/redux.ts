
import { IPagination } from "./Api";
import { IFood } from "./Api/food";

export interface RootState {
  FoodReducer: {
    foods: IFood[] | null;
    pagination:IPagination,
    loading:boolean,
    error:any
  };
}
