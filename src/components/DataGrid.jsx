import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const GridTable = ({ data, columns }) => {
  const renderColorCell = (params) => {
    const value = params.value;
    let textColor = "black";

    if (value === "Normal Weight") {
      textColor = "green";
    } else if (value === "Under Weight") {
      textColor = "red";
    } else if (value === "Over Weight") {
      textColor = "red";
    }

    return <span style={{ color: textColor }}>{value}</span>;
  };

  const updatedColumns = columns.map((column) => {
    if (column.field === "col5") {
      return {
        ...column,
        renderCell: renderColorCell,
      };
    }
    return column;
  });

  return (
    <div style={{ height: 585, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={updatedColumns}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default GridTable;
