import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  foods:[],
  pagination:null,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action: {type:any,payload?:any}) => {
  const {type, payload} = action
  
  switch (type) {
    case actionTypes.GET_ALL_FOODS_SUCCESS:
      console.log(payload)
      return {
        ...state,
        pagination:payload.pagination,
        foods:payload.data,
        loading:false,
      };

    case actionTypes.GET_ALL_FOODS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_ALL_FOODS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
