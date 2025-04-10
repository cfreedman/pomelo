import { JSX } from "react";

interface Store {
  name: string;
  address: string;
}

const storeList: Store[] = [
  { name: "Whole Foods", address: "123 Main St, Philadelphia, PA 19123" },
  { name: "Costco", address: "3245 Cherry St, Haddonfield, PA 19467" },
  { name: "Espositos", address: "921 9th St, Philadelphia, PA 19147" },
];

export default function CalendarPage(): JSX.Element {
  return (
    <div>
      <h1>Favorite Stores</h1>
      <ul>
        {storeList.map(({ name, address }) => (
          <li key={name}>
            <h3>{name}</h3>
            <p>{address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
