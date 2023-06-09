import {
  DataGrid,
  GridToolbar,
  getGridNumericOperators,
  getGridDateOperators,
} from "@mui/x-data-grid";

const GridTable = ({ data, columns }) => {
  return (
    <div style={{ height: 585, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default GridTable;
