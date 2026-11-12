import {useEffect, useState} from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Starts `false` on the server and on first client render (so hydration
 *  matches), then picks up the real setting in an effect. Only use it in
 *  effects and handlers, never to change rendered markup. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
