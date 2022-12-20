import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)`
  display: flex;
  height: 100%;
  flex-direction: column;

  justify-content: space-between;
  align-items: space-between;
`;

export const StyledHeader = styled(Typography)`
  text-align: center;
  margin: 1rem;
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
`;

export const StyledOption = styled(Typography)`
  font-size: 0.875rem;
  line-height: 20px;
  font-weight: 500;
  text-transform: capitalize;
  margin: 0;
`;


export const StyledText = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  text-align: center;
  color: black;
`;
