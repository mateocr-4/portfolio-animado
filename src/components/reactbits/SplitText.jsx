/**
 * SplitText — inspired by ReactBits (https://reactbits.dev)
 * Lightweight Framer Motion version (no GSAP dependency).
 * Animates each character or word individually when scrolled into view.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text = '',
  className = '',
  splitBy = 'chars',       // 'chars' | 'words'
  delay = 30,              // ms between each element
  duration = 0.5,
  from = { opacity: 0, y: 30, filter: 'blur(4px)' },
  to = { opacity: 1, y: 0, filter: 'blur(0px)' },
  easing = [0.16, 1, 0.3, 1],
  threshold = 0.2,
  tag: Tag = 'p',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const elements = splitBy === 'words' ? text.split(' ') : text.split('');

  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {elements.map((el, i) => (
        <motion.span
          key={`${el}-${i}`}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration,
            delay: (i * delay) / 1000,
            ease: easing,
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
          }}
        >
          {el === ' ' ? '\u00A0' : el}
          {splitBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
