'use client';

import { useFormStatus } from 'react-dom';

export default function MealsButtonSubmit() {
  const { pending } = useFormStatus(); // status after fetch submit data

  return (
    <div>
      <button disabled={pending}>
        {pending ? 'Submitting' : 'Share meal'}
      </button>
    </div>
  );
}
