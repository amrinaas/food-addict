import MealDetails from './meal-details';
import classes from './meals-grid.module.css';

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealDetails {...meal} />
        </li>
      ))}
    </ul>
  );
}
