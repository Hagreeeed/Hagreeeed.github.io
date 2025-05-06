// src/components/ProgressChart.jsx
import { useEffect, useState } from 'react';

const ProgressChart = ({ id, percent }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    // Анімація зростання відсотка
    let start = 0;
    const end = percent;
    const duration = 1000; // 1 секунда
    const increment = end / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedPercent(Math.floor(start));
    }, 16);
    
    return () => clearInterval(timer);
  }, [percent]);

  return (
    <div className="circle" id={id} style={{ '--percent': `${animatedPercent}%` }}>
      <span>{animatedPercent}%</span>
    </div>
  );
};

export default ProgressChart;