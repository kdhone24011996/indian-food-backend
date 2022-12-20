import { useDispatch, useSelector, useStore } from "react-redux";
import { useEffect, useState } from "react";
import { getAllFoods } from "store/actions";
import {
  CourseTypes,
  DietTypes,
  FlavorProfileTypes,
  IFood,
} from "../Interfaces/Api/food";
import Box from "@mui/material/Box";
import CommonTable from "Component/Basic/CommonTable";
import { usePagination } from "hooks/tablePaginationHook";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "name",
    headerName: "Name",
    filterable: true,
    renderCell: (params: any) => {
      console.log(params);
      return <a href={`foods/${params.row.id}`}>{params.value}</a>;
    },
  },
  {
    field: "diet",
    headerName: "Diet",
    filterable: true,
    isValueSelectable: true,
    nameKey: "diet",
    options: Object.values(DietTypes).map((item) => ({ diet: item })),
  },
  {
    field: "ingredients",
    headerName: "Ingredients",
    filterable: true,
    width: 300,
  },
  {
    field: "flavor_profile",
    headerName: "flavor_profile",
    filterable: true,
    isValueSelectable: true,
    nameKey: "flavor_profile",
    options: Object.values(FlavorProfileTypes).map((item) => ({
      flavor_profile: item,
    })),
  },
  {
    field: "course",
    headerName: "Course",
    filterable: true,
    isValueSelectable: true,
    nameKey: "course",
    options: Object.values(CourseTypes).map((item) => ({ course: item })),
  },
  {
    field: "prep_time",
    headerName: "Prep Time",
    filterable: true,
  },
  {
    field: "cook_time",
    headerName: "Cook Time",
    filterable: true,
  },
  {
    field: "state",
    headerName: "State",
    filterable: true,
    width: 200,
  },
  {
    field: "region",
    headerName: "Region",
    filterable: true,
  },
];
export const Home: React.FunctionComponent = () => {
  const [page, handleChangePage] = usePagination();
  const [extraQueryParam, setExtraQueryParam] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllFoods(page, rowsPerPage, extraQueryParam));
  }, [page, extraQueryParam, rowsPerPage]);

  const foodReducer = useSelector((state) => state?.FoodReducer);
  console.log(foodReducer);

  const handleFilter = (filterRows: any, linkedOperator: any) => {
    const filterArr: any = [];
    filterRows.forEach((element: any) => {
      const obj = {
        [element.name]: {
          [element.operator]: element.value,
        },
      };
      filterArr.push(obj);
    });
    const filterObj = {
      [linkedOperator]: filterArr,
    };
    const queryParam = `&filter=${JSON.stringify(filterObj)}`;
    setExtraQueryParam(queryParam);
  };

  const rowsData = foodReducer?.foods?.map((item) => {
    return {
      id: item._id,
      name: item?.name,
      diet: item.diet,
      ingredients: item.ingredients,
      flavor_profile: item.flavor_profile,
      course: item.course,
      prep_time: item.prep_time,
      cook_time: item.cook_time,
      state: item.state,
      region: item.region,
    };
  });

  return (
    <Box>
      <Button onClick={() => navigate("/foods/dish-suggester")}>
        Go to dish Suggestor
      </Button>
      {foodReducer.foods && foodReducer.foods.length > 0 && (
        <CommonTable
          Title="Indial Foods"
          button="Add Food"
          handleChangePage={handleChangePage}
          addItems={() => {}}
          totalRows={foodReducer?.pagination.totalCount}
          page={page}
          showFilter={false}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(value: number) => setRowsPerPage(value)}
          rows={rowsData}
          columns={columns}
          handleFilter={handleFilter}
          loading={foodReducer.loading}
        />
      )}
    </Box>
  );
};
