import  { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  DataGrid,
  getGridNumericColumnOperators,
  GridColTypeDef,
  GridOverlay,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { StyledCardBody } from "Styles/PatientStyles/tableStyles";

const CommonTable = ({
  Title,
  page,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
  handleChangePage,
  rows,
  columns,
  loading = false,
  handleFilter = () => {},
}:any) => {
  const operatorOptions = [
    { label: "Equal", value: "$eq" },
    { label: "Greater Than", value: "$gt" },
    { label: "Greater Than Equal", value: "$gte" },
    { label: "Less Than", value: "$lt" },
    { label: "Less Than Equal", value: "$lte" },
    { label: "In", value: "$in" },
  ];

  const [showFilterDropDown, setShowFilterDropDown] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true)
  const [filterRows, setFilterRows] = useState<any>([
    {
      id: 0,
      name: columns[0].field,
      operator: "$eq",
      value: "",
    },
  ]);

  const [linkedOperator, setLinkedOperator] = useState("$and");
  useEffect(() => {
    if (columns) {
      const newFilterRow = [];
      for (let key of columns) {
        if (key.filterable) {
          let obj = {
            name: key.field,
            operator: "$eq",
            value: key.options || "",
          };
          newFilterRow.push(obj);
        }
      }
      setFilterRows([newFilterRow[0]]);
    }
  }, [columns]);

  const handleAddNewFilterRow = () => {
    setFilterRows((preValue:any) => [
      ...preValue,
      {
        id: preValue.pop().id + 1,
        name: columns[0].field,
        operator: "$eq",
        value: "",
      },
    ]);
  };

  // const handleExportCsv=()=>{

  // }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarDensitySelector />
        <GridToolbarColumnsButton /> */}
        {/* <GridToolbarExport onClick={handleExportCsv} /> */}
        {/* {isExportCSV ? (
          <span
            onClick={handleExportCsv}
            style={{
              color: "#1976d2",
              cursor: "pointer",
              fontSize: "0.8125rem",
            }}
          >
            <FileDownloadIcon />
            Export
          </span>
        ) : (
          ""
        )} */}
      </GridToolbarContainer>
    );
  }

  const handleDeleteFilter = (index:any) => {
    if (filterRows.length === 1) {
      setFilterRows((preValue:any) => [
        {
          ...preValue[0],
          operator: "$eq",
          value: "",
        },
      ]);
      handleFilter(filterRows, linkedOperator, true);
    } else {
      const newFilterRows = [...filterRows];
      newFilterRows.splice(index, 1);
      setFilterRows(newFilterRows);
    }
  };

  const handleChangeRowsPerPage = (newPageSize:number) => {
    setRowsPerPage(newPageSize);
  };

  const handleFilterPropertyChange = (index:any, property:any, value:any) => {
    const newFilterRows = [...filterRows];
    newFilterRows[index][property] = value;

    setFilterRows(newFilterRows);
  };

  const handleFilterGo = () => {
    handleFilter(filterRows, linkedOperator);
  };

  const priceColumnType: GridColTypeDef = {
    extendType: "number",
    filterOperators: getGridNumericColumnOperators()
      .filter((operator:any) => operator.value === ">" || operator.value === "<")
      .map((operator:any) => {
        return {
          ...operator,
          InputComponentProps: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          },
        };
      }),
  };

  const getIsValueSelectable = (index:any) => {
    console.log(filterRows)
    const name = filterRows[index].name;
    const options = filterRows[index].options;
    const targetItem = columns.filter((item:any) => item.field === name).pop();
    return {
      isValueSelectable: targetItem.isValueSelectable,
      options: options || targetItem.options,
      nameKey: targetItem.nameKey || "name",
    };
  };


  return (
    <>
      <Grid container style={{ justifyContent: "flex-end" }}></Grid>
      <Grid container style={{ overflow: "auto" }}>
        <Grid item sm={12}>
          <Card>

                {/* <CardHeader color="primary"> */}
                <h2>
                {Title}
                </h2>                
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "1rem",
                  }}
                >
                  <div>
                    <div style={{ cursor: "pointer", marginTop:"3rem" }}>
                      {/* {showFilter && ( */}
                        <FilterAltIcon
                          onClick={() =>
                            setShowFilterDropDown((preValue) => !preValue)
                          }
                        />
                      {/* )} */}
                    </div>
                  </div>
                </div>

            {showFilterDropDown && (
              <StyledCardBody>
                {filterRows.map((item:any, index:number) => {
                  const {
                    isValueSelectable,
                    options: selectValueOptions,
                    nameKey,
                  } = getIsValueSelectable(index);
                  return (
                    <Grid container key={item.id} className="mt-2">
                      <Grid item sm={1} className="d-flex align-items-center">
                        <ClearIcon onClick={() => handleDeleteFilter(index)} />
                      </Grid>
                      {filterRows.length > 1 && index === 0 && <Grid item sm={2} />}
                      {index > 0 && (
                        <Grid item sm={2}>
                          <InputLabel
                            id="demo-simple-select-label"
                          >
                            Link Operator
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            native
                            id="demo-simple-select"
                            label="Name"
                            variant="standard"
                            value={linkedOperator}
                            onChange={(e) => setLinkedOperator(e.target.value)}
                          >
                            <option value={"$or"}>or</option>
                            <option value={"$and"}>and</option>
                            {/* )) */}
                          </Select>
                        </Grid>
                      )}
                      <Grid item >
                        {/* <div>
                          <small>Name</small>
                        </div> */}
                        <InputLabel
                          id="demo-simple-select-label"
                          
                        >
                          Columns
                        </InputLabel>
                        <div>
                          <Select
                            labelId="demo-simple-select-label"
                            native
                            id="demo-simple-select"
                            label="Columns"
                            variant="standard"
                            value={filterRows[index].name}
                            onChange={(e) =>
                              handleFilterPropertyChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          >
                            {columns.map((item:any, index:number) => {
                              if (item.filterable) {
                                return (
                                  <option value={item.field}>
                                    {item.field}
                                  </option>
                                );
                              }
                            })}
                          </Select>
                        </div>
                      </Grid>
                      <Grid item style={{marginLeft:"1rem"}}>
                        {/* <div>
                          <small>Name</small>
                        </div> */}
                        <InputLabel
                          id="demo-simple-select-label"
                         
                        >
                          Operators
                        </InputLabel>
                        <div>
                          <Select
                            labelId="demo-simple-select-label"
                            native
                            id="demo-simple-select"
                            label="Operators"
                            variant="standard"
                            value={filterRows[index].operator}
                            onChange={(e) =>
                              handleFilterPropertyChange(
                                index,
                                "operator",
                                e.target.value
                              )
                            }
                          >
                            {operatorOptions.map((item, index) => (
                              <option value={item.value}>{item.label}</option>
                            ))}
                          </Select>
                        </div>
                      </Grid>
                      <Grid item style={{marginLeft:"1rem"}}>
                        {/* <div>
                          <small>Name</small>
                        </div> */}
                        <InputLabel
                          id="demo-simple-select-label"
                        >
                          Value
                        </InputLabel>

                        {isValueSelectable ? (
                          <Select
                            labelId="demo-simple-select-label"
                            // native
                            id="demo-simple-select"
                            // label="Columns"
                            variant="standard"
                            value={
                              filterRows[index].operator === "$in" &&
                              typeof filterRows[index].value === "string"
                                ? [filterRows[index].value || ""]
                                : filterRows[index].value
                            }
                            // value={[]}
                            // input={<OutlinedInput label="Columns" />}
                            multiple={filterRows[index].operator === "$in"}
                            onChange={(e) =>
                              handleFilterPropertyChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          >
                            {selectValueOptions.map((item:any, index:number) => {
                              return (
                                <MenuItem value={item[nameKey]} key={index}>
                                  {item[nameKey]}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        ) : filterRows[index].operator === "$in" ? (
                          <Autocomplete
                            multiple
                            id="tags-filled"
                            fullWidth={true}
                            value={
                              typeof filterRows[index].value === "string" &&
                              filterRows[index].value
                                ? [filterRows[index].value]
                                : filterRows[index].value
                            }
                            onChange={(e, value) =>
                              handleFilterPropertyChange(index, "value", value)
                            }
                            options={[]}
                            // defaultValue={[top100Films[13].title]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                // label="freeSolo"
                                placeholder="Type And Press Enter"
                              />
                            )}
                          />
                        ) : (
                          <Input
                            value={filterRows[index].value}
                            onChange={(e) =>
                              handleFilterPropertyChange(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                            // inputProps={{
                            //   onChange: (e: any) =>
                            //     handleFilterPropertyChange(
                            //       index,
                            //       "operator",
                            //       e.target.value
                            //     ),
                            // }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
                <div
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button color="success" onClick={handleAddNewFilterRow}>
                    Add New
                  </Button>
                  <Button color="success" onClick={handleFilterGo}>
                    Go
                  </Button>
                </div>
              </StyledCardBody>
            )}
            <div style={{ height: "100vh", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                density="comfortable"
                components={{
                  Toolbar: CustomToolbar,
                  // Toolbar: GridToolbar,
                  NoRowsOverlay: () => (
                    <GridOverlay>
                      <div style={{ fontSize: "1.5rem" }}>No Data</div>
                    </GridOverlay>
                  ),
                }}
                pagination
                onError={(arg) => console.log(arg)}
                rowCount={totalRows}
                loading={loading}
                onPageChange={handleChangePage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[2, 5, 10, 20]}
                paginationMode="server"
                page={page - 1}
                filterMode="server"
                onPageSizeChange={handleChangeRowsPerPage}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableSelectionOnClick={true}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CommonTable;
