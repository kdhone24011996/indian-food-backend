import { useSelector } from "react-redux";
import { RootState } from "./redux";

// Thanks to that you will have ability to use useSelector hook with state value
declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
