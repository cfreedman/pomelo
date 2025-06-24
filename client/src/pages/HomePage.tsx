import BarGraph, { dummyBarGraphData } from "@/components/BarGraph";
import MonthGraph, { sampleMonthGraphData } from "@/components/MonthGraph";
import RadialGraph, { sampleRadialData } from "@/components/RadialGraph";
import StatsOrbit from "@/components/StatsOrbit";

export default function HomePage(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-2">
        <h1 className="text-[60px]/[60px]">Welcome Back Collum!...</h1>
        <h3 className="text-[30px]">Ruminator of Broccoli</h3>
      </div>
      <StatsOrbit
        main={{ value: 45, descriptor: "Stuff" }}
        first={{ value: 45, descriptor: "Stuff" }}
        second={{ value: 45, descriptor: "Stuff" }}
        third={{ value: 45, descriptor: "Stuff" }}
      />
      <div className="flex flex-col">
        <MonthGraph data={sampleMonthGraphData} />
        <RadialGraph data={sampleRadialData} />
        <BarGraph data={dummyBarGraphData} />
      </div>
    </div>
  );
}
