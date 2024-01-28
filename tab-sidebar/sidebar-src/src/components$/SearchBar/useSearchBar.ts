import { createSignal } from 'solid-js';

const [ searchString, setSearchString ] = createSignal('');


export const useSearchBar = () => {
  return [ searchString, setSearchString ] as ReturnType<typeof createSignal<string>>;
};
