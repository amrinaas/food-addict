'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

// validation function
function isInvalidText(text) {
  console.log(!text, text.trim() === '');
  return !text || text.trim() === '';
}

// receive 2 parameter because of useFormState in share
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  // validation
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.summary) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image === 0
  ) {
    return {
      message: 'Invalid input',
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}
