import PomeloIcon from "@/assets/icons/pomelo.png";

interface UserBadgeProps {
  name: string;
  email: string;
  avatar: string;
}

export default function UserBadge({
  name,
  email,
  avatar,
}: UserBadgeProps): JSX.Element {
  return (
    <div className="w-full p-3 flex rounded-sm selected-shadow bg-orange-peel-500 hover:bg-orange-peel-600">
      <div className="mr-4">
        <img src={PomeloIcon} width={50} height={50} alt="Pomelo Icon" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-md font-bold text-black">{name}</h3>
        <p className="text-xs text-gray">{email}</p>
      </div>
    </div>
  );
}
