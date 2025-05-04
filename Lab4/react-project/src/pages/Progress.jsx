// src/pages/Progress.jsx
import { useState, useEffect } from 'react';
import ProgressChart from '../components/ProgressChart';
import '../styles.css'

const Progress = () => {
  const [goalsProgress, setGoalsProgress] = useState(0);
  const [subgoalsProgress, setSubgoalsProgress] = useState(0);

  useEffect(() => {
    // Розрахунок прогресу на основі даних з localStorage
    const savedGoals = JSON.parse(localStorage.getItem('goals') || [])
    
    if (savedGoals.length > 0) {
      const totalGoals = savedGoals.length;
      const completedGoals = savedGoals.filter(goal => 
        goal.subgoals.every(subgoal => subgoal.completed)
      ).length;
      
      const totalSubgoals = savedGoals.reduce(
        (sum, goal) => sum + goal.subgoals.length, 0
      );
      const completedSubgoals = savedGoals.reduce(
        (sum, goal) => sum + goal.subgoals.filter(subgoal => subgoal.completed).length, 0
      );
      
      setGoalsProgress(Math.round((completedGoals / totalGoals) * 100));
      setSubgoalsProgress(Math.round((completedSubgoals / totalSubgoals) * 100));
    }
  }, []);

  return (
    <section className="progress-section">
      <h2>Візуалізація досягнень</h2>
      
      <div className="progress-charts">
        <div className="chart">
          <ProgressChart 
            id="goals-progress" 
            percent={goalsProgress} 
          />
          <p>Виконано цілей</p>
        </div>
        <div className="chart">
          <ProgressChart 
            id="subgoals-progress" 
            percent={subgoalsProgress} 
          />
          <p>Виконано підцілей</p>
        </div>
      </div>

      <div className="achievements">
        <h3>Мої нагороди</h3>
        <ul>
          <li>🏆 Виконано 10 цілей</li>
          <li>🎖️ Перша ціль досягнута</li>
          <li>⭐ Активний користувач тижня</li>
        </ul>
      </div>

      <div className="progress-history">
        <h3>Історія прогресу</h3>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Ціль</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01.10.2025</td>
              <td>Тренування</td>
              <td>✅ Виконано</td>
            </tr>
            <tr>
              <td>05.10.2025</td>
              <td>Читання книги</td>
              <td>✅ Виконано</td>
            </tr>
            <tr>
              <td>10.10.2025</td>
              <td>Вивчення мови</td>
              <td>⏳ В процесі</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Progress;