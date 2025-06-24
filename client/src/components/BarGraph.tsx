import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

type BarData = {
  name: string;
  value: number;
};

type BarGraphProps = {
  data: BarData[];
};

export const dummyBarGraphData: BarData[] = [
  { name: "Apples", value: 120 },
  { name: "Bananas", value: 98 },
  { name: "Cherries", value: 75 },
  { name: "Dates", value: 60 },
  { name: "Elderberries", value: 45 },
  { name: "Figs", value: 30 },
  { name: "Grapes", value: 150 },
  { name: "Honeydew", value: 80 },
];

export default function BarGraph({ data }: BarGraphProps): JSX.Element {
  return (
    <BarChart width={400} height={500} data={data} layout="vertical">
      <YAxis dataKey="name" type="category" />
      <Bar dataKey="value" type="number" fill="#111" />
      <Tooltip />
    </BarChart>
  );
}
