import { RadialBar, RadialBarChart, Tooltip } from "recharts";

type RadialData = {
  name: string;
  value: number;
};

type RadialGraphProps = {
  data: RadialData[];
};

export const sampleRadialData: RadialData[] = [
  { name: "Fruits", value: 80 },
  { name: "Vegetables", value: 55 },
  { name: "Grains", value: 70 },
  { name: "Dairy", value: 40 },
];

export default function RadialGraph({ data }: RadialGraphProps): JSX.Element {
  return (
    <RadialBarChart width={600} height={300} data={data}>
      <RadialBar
        label={{ fill: "#111", position: "centerTop" }}
        dataKey="value"
      />
      <Tooltip />
    </RadialBarChart>
  );
}
