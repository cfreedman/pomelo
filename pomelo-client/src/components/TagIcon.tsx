import PizzaIcon from "@/assets/pizza.jpg";

const TAG_ICONS: Record<string, string> = {
  pizza: PizzaIcon,
};

interface TagIconProps {
  name: string;
  width: number;
  height: number;
}

export default function TagIcon({
  name,
  width,
  height,
}: TagIconProps): JSX.Element {
  return <img src={PizzaIcon} width={width} height={height} alt="Tag icon" />;
}
