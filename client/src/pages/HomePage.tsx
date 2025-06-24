import StatsOrbit from "@/components/StatsOrbit";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <StatsOrbit
        main={{ value: 45, descriptor: "Stuff" }}
        first={{ value: 45, descriptor: "Stuff" }}
        second={{ value: 45, descriptor: "Stuff" }}
        third={{ value: 45, descriptor: "Stuff" }}
      />
    </div>
  );
}
