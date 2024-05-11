import sqlite3 from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import fs from 'node:fs';

const db = sqlite3('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug =?').get(slug);
}

export async function saveMeal(meal) {
  // A slug is a unique identifier of a web address, typically at the end or after the domain name. Each slug should be unique to distinguish different parts of a website without duplication.
  //converting any text string into URL-friendly url
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // protect against cross site scripting attack

  const extension = meal.image.name.split('.').pop(); // get the extention. ex: png, jpeg
  const filename = `${meal.slug}.${extension}`; // create filename

  // create a stream that allows us to write data to a certail file
  const stream = fs.createWriteStream(`public/images/${filename}`);
  // Basically ArrayBuffer is used to keep binary data. It can be the binary data of an image for example.
  const bufferedImage = await meal.image.arrayBuffer();

  // For save image
  stream.write(Buffer.from(bufferedImage), (error) => {
    // write have 2 argument
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  // overwrite and only store path to db, not the image
  meal.image = `/images/${filename}`;

  db.prepare(
    `INSERT INTO meals 
      (title, image, summary, instructions, creator, creator_email, slug) 
    VALUES (
      @title, 
      @image, 
      @summary, 
      @instructions, 
      @creator, 
      @creator_email,
      @slug
    )`
  ).run(meal);
}
