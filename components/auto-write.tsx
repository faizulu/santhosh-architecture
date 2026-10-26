"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const TYPE_MS = 120;
const HOLD_MS = 1400;
const DELETE_MS = 48;

export function AutoWrite({
  words,
  repeat = true,
}: {
  words: readonly string[];
  repeat?: boolean;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index] ?? "";

  useEffect(() => {
    if (reduce) return;

    let delay = TYPE_MS;
    if (!deleting && count === word.length) delay = HOLD_MS;
    else if (deleting && count === 0) delay = 360;
    else if (deleting) delay = DELETE_MS;

    const timer = window.setTimeout(() => {
      if (!deleting && count < word.length) {
        setCount((value) => value + 1);
        return;
      }
      if (!deleting && count === word.length) {
        if (!repeat) return;
        setDeleting(true);
        return;
      }
      if (deleting && count > 0) {
        setCount((value) => value - 1);
        return;
      }
      setDeleting(false);
      setIndex((value) => (value + 1) % words.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [count, deleting, index, reduce, repeat, word.length, words.length]);

  const shown = reduce ? words[0] : word.slice(0, count);

  return (
    <span aria-label={word}>
      <span aria-hidden="true">
        {shown}
        {reduce ? null : <span className="auto-caret" />}
      </span>
    </span>
  );
}
