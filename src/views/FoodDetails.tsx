import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useParams } from "react-router-dom";
import { apiFoods } from "Services/API/IndividualApis/Foods";
import {useEffect, useState} from 'react'
import { IFood } from "Interfaces/Api/food";
import { Card, CardHeader } from "@mui/material";
import { StyledCardBody, StyledKey, StyledKeyValueContainer, StyledValue } from "Styles/PatientStyles/tableStyles";
import { StyledHeader } from "Styles/PatientStyles/commonStyle";

export const FoodDetails = ()=>{
  const { id } = useParams();
  const [ food, setFood] = useState<IFood>()
  useEffect(()=>{
    getFoodDetails()
  },[id])

  const getFoodDetails = async()=>{
    try{
      const food = await apiFoods.getSingle!(id as string)
      setFood(food)
    }catch(err){

    }
  }
  return (
    <Card style={{padding:"2rem"}}>
      <StyledHeader>{food?.name}</StyledHeader>
      <StyledCardBody>
        
        <StyledKeyValueContainer style={{justifyContent:"space-around"}}>
        <StyledKeyValueContainer >
          <StyledKey>Ingredients</StyledKey>:
         <StyledValue>{food?.ingredients}</StyledValue>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer >
          <StyledKey>Diet</StyledKey>:
         <StyledValue>{food?.diet}</StyledValue>
        </StyledKeyValueContainer>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer style={{justifyContent:"space-around"}}>
        <StyledKeyValueContainer >
          <StyledKey>Flavor Profile</StyledKey>:
         <StyledValue>{food?.flavor_profile}</StyledValue>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer >
          <StyledKey>Course</StyledKey>:
         <StyledValue>{food?.course}</StyledValue>
        </StyledKeyValueContainer>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer style={{justifyContent:"space-around"}}>
        <StyledKeyValueContainer >
          <StyledKey>Preparation Time</StyledKey>:
         <StyledValue>{food?.prep_time}</StyledValue>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer >
          <StyledKey>Cooking Time</StyledKey>:
         <StyledValue>{food?.cook_time}</StyledValue>
        </StyledKeyValueContainer>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer style={{justifyContent:"space-around"}}>
        <StyledKeyValueContainer >
          <StyledKey>State</StyledKey>:
         <StyledValue>{food?.state}</StyledValue>
        </StyledKeyValueContainer>
        <StyledKeyValueContainer >
          <StyledKey>Region</StyledKey>:
         <StyledValue>{food?.region}</StyledValue>
        </StyledKeyValueContainer>
        </StyledKeyValueContainer>
      </StyledCardBody>
    </Card>
  )
}