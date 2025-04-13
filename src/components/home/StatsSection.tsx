
import { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  duration?: number;
}

const StatItem = ({ label, value, suffix, duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    
    const timer = setInterval(() => {
      start += step;
      if (start > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center reveal">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        <span className="text-ignite">{suffix}</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-dark-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem label="Happy Clients" value={120} suffix="+" />
          <StatItem label="Projects Completed" value={350} suffix="+" />
          <StatItem label="Traffic Increase" value={320} suffix="%" />
          <StatItem label="ROI Delivered" value={12} suffix="x" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
