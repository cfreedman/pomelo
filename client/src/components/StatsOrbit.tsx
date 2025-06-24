type Stat = {
  value: number;
  descriptor: string;
};

export interface StatsOrbitProps {
  main: Stat;
  first: Stat;
  second: Stat;
  third: Stat;
}

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function StatsOrbit({
  main,
  first,
  second,
  third,
}: StatsOrbitProps): JSX.Element {
  const distances = [
    getRandom(100, 400),
    getRandom(100, 400),
    getRandom(100, 400),
  ];

  const firstAngle = getRandom(0, 360);
  const secondAngle = (firstAngle + 120 + getRandom(-30, 30)) % 360;
  const thirdAngle = (secondAngle + 120 + getRandom(-30, 30)) % 360;

  //   const [firstHorizontal, firstVertical] = [
  //     distances[0] * Math.cos(((2 * Math.PI) / 360) * firstAngle),
  //     distances[0] * Math.sin(((2 * Math.PI) / 360) * firstAngle),
  //   ];
  //   const [secondHorizontal, secondVertical] = [
  //     distances[1] * Math.cos(((2 * Math.PI) / 360) * secondAngle),
  //     distances[1] * Math.sin(((2 * Math.PI) / 360) * secondAngle),
  //   ];
  //   const [thirdHorizontal, thirdVertical] = [
  //     distances[2] * Math.cos(((2 * Math.PI) / 360) * thirdAngle),
  //     distances[2] * Math.sin(((2 * Math.PI) / 360) * thirdAngle),
  //   ];

  //   const firstHorizontalStyle =
  //     firstHorizontal >= 0
  //       ? `right-[${firstHorizontal}px]`
  //       : `left-[${-firstHorizontal}px]`;
  //   const firstVerticalStyle =
  //     firstVertical >= 0
  //       ? `top-[${firstVertical}px]`
  //       : `bottom-[${-firstVertical}px]`;
  //   const secondHorizontalStyle =
  //     secondHorizontal >= 0
  //       ? `right-[${secondHorizontal}px]`
  //       : `left-[${-secondHorizontal}px]`;
  //   const secondVerticalStyle =
  //     secondVertical >= 0
  //       ? `top-[${secondVertical}px]`
  //       : `bottom-[${-secondVertical}px]`;
  //   const thirdHorizontalStyle =
  //     thirdHorizontal >= 0
  //       ? `right-[${thirdHorizontal}px]`
  //       : `left-[${-thirdHorizontal}px]`;
  //   const thirdVerticalStyle =
  //     thirdVertical >= 0
  //       ? `top-[${thirdVertical}px]`
  //       : `bottom-[${-thirdVertical}px]`;

  return (
    <div className="flex flex-col items-center justify-center w-[700px] h-[700px]">
      <div className="relative flex flex-col items-center">
        <h2 className="text-[120px]/[120px]">{main.value}</h2>
        <p className="text-[40px]">{main.descriptor}</p>
        <div className="absolute flex flex-col items-center gap-1 top-[300px] right-[200px]">
          <h4 className="text-[50px]/[50px]">{first.value}</h4>
          <p className="text-[18px]">{first.descriptor}</p>
        </div>
        <div className="absolute flex flex-col items-center gap-1 bottom-[200px] left-[350px]">
          <h4 className="text-[50px]/[50px]">{second.value}</h4>
          <p className="text-[18px]">{second.descriptor}</p>
        </div>
        <div className="absolute flex flex-col items-center gap-1 right-[200px]">
          <h4 className="text-[50px]/[50px]">{third.value}</h4>
          <p className="text-[18px]">{third.descriptor}</p>
        </div>
      </div>
    </div>
  );
}
