import { Box,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCardBody = styled(Box)`
padding:1rem;
margin: 0 2rem 2rem;
border: 1px solid lightgray;
border-width: thin;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

export const StyledKeyValueContainer = styled(Box)`
display:flex;
`
export const StyledKey = styled(Typography)`
font-weight:bold;
font-size:1rem
`
export const StyledValue = styled(Typography)`
font-size:1rem
`

