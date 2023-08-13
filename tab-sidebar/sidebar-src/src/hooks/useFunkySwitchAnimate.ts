import {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { config, useSpring } from '@react-spring/web';


type UseFunkySwitchAnimate<T> = {
  itemWidth: number;
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  onAnimationComplete?: (newProfile: T)=>void;
}

export const useFunkySwitchAnimate = <T extends {id: string}>({ itemWidth, items, setItems, onAnimationComplete }: UseFunkySwitchAnimate<T>) => {
  const [ exitSpring, exitSpringApi ] = useSpring(() => ({
    opacity: 1,
    y: 0,
    config: config.stiff
  }));
  const [ entrySpring, entrySpringApi ] = useSpring(() => ({
    opacity: 0,
    y: 20,
    config: config.stiff
  }));
  const [ fillSpring, fillSpringApi ] = useSpring(() => ({
    x: 0,
    config: config.stiff
  }));

  const [ exitAnimateIndex, setExitAnimateIndex ] = useState<null | number>(null);
  const [ entryValue, setEntryValue ] = useState<T | null>(null);
  const [ isFillAnimating, setIsFillAnimating ] = useState(false);

  const entryValueRef = useRef<T | null>(null);
  const exitAnimateIndexRef = useRef<number | null>(null);

  useEffect(() => {
    entryValueRef.current = entryValue;
    exitAnimateIndexRef.current = exitAnimateIndex;
  }, [ entryValue, exitAnimateIndex ]);


  const onEntrySpringAnimationComplete = () => {
    entryValueRef.current && exitAnimateIndexRef.current && setItems([
      entryValueRef.current,
      ...items.slice(0, exitAnimateIndexRef.current),
      ...items.slice(exitAnimateIndexRef.current + 1)
    ]);

    entryValueRef.current && onAnimationComplete?.(entryValueRef.current);
    entryValueRef.current = null;
    exitAnimateIndexRef.current = null;
    setIsFillAnimating(false);
    setEntryValue(null);
    setExitAnimateIndex(null);

  };


  const onFillAnimationComplete = () => {
    entrySpringApi.start({
      opacity: 1,
      y: 0,
      onResolve: onEntrySpringAnimationComplete
    });

  };


  const onExitAnimationComplete = () => {
    fillSpringApi.start({
      x: itemWidth,
      onStart: setIsFillAnimating.bind(null, true),
      onResolve: onFillAnimationComplete
    });
  };


  const onItemClick = (clickedId: string) => {
    const targetIndex = items.findIndex(item => item.id === clickedId);

    setExitAnimateIndex(targetIndex);
    setEntryValue(items[targetIndex]);

    exitSpringApi.start({
      opacity: 0,
      y: 20,
      onResolve: onExitAnimationComplete
    });


  };

  return {
    onItemClick,
    exitAnimateIndex,
    entryValue,
    exitSpring,
    entrySpring,
    fillSpring,
    isFillAnimating
  };

};
