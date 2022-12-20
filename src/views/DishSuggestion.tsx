import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { apiFoods } from "Services/API/IndividualApis/Foods";


export const DishSuggestion = () => {
  const [searchedText, setSearchedText] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([])
  // selected ingredients
  const [value, setValue] = useState([])
  const [suggestedDeshes, setSuggestedDishes] = useState([])

  useEffect(() => {
    // wait for 1sec for api call to happen after stopped typing
    const timeout = setTimeout(() => {
      getIngredientOptions();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchedText]);

  useEffect(()=>{
    getDishSuggester()
  },[value])

  const getDishSuggester = async () => {
    let param = ''
    value.forEach((item:any)=>{
      if(param === ''){
        param = 'ingredients='+item._id
      }else{
        param = param + "&ingredients="+item._id
      }
    })
    const response = await apiFoods.dishSuggester(param)
    setSuggestedDishes(response)
    console.log(response)
  };
  const getIngredientOptions = async () => {
    const response = await apiFoods.getIngredientOptions(
      `text=${searchedText}`
    );
    setIngredientOptions(response)
    console.log(response);
  };
  function onSearchTextHandler(e: any) {
    console.log(e);
    setSearchedText(e.target.value);
  }
  return (
    <Box>
      <Autocomplete
        multiple
        id="tags-standard"
        options={ingredientOptions}
        getOptionLabel={(option:any) =>
          typeof option === 'string' ? option : option._id
        }
        defaultValue={[]}
        onChange={(event: any, newValue: any) => {
          // setOptions(newValue ? [newValue, ...options] : options);
          console.log(newValue)
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Ingredients"
            placeholder="Select Ingredients"
            onChange={onSearchTextHandler}
          />
        )}
      />

      <Box style={{marginTop:"2rem"}}>
        <h2>Suggested Dishes:</h2>
        <ul>
          {
            suggestedDeshes.map((item:any)=>{
              return <li style={{fontSize:"1rem", marginTop:'0.5rem'}} key={item.name}>{item.name}</li>
            })
          }
        </ul>
      </Box>
    </Box>
  );
};
