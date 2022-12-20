export enum DietTypes {
  VEGITARIAN = "vegetarian",
  NON_VEGITARIAN = "non vegetarian",
}

export enum FlavorProfileTypes {
  SWEET = "sweet",
  SPICY = "spicy",
  BITTER = "bitter",
  SOUR = "sour",
  OTHER = "",
}

export enum CourseTypes {
  DESSERT = "dessert",
  MAIN_COURSE = "main course",
  SNACK = "snack",
  STARTER = "starter"
}

export interface IFood {
  _id:string,
  name: string;
  ingredients:string[],
  diet:DietTypes,
  flavor_profile:FlavorProfileTypes,
  course:CourseTypes,
  prep_time:number,
  cook_time:number,
  state:string,
  region:string
}
