import { BaseRecipe } from "@/lib/recipes";
import { Badge } from "../ui/badge";
import { Weekday } from "@/lib/meal_plan";

interface RecipeItemProps {
  name: string;
  handleDrag: React.DragEventHandler<HTMLLIElement>;
}

const RecipeItem = ({ name, handleDrag }: RecipeItemProps): JSX.Element => {
  return (
    <li className="text-blue-600 font-bold" draggable onDragStart={handleDrag}>
      {name}
    </li>
  );
};

interface CalendarRecipeCardProps {
  recipe: BaseRecipe;
  active: boolean;
  handleActivate: () => void;
  handleDrag: React.DragEventHandler<HTMLDivElement>;
}

const CalendarRecipeCard = ({
  recipe,
  active,
  handleActivate,
  handleDrag,
}: CalendarRecipeCardProps): React.ReactNode => {
  return (
    <Badge
      className={`my-3 py-3 px-2 w-full brutal-badge bg-white rounded-sm text-md text-black font-bold hover:bg-breaker-bay-200 active:bg-breaker-bay-600 ${
        active && "bg-breaker-bay-400"
      }`}
      draggable
      onClick={() => handleActivate()}
      onDragStart={handleDrag}
    >
      <h3>{recipe.name}</h3>
      <h3>x2</h3>
    </Badge>
  );
};

interface CalendarDayProps {
  weekday: Weekday;
  date: string;
  recipes: BaseRecipe[];
  activeRecipe?: string;
  handleActivate: (id: string) => void;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDragRecipeCard: (
    e: React.DragEvent,
    recipe: BaseRecipe,
    prevWeekday: Weekday
  ) => void;
}

const CalendarDay = ({
  weekday,
  date,
  recipes,
  handleActivate,
  handleDrop,
  handleDragOver,
  handleDragRecipeCard,
}: CalendarDayProps): React.ReactNode => {
  return (
    <div className="flex flex-col px-2 grow shrink basis-[0px] h-[600px] items-center">
      <div className="flex-auto">
        <div className="flex flex-col items-center justify-center bg-blue-500 rounded-full border-2 border-black w-15 h-15 my-2">
          <h3 className="text-white font-bold text-[30px] outlined-text">
            {date}
          </h3>
        </div>
      </div>
      <h3 className="calendarHeader text-blue-500 font-bold">{weekday}</h3>
      <div
        className="flex flex-col h-full w-full bg-gray-100 rounded-sm my-2 p-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {recipes.map((recipe) => (
          <CalendarRecipeCard
            key={recipe.id}
            recipe={recipe}
            handleActivate={() => {
              handleActivate(recipe.id);
            }}
            handleDrag={(event) => handleDragRecipeCard(event, recipe, weekday)}
          />
        ))}
      </div>
    </div>
  );
};
