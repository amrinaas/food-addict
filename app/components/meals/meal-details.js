import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-details.module.css';

export default function MealDetails({ image, title, slug, summary, creator }) {
  return (
    <article>
      <header>
        <div className={classes.image}>
          <Image src={image} fill alt={title} />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>{creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
