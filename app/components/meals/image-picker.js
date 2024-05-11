'use client';

import { useRef, useState } from 'react';

import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ name, label }) {
  const [imageChoosen, setImageChoosen] = useState();
  const imageRef = useRef();

  // to connect button with input html
  function handleImagePick() {
    imageRef.current.click();
  }

  // event handler after image has choosen
  function handleImageChoose(event) {
    const file = event.target.files[0];

    if (!file) {
      setImageChoosen(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImageChoosen(fileReader.result); // set new value
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imageChoosen && <p>No image choose</p>}
          {imageChoosen && (
            <Image fill src={imageChoosen} alt="Image choose by user" />
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={imageRef}
          id={name}
          name={name}
          className={classes.input}
          onChange={handleImageChoose}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleImagePick}
        >
          Browse Image
        </button>
      </div>
    </div>
  );
}
