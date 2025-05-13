import PizzaIcon from "@/assets/pizza.jpg";
import SpicyIcon from "@/assets/icons/spicy-tag.png";
import VegetarianIcon from "@/assets/icons/vegetarian-tag.png";
import HealthyIcon from "@/assets/icons/healthy-tag.png";
import FastIcon from "@/assets/icons/fast-tag.png";

const iconMap: Record<string, string> = {
  pizza: PizzaIcon,
  fast: FastIcon,
  healthy: HealthyIcon,
  spicy: SpicyIcon,
  vegetarian: VegetarianIcon,
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
  const iconSrc = iconMap[name] ?? iconMap["spicy"];
  return <img src={iconSrc} width={width} height={height} alt="Tag icon" />;
}
