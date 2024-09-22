// react
import { MutableRefObject, RefObject } from 'react';

// react-next-tilt
import { ParallaxRef } from 'react-next-parallax';

// resets tilt, does animations and runs the callback function at the end
export const animate = (
  ref: RefObject<ParallaxRef>,
  animationIsRunning: MutableRefObject<boolean>,
  onEnd?: () => void
): void => {
  if (animationIsRunning.current || !ref.current) return;
  animationIsRunning.current = true;
  ref.current.updateWillChange();

  const animationDelay = 500;
  const itemDelay = 8;

  // reset the tilt
  ref.current.tilt({ angleX: 0, angleY: 0 }, true);
  // disabled hover and touch
  if (ref.current.element) {
    ref.current.element.style.pointerEvents = 'none';
    ref.current.element.style.touchAction = 'none';
  }
  // tilt to left
  setTimeout(() => {
    for (let i = 0, j = 0; i >= -20; i--, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: 0, angleY: i }, true);
      }, itemDelay * j);
  }, animationDelay);
  // tilt to left
  setTimeout(() => {
    for (let i = -20, j = 0; i <= 20; i++, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: 0, angleY: i }, true);
      }, itemDelay * j);
  }, animationDelay * 2 + itemDelay * 20);
  // tilt to top
  setTimeout(() => {
    for (let i = 0; i <= 20; i++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: i, angleY: 20 - i }, true);
      }, itemDelay * i);
  }, animationDelay * 3 + itemDelay * 60);
  // tilt to bottom
  setTimeout(() => {
    for (let i = 20, j = 0; i >= -20; i--, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: i, angleY: 0 }, true);
      }, itemDelay * j);
  }, animationDelay * 4 + itemDelay * 80);
  // rotate
  setTimeout(() => {
    // to bottom left
    for (let i = 0, j = 0; i >= -20; i--, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: -20, angleY: i }, true);
      }, itemDelay * j);
    // to top left
    for (let i = -20, j = 0; i <= 20; i++, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: i, angleY: -20 }, true);
      }, itemDelay * j + itemDelay * 20);
    // to top right
    for (let i = -20, j = 0; i <= 20; i++, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: 20, angleY: i }, true);
      }, itemDelay * j + itemDelay * 60);
    // to bottom right
    for (let i = 20, j = 0; i >= -20; i--, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: i, angleY: 20 }, true);
      }, itemDelay * j + itemDelay * 100);
    // to bottom center
    for (let i = 20, j = 0; i >= 0; i--, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: -20, angleY: i }, true);
      }, itemDelay * j + itemDelay * 140);
    // to center
    for (let i = -20, j = 0; i <= 0; i++, j++)
      setTimeout(() => {
        if (ref.current) ref.current.tilt({ angleX: i, angleY: 0 }, true);
      }, itemDelay * j + itemDelay * 160);
  }, animationDelay * 5 + itemDelay * 120);

  setTimeout(() => {
    // reset the tilt
    if (ref.current) {
      ref.current.tilt({ angleX: 0, angleY: 0 });
      ref.current.updateWillChange(false);
      // enable hover and touch
      if (ref.current.element) {
        ref.current.element.style.pointerEvents = 'auto';
        ref.current.element.style.touchAction = 'auto';
      }
    }
    animationIsRunning.current = false;
    // onEnd() callback
    if (onEnd) onEnd();
  }, animationDelay * 5 + itemDelay * 300 + 50);
};
