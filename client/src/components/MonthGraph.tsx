import { JSX } from "react";

import { BarChart, Bar, Tooltip, XAxis } from "recharts";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type Month = (typeof MONTHS)[number];
type MonthData = {
  month: Month;
  value: number;
};

type MonthGraphProps = {
  data: MonthData[];
};

export const sampleMonthGraphData: MonthData[] = [
  { month: "January", value: 40 },
  { month: "February", value: 55 },
  { month: "March", value: 60 },
  { month: "April", value: 70 },
  { month: "May", value: 65 },
  { month: "June", value: 80 },
  { month: "July", value: 75 },
  { month: "August", value: 90 },
  { month: "September", value: 85 },
  { month: "October", value: 60 },
  { month: "November", value: 50 },
  { month: "December", value: 45 },
];

export default function MonthGraph({ data }: MonthGraphProps): JSX.Element {
  return (
    <BarChart width={600} height={300} data={data}>
      <Bar dataKey="value" fill="" />
      <Tooltip />
      <XAxis dataKey="month" />
    </BarChart>
  );
}
