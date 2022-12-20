import { RootStateOrAny } from "react-redux";
import { Dispatch } from "redux";
import { apiFoods } from "Services/API/IndividualApis/Foods";
import * as actionTypes from "./actionsTypes";

export const getAllFoods = (page:number=1,perPage:number=10,extraQuery:string) => {
  console.log('hello')
  return async(dispatch:Dispatch,state:RootStateOrAny)=>{
    dispatch({
      type:actionTypes.GET_ALL_FOODS_START
    })
    try{
      console.log('hii')
    const foods = await  apiFoods.getAll!(page,perPage,extraQuery)
    console.log('foods',foods)
    return dispatch({
      type:actionTypes.GET_ALL_FOODS_SUCCESS,
      payload:foods
     })
    }catch(err){
     return dispatch({
        type:actionTypes.GET_ALL_FOODS_FAIL,
        payload:err
      })
    }
  }
};
