import React, { useMemo } from "react";
import moment from "moment";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Graph from "./Graph";
import GridTable from "./DataGrid";
import graphsData from "../Data/GraphsDataRaw";
import weightHeightAge from "../Data/WeightHeightAge";
import {
  getGridNumericOperators,
  getGridDateOperators,
} from "@mui/x-data-grid";

const Home = () => {
  const transformDate = (date) => {
    return moment(date).utc().format("MM-DD-YYYY");
  };

  const units = {
    "Temp (oral)": "C",
    "BP Diastolic": "mmHg",
    "BP Systolic": "mmHg",
    "Temp (tymp)": "C",
  };

  const loicCodes = {
    BODY_HEIGHT_LOINC: "8302-2",
    BODY_WEIGHT_LOINC: "29463-7",
    BMI_PERCENT_LOINC: "39156-5",
    WS_PERCENT_LOINC: "5587-4",
    HC_PERCENT_LOINC: "8287-5",
  };

  let vitals = graphsData.vitals;
  let vitals_physical = graphsData.vitals_physical;

  const extractedValues = useMemo(() => {
    let extractedValues = [];
    let j = 0;

    vitals.forEach((mainObj) => {
      const { vital_sign_group, DATE_ENTERED } = mainObj;
      vital_sign_group.map((nestedObj) => {
        extractedValues.push({
          id: j++,
          name: nestedObj.VITAL_SIGN_NAME,
          value: nestedObj.VITAL_SIGN_VAL.toFixed(2),
          date: transformDate(DATE_ENTERED),
          unit: nestedObj.REF_UNITS ?? units[nestedObj.VITAL_SIGN_NAME],
          code: nestedObj.LOINC,
        });
      });
    });

    vitals_physical.forEach((obj) => {
      let weight = {
        id: j++,
        name: "WEIGHT",
        value: parseInt(obj.WEIGHTKG.toFixed(2)),
        date: transformDate(obj.DATE1),
        unit: "KG",
        code: obj.BODY_HEIGHT_LOINC ?? loicCodes["BODY_HEIGHT_LOINC"],
      };
      let height = {
        id: j++,
        name: "HEIGHT",
        value: parseInt(obj.HEIGHTCM.toFixed(2)),
        date: transformDate(obj.DATE1),
        unit: "CM",
        code: obj.BODY_HEIGHT_LOINC ?? loicCodes["BODY_HEIGHT_LOINC"],
      };
      let headCircum = {
        id: j++,
        name: "HEADCIRCUMF",
        value: obj.HEADCIRCUMFCM?.toFixed(2) ?? 0,
        date: transformDate(obj.DATE1),
        unit: "CM",
        code: obj.HC_PERCENT_LOINC ?? loicCodes["HC_PERCENT_LOINC"],
      };
      let bmi = {
        id: j++,
        name: "BMI",
        value: parseInt(obj.BMI.toFixed(2)),
        date: transformDate(obj.DATE1),
        unit: "Kg/m^2",
        code: obj.BMI_PERCENT_LOINC ?? loicCodes["BMI_PERCENT_LOINC"],
      };
      extractedValues.push(weight, height, headCircum, bmi);
    });

    return extractedValues;
  }, [vitals, vitals_physical, loicCodes, units]);

  const sortedData = useMemo(() => {
    let res = {};
    extractedValues.forEach((obj) => {
      if (res[obj.date]) {
        res[obj.date] = [...res[obj.date], obj];
      } else {
        res[obj.date] = [obj];
      }
    });

    const sortedData = {};
    const sortedKeys = Object.keys(res).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    sortedKeys.forEach((key) => {
      sortedData[key] = res[key];
    });
    return sortedData;
  }, [extractedValues]);

  const weightResults = (heightInput, gender = "male") => {
    let res = weightHeightAge.find(
      ({ height }) =>
        heightInput >= height.startRange && heightInput <= height.endRange
    );
    if (res != undefined) return res[gender];
    else return null;
  };

  const [
    bp_systolic,
    bp_diastolic,
    heightData,
    weightData,
    bmiData,
    heightWeightData,
  ] = useMemo(() => {
    const bp_systolic = [];
    const bp_diastolic = [];
    const heightData = [];
    const weightData = [];
    const bmiData = [];
    const heightWeightData = [];

    Object.entries(sortedData).forEach(([date, values]) => {
      const bp_systolic_value = values.find(
        ({ name, value }) => name === "BP Systolic" && value
      );
      const bp_diastolic_value = values.find(
        ({ name, value }) => name === "BP Diastolic" && value
      );
      const height_value = values.find(
        ({ name, value }) => name === "HEIGHT" && value
      );
      const weight_value = values.find(
        ({ name, value }) => name === "WEIGHT" && value
      );
      const bmi_value = values.find(
        ({ name, value }) => name === "BMI" && value
      );

      if (bp_diastolic_value !== undefined) {
        bp_diastolic.push({ x: date, y: bp_diastolic_value.value });
      }
      if (bp_systolic_value !== undefined) {
        bp_systolic.push({ x: date, y: bp_systolic_value.value });
      }
      if (height_value !== undefined) {
        heightData.push({ x: date, y: height_value.value });
      }
      if (weight_value !== undefined) {
        weightData.push({ x: date, y: weight_value.value });
      }
      if (bmi_value !== undefined) {
        bmiData.push({ x: date, y: bmi_value.value });
      }
      if (height_value && weight_value && bmi_value) {
        let res = weightResults(height_value.value, "male");
        let colFiveAns = "Not Availale";
        if (res != null) {
          if (
            weight_value.value >= res.startRange &&
            weight_value.value <= res.endRange
          )
            colFiveAns = "Normal Weight";
          else if (weight_value.value < res.startRange)
            colFiveAns = "Under Weight";
          else colFiveAns = "Over Weight";
        }

        heightWeightData.push({
          id: date,
          col1: height_value.value,
          col2: weight_value.value,
          col3: bmi_value.value,
          col4: res
            ? `(${res.startRange}-${res.endRange} ${res.unit})`
            : "Not Available",
          col5: colFiveAns,
        });
      }
    });

    return [
      bp_systolic,
      bp_diastolic,
      heightData,
      weightData,
      bmiData,
      heightWeightData,
    ];
  }, [sortedData]);

  const bpSeries = [
    {
      name: "BP Systolic",
      data: bp_systolic,
    },
    {
      name: "BP Diastolic",
      data: bp_diastolic,
    },
  ];

  const heightSeries = [
    {
      name: "Height",
      data: heightData,
    },
  ];

  const weightSeries = [
    {
      name: "Weight",
      data: weightData,
    },
  ];

  const bmiSeries = [
    {
      name: "BMI",
      data: bmiData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: Object.keys(sortedData),
    },
    yaxis: {
      min: 20,
      max: 150,
    },
    annotations: {
      yaxis: [
        {
          y: 40,
          borderColor: "#FF0000",
          fillColor: "#FF000080",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#FF0000",
              background: "transparent",
            },
            text: "Systolic Dangerously Low",
          },
        },
        {
          y: 33,
          borderColor: "#FF0000",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#FF0000",
              background: "transparent",
            },
            text: "Diastolic Dangerously Low",
          },
        },
        {
          y: 89,
          borderColor: "#FF0000",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#FF0000",
              background: "transparent",
            },
            text: "Dialostic Elevated",
          },
        },
        {
          y: 130,
          borderColor: "#FF0000",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#FF0000",
              background: "transparent",
            },
            text: "Systolic Elevated",
          },
        },
      ],
    },
  };

  const optionsTwo = {
    xaxis: {
      categories: Object.keys(sortedData).map((i) => {
        let tempDate = new Date(i);
        return tempDate.getFullYear();
      }),
    },
  };

  const columns = [
    {
      field: "id",
      headerName: "Date",
      width: 120,
      filterOperators: getGridDateOperators(),
    },
    {
      field: "col1",
      headerName: "HEIGHT (CM)",
      width: 130,
      filterOperators: getGridNumericOperators(),
    },
    {
      field: "col2",
      headerName: "WEIGHT (KG)",
      width: 130,
      filterOperators: getGridNumericOperators(),
    },
    {
      field: "col3",
      headerName: "BMI",
      width: 130,
      filterOperators: getGridNumericOperators(),
    },
    { field: "col4", headerName: "Weight Expected Range", width: 170 },
    { field: "col5", headerName: "Results", width: 150 },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item>
          <Graph options={options} series={bpSeries} height={350} />
        </Item>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={6}>
          <Item>
            <GridTable data={heightWeightData} columns={columns} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              HEIGHT
              <Item>
                <Graph
                  options={optionsTwo}
                  series={heightSeries}
                  height={250}
                  type="line"
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              WEIGHT
              <Item>
                <Graph
                  options={optionsTwo}
                  series={weightSeries}
                  height={250}
                  type="line"
                />
              </Item>
            </Grid>
            <Grid item p={1} xs={12}>
              BMI
              <Item>
                <Graph
                  options={optionsTwo}
                  series={bmiSeries}
                  height={250}
                  type="bar"
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
