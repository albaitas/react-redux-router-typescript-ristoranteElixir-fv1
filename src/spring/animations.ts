import { animated, useSpring } from 'react-spring';

const animations = {
  fadeIn: {
    from: { opacity: 0, transform: 'translate3d(0,-60px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { duration: 500 }
  }
};

export function useFadeIn() {
  const spring = useSpring(animations.fadeIn);
  return {
    animated,
    spring
  };
}
