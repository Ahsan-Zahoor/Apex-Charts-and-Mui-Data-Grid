const WeightAgeData = [
  {
    height: { startRange: 137, endRange: 140, unit: "cm" },
    male: { startRange: 28.5, endRange: 34.9, unit: "kg" },
    female: { startRange: 28.5, endRange: 34.9, unit: "kg" },
  },
  {
    height: { startRange: 140, endRange: 142, unit: "cm" },
    male: { startRange: 30.8, endRange: 37.6, unit: "kg" },
    female: { startRange: 30.8, endRange: 38.1, unit: "kg" },
  },
  {
    height: { startRange: 142, endRange: 145, unit: "cm" },
    male: { startRange: 32.6, endRange: 39.9, unit: "kg" },
    female: { startRange: 33.5, endRange: 40.8, unit: "kg" },
  },
  {
    height: { startRange: 145, endRange: 147, unit: "cm" },
    male: { startRange: 34.9, endRange: 42.6, unit: "kg" },
    female: { startRange: 35.8, endRange: 43.9, unit: "kg" },
  },
  {
    height: { startRange: 147, endRange: 150, unit: "cm" },
    male: { startRange: 36.4, endRange: 44.9, unit: "kg" },
    female: { startRange: 38.5, endRange: 46.7, unit: "kg" },
  },
  {
    height: { startRange: 150, endRange: 152, unit: "cm" },
    male: { startRange: 39, endRange: 47.6, unit: "kg" },
    female: { startRange: 40.8, endRange: 49.9, unit: "kg" },
  },
  {
    height: { startRange: 152, endRange: 155, unit: "cm" },
    male: { startRange: 40.8, endRange: 49.9, unit: "kg" },
    female: { startRange: 43.1, endRange: 53, unit: "kg" },
  },
  {
    height: { startRange: 155, endRange: 157, unit: "cm" },
    male: { startRange: 43.1, endRange: 52.6, unit: "kg" },
    female: { startRange: 45.8, endRange: 55.8, unit: "kg" },
  },
  {
    height: { startRange: 157, endRange: 160, unit: "cm" },
    male: { startRange: 44.9, endRange: 54.9, unit: "kg" },
    female: { startRange: 48.1, endRange: 58.9, unit: "kg" },
  },
  {
    height: { startRange: 160, endRange: 163, unit: "cm" },
    male: { startRange: 47.2, endRange: 57.6, unit: "kg" },
    female: { startRange: 50.8, endRange: 61.6, unit: "kg" },
  },
  {
    height: { startRange: 163, endRange: 165, unit: "cm" },
    male: { startRange: 49, endRange: 59.9, unit: "kg" },
    female: { startRange: 53, endRange: 64.8, unit: "kg" },
  },
  {
    height: { startRange: 165, endRange: 168, unit: "cm" },
    male: { startRange: 51.2, endRange: 62.6, unit: "kg" },
    female: { startRange: 55.3, endRange: 68, unit: "kg" },
  },
  {
    height: { startRange: 168, endRange: 170, unit: "cm" },
    male: { startRange: 53, endRange: 64.8, unit: "kg" },
    female: { startRange: 58, endRange: 70.7, unit: "kg" },
  },
  {
    height: { startRange: 170, endRange: 173, unit: "cm" },
    male: { startRange: 55.3, endRange: 67.6, unit: "kg" },
    female: { startRange: 60.3, endRange: 73.9, unit: "kg" },
  },
  {
    height: { startRange: 173, endRange: 175, unit: "cm" },
    male: { startRange: 57.1, endRange: 69.8, unit: "kg" },
    female: { startRange: 63, endRange: 76.6, unit: "kg" },
  },
  {
    height: { startRange: 175, endRange: 178, unit: "cm" },
    male: { startRange: 59.4, endRange: 72.6, unit: "kg" },
    female: { startRange: 65.3, endRange: 79.8, unit: "kg" },
  },
  {
    height: { startRange: 178, endRange: 180, unit: "cm" },
    male: { startRange: 61.2, endRange: 74.8, unit: "kg" },
    female: { startRange: 67.6, endRange: 83, unit: "kg" },
  },
  {
    height: { startRange: 180, endRange: 183, unit: "cm" },
    male: { startRange: 63.5, endRange: 77.5, unit: "kg" },
    female: { startRange: 70.3, endRange: 85.7, unit: "kg" },
  },
  {
    height: { startRange: 183, endRange: 185, unit: "cm" },
    male: { startRange: 65.3, endRange: 79.8, unit: "kg" },
    female: { startRange: 72.6, endRange: 88.9, unit: "kg" },
  },
  {
    height: { startRange: 185, endRange: 188, unit: "cm" },
    male: { startRange: 67.6, endRange: 82.5, unit: "kg" },
    female: { startRange: 75.3, endRange: 91.6, unit: "kg" },
  },
  {
    height: { startRange: 188, endRange: 191, unit: "cm" },
    male: { startRange: 69.4, endRange: 84.8, unit: "kg" },
    female: { startRange: 77.5, endRange: 94.8, unit: "kg" },
  },
  {
    height: { startRange: 193, endRange: 195, unit: "cm" },
    male: { startRange: 73.5, endRange: 89.8, unit: "kg" },
    female: { startRange: 82.5, endRange: 100.6, unit: "kg" },
  },
  {
    height: { startRange: 191, endRange: 193, unit: "cm" },
    male: { startRange: 71.6, endRange: 87.5, unit: "kg" },
    female: { startRange: 79.8, endRange: 98, unit: "kg" },
  },
  {
    height: { startRange: 195, endRange: 198, unit: "cm" },
    male: { startRange: 75.7, endRange: 92.5, unit: "kg" },
    female: { startRange: 84.8, endRange: 103.8, unit: "kg" },
  },
  {
    height: { startRange: 198, endRange: 201, unit: "cm" },
    male: { startRange: 77.5, endRange: 94.8, unit: "kg" },
    female: { startRange: 87.5, endRange: 106.5, unit: "kg" },
  },
  {
    height: { startRange: 201, endRange: 203, unit: "cm" },
    male: { startRange: 79.8, endRange: 97.5, unit: "kg" },
    female: { startRange: 89.8, endRange: 109.7, unit: "kg" },
  },
  {
    height: { startRange: 203, endRange: 205, unit: "cm" },
    male: { startRange: 81.6, endRange: 99.8, unit: "kg" },
    female: { startRange: 92, endRange: 112.9, unit: "kg" },
  },
  {
    height: { startRange: 205, endRange: 208, unit: "cm" },
    male: { startRange: 83.9, endRange: 102.5, unit: "kg" },
    female: { startRange: 94.8, endRange: 115.6, unit: "kg" },
  },
  {
    height: { startRange: 208, endRange: 210, unit: "cm" },
    male: { startRange: 85.7, endRange: 104.8, unit: "kg" },
    female: { startRange: 97, endRange: 118.8, unit: "kg" },
  },
  {
    height: { startRange: 210, endRange: 213, unit: "cm" },
    male: { startRange: 88, endRange: 107.5, unit: "kg" },
    female: { startRange: 99.8, endRange: 121.5, unit: "kg" },
  },
  {
    height: { startRange: 213, unit: "cm" },
    male: { startRange: 89.8, endRange: 109.7, unit: "kg" },
    female: { startRange: 102, endRange: 124.7, unit: "kg" },
  },
];
