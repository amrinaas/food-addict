import Link from 'next/link';

export default function MealsDetailPage({ params }) {
  return (
    <div>
      <h1>This is {params.slug} route</h1>
      <Link href="../">
        <button>back</button>
      </Link>
    </div>
  );
}
