import React, { useMemo } from "react";
import moment from "moment";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Graph from "./Graph";
import GridTable from "./DataGrid";
import graphsData from "../Data/GraphsDataRaw";
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
  // const result = extractedValues.groupBy(({ date }) => date);

  const sortedData = useMemo(() => {
    let res = {};
    extractedValues.forEach((obj) => {
      if (res[obj.date]) {
        res[obj.date] = [...res[obj.date], obj];
      } else {
        res[obj.date] = [obj];
      }
    });
    // console.log("extracted vitals ", res);

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

  // console.log("Sorted Data : ", sortedData);

  const weightResults = (height, weight) => {
    let result = [];
    if (height < 137) {
      return (result =
        weight >= 28.5 && weight <= 34.9
          ? { weight: "28.5 - 34.9kg", res: "Normal Weight" }
          : weight < 28.5
          ? { weight: "28.5 - 34.9kg", res: "Under Weight" }
          : { weight: "28.5 - 34.9kg", res: "Over Weight" });
    }
    if (height < 140) {
      return (result =
        weight >= 30.8 && weight <= 37.6
          ? { weight: "30.8 - 37.6kg", res: "Normal Weight" }
          : weight < 30.8
          ? { weight: "30.8 - 37.6kg", res: "Under Weight" }
          : { weight: "30.8 - 37.6kg", res: "Over Weight" });
    }
    if (height < 142) {
      return (result =
        weight >= 32.6 && weight <= 39.9
          ? { weight: "32.6 - 39.9kg", res: "Normal Weight" }
          : weight < 32.6
          ? { weight: "32.6 - 39.9kg", res: "Under Weight" }
          : { weight: "32.6 - 39.9kg", res: "Over Weight" });
    }
    if (height < 145) {
      return (result =
        weight >= 34.9 && weight <= 42.6
          ? { weight: "34.9 - 42.6kg", res: "Normal Weight" }
          : weight < 34.9
          ? { weight: "34.9 - 42.6kg", res: "Under Weight" }
          : { weight: "34.9 - 42.6kg", res: "Over Weight" });
    }
    if (height < 147) {
      return (result =
        weight >= 36.4 && weight <= 44.9
          ? { weight: "36.4 - 44.9kg", res: "Normal Weight" }
          : weight < 36.4
          ? { weight: "36.4 - 44.9kg", res: "Under Weight" }
          : { weight: "36.4 - 44.9kg", res: "Over Weight" });
    }
    if (height < 150) {
      return (result =
        weight >= 39 && weight <= 47.6
          ? { weight: "39 - 47.6kg", res: "Normal Weight" }
          : weight < 39
          ? { weight: "39 - 47.6kg", res: "Under Weight" }
          : { weight: "39 - 47.6kg", res: "Over Weight" });
    }
    if (height < 152) {
      return (result =
        weight >= 40.8 && weight <= 49.9
          ? { weight: "40.8 - 49.9kg", res: "Normal Weight" }
          : weight < 40.8
          ? { weight: "40.8 - 49.9kg", res: "Under Weight" }
          : { weight: "40.8 - 49.9kg", res: "Over Weight" });
    }
    if (height < 157) {
      return (result =
        weight >= 43.1 && weight <= 52.6
          ? { weight: "43.1 - 52.6kg", res: "Normal Weight" }
          : weight < 43.1
          ? { weight: "43.1 - 52.6kg", res: "Under Weight" }
          : { weight: "43.1 - 52.6kg", res: "Over Weight" });
    }
    if (height < 160) {
      return (result =
        weight >= 44.9 && weight <= 54.9
          ? { weight: "44.9 - 54.9kg", res: "Normal Weight" }
          : weight < 44.9
          ? { weight: "44.9 - 54.9kg", res: "Under Weight" }
          : { weight: "44.9 - 54.9kg", res: "Over Weight" });
    }
    if (height < 163) {
      return (result =
        weight >= 47.2 && weight <= 57.6
          ? { weight: "47.2 - 57.6kg", res: "Normal Weight" }
          : weight < 47.2
          ? { weight: "47.2 - 57.6kg", res: "Under Weight" }
          : { weight: "47.2 - 57.6kg", res: "Over Weight" });
    }
    if (height < 165) {
      return (result =
        weight >= 49 && weight <= 59.9
          ? { weight: "49 - 59.9kg", res: "Normal Weight" }
          : weight < 49
          ? { weight: "49 - 59.9kg", res: "Under Weight" }
          : { weight: "49 - 59.9kg", res: "Over Weight" });
    }
    if (height < 168) {
      return (result =
        weight >= 51.2 && weight <= 62.6
          ? { weight: "51.2 - 62.6kg", res: "Normal Weight" }
          : weight < 51.2
          ? { weight: "51.2 - 62.6kg", res: "Under Weight" }
          : { weight: "51.2 - 62.6kg", res: "Over Weight" });
    }
    if (height < 168) {
      return (result =
        weight >= 53 && weight <= 64.8
          ? { weight: "53 - 64.8kg", res: "Normal Weight" }
          : weight < 53
          ? { weight: "53 - 64.8kg", res: "Under Weight" }
          : { weight: "53 - 64.8kg", res: "Over Weight" });
    }
    if (height < 170) {
      return (result =
        weight >= 55.3 && weight <= 67.6
          ? { weight: "55.3 - 67.6kg", res: "Normal Weight" }
          : weight < 55.3
          ? { weight: "55.3 - 67.6kg", res: "Under Weight" }
          : { weight: "55.3 - 67.6kg", res: "Over Weight" });
    }
    if (height < 173) {
      return (result =
        weight >= 57.1 && weight <= 69.8
          ? { weight: "57.1 - 69.8kg", res: "Normal Weight" }
          : weight < 57.1
          ? { weight: "57.1 - 69.8kg", res: "Under Weight" }
          : { weight: "57.1 - 69.8kg", res: "Over Weight" });
    }
    if (height < 175) {
      return (result =
        weight >= 59.4 && weight <= 72.6
          ? { weight: "59.4 - 72.6kg", res: "Normal Weight" }
          : weight < 59.4
          ? { weight: "59.4 - 72.6kg", res: "Under Weight" }
          : { weight: "59.4 - 72.6kg", res: "Over Weight" });
    }
    if (height < 178) {
      return (result =
        weight >= 61.2 && weight <= 74.8
          ? { weight: "61.2 - 74.8kg", res: "Normal Weight" }
          : weight < 61.2
          ? { weight: "61.2 - 74.8kg", res: "Under Weight" }
          : { weight: "61.2 - 74.8kg", res: "Over Weight" });
    }
    if (height < 180) {
      return (result =
        weight >= 63.5 && weight <= 77.5
          ? { weight: "63.5 - 77.5kg", res: "Normal Weight" }
          : weight < 63.5
          ? { weight: "63.5 - 77.5kg", res: "Under Weight" }
          : { weight: "63.5 - 77.5kg", res: "Over Weight" });
    }
    if (height < 183) {
      return (result =
        weight >= 65.3 && weight <= 79.8
          ? { weight: "65.3 - 79.8kg", res: "Normal Weight" }
          : weight < 65.3
          ? { weight: "65.3 - 79.8kg", res: "Under Weight" }
          : { weight: "65.3 - 79.8kg", res: "Over Weight" });
    }
    if (height < 185) {
      return (result =
        weight >= 67.6 && weight <= 82.5
          ? { weight: "67.6 - 82.5kg", res: "Normal Weight" }
          : weight < 67.6
          ? { weight: "67.6 - 82.5kg", res: "Under Weight" }
          : { weight: "67.6 - 82.5kg", res: "Over Weight" });
    }
    if (height < 188) {
      return (result =
        weight >= 69.4 && weight <= 84.8
          ? { weight: "69.4 - 84.8kg", res: "Normal Weight" }
          : weight < 69.4
          ? { weight: "69.4 - 84.8kg", res: "Under Weight" }
          : { weight: "69.4 - 84.8kg", res: "Over Weight" });
    }
    if (height < 191) {
      return (result =
        weight >= 71.6 && weight <= 87.5
          ? { weight: "71.6 - 87.5kg", res: "Normal Weight" }
          : weight < 71.6
          ? { weight: "71.6 - 87.5kg", res: "Under Weight" }
          : { weight: "71.6 - 87.5kg", res: "Over Weight" });
    }
    if (height < 193) {
      return (result =
        weight >= 73.5 && weight <= 89.8
          ? { weight: "73.5 - 89.8kg", res: "Normal Weight" }
          : weight < 73.5
          ? { weight: "73.5 - 89.8kg", res: "Under Weight" }
          : { weight: "73.5 - 89.8kg", res: "Over Weight" });
    }
    if (height < 195) {
      return (result =
        weight >= 75.7 && weight <= 92.5
          ? { weight: "75.7 - 92.5kg", res: "Normal Weight" }
          : weight < 75.7
          ? { weight: "75.7 - 92.5kg", res: "Under Weight" }
          : { weight: "75.7 - 92.5kg", res: "Over Weight" });
    }
    if (height < 198) {
      return (result =
        weight >= 77.5 && weight <= 94.8
          ? { weight: "77.5 - 94.8kg", res: "Normal Weight" }
          : weight < 77.5
          ? { weight: "77.5 - 94.8kg", res: "Under Weight" }
          : { weight: "77.5 - 94.8kg", res: "Over Weight" });
    }
    if (height < 201) {
      return (result =
        weight >= 79.8 && weight <= 97.5
          ? { weight: "79.8 - 97.5kg", res: "Normal Weight" }
          : weight < 79.8
          ? { weight: "79.8 - 97.5kg", res: "Under Weight" }
          : { weight: "79.8 - 97.5kg", res: "Over Weight" });
    }
    if (height < 203) {
      return (result =
        weight >= 81.6 && weight <= 99.8
          ? { weight: "81.6 - 99.8kg", res: "Normal Weight" }
          : weight < 81.6
          ? { weight: "81.6 - 99.8kg", res: "Under Weight" }
          : { weight: "81.6 - 99.8kg", res: "Over Weight" });
    }
    if (height < 205) {
      return (result =
        weight >= 3.9 && weight <= 102.5
          ? { weight: "83.9 - 102.5kg", res: "Normal Weight" }
          : weight < 3.9
          ? { weight: "83.9 - 102.5kg", res: "Under Weight" }
          : { weight: "83.9 - 102.5kg", res: "Over Weight" });
    }
    if (height < 208) {
      return (result =
        weight >= 5.7 && weight <= 104.8
          ? { weight: "85.7  104.8kg", res: "Normal Weight" }
          : weight < 5.7
          ? { weight: "85.7 - 104.8kg", res: "Under Weight" }
          : { weight: "85.7 - 104.8kg", res: "Over Weight" });
    }
    if (height < 210) {
      return (result =
        weight >= 88 && weight <= 107.5
          ? { weight: "88 - 107.5kg", res: "Normal Weight" }
          : weight < 88
          ? { weight: "88 - 107.5kg", res: "Under Weight" }
          : { weight: "88 - 107.5kg", res: "Over Weight" });
    }
    if (height < 213) {
      return (result =
        weight >= 9.8 && weight <= 109.7
          ? { weight: "89.8 - 109.7kg", res: "Normal Weight" }
          : weight < 9.8
          ? { weight: "89.8 - 109.7kg", res: "Under Weight" }
          : { weight: "89.8 - 109.7kg", res: "Over Weight" });
    } else {
      return (result = { weight: "Unavaiable", res: "-" });
    }
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
        heightWeightData.push({
          id: date,
          col1: height_value.value,
          col2: weight_value.value,
          col3: bmi_value.value,
          col4: weightResults(height_value.value, weight_value.value).weight,
          col5: weightResults(height_value.value, weight_value.value).res,
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
  //   console.log(heightWeightData);

  // console.log("systolic series", bp_systolic, bp_diastolic);
  // console.log("height ", heightData);
  // console.log("weight ", weightData)

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

  // console.log(heightWeightData);

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
