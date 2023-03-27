import { Loading } from 'notiflix';
import { useEffect } from 'react';

export default function Load() {
  useEffect(() => {
    return () => {
      Loading.remove();
    };
  });
  return Loading.circle();
}
