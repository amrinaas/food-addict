import { Suspense } from 'react';

import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '../components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

// Adding static metadata
export const metadata = {
  title: 'Meals',
  description: 'Find any meal from all araound the world',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
