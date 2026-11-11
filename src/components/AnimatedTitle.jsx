import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Animated title component with scroll-triggered text animations
const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  // Setup GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline with scroll trigger
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        }
      });

      // Animate each word with fade and 3D transform
      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      })

    }, containerRef);

    // Cleanup animations on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {/* Split title by line breaks */}
      {title.split('<br />').map((line, index) => (
        <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
          {/* Split each line into words for individual animation */}
          {line.split(' ').map((word, i) => (
            <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle
