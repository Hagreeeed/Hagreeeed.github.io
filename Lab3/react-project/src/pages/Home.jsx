// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import Timer from '../components/Timer';

// Початкові дані цілей
const initialGoals = [
  {
    id: 1,
    title: "Тренування",
    description: "Регулярні тренування для підтримки форми.",
    deadline: "31.10.2025",
    image: "https://images.groosha.ua/medialibrary/37d/gde_luchshe_raspolozhit_sportzal_v_chastnom_dome_0.jpg",
    status: "active",
    subgoals: [
      { id: 1, text: "10 хвилин розминки", completed: false },
      { id: 2, text: "30 хвилин бігу", completed: false },
      { id: 3, text: "20 хвилин силових вправ", completed: false }
    ]
  },
  {
    id: 2,
    title: "Читання",
    description: "Прочитати 1 книгу на місяць.",
    deadline: "30.11.2025",
    image: "https://ps.informator.ua/wp-content/uploads/2024/09/read.jpg",
    subgoals: [
      { id: 1, text: "Обрати книгу", completed: false },
      { id: 2, text: "Читати 20 сторінок на день", completed: false }
    ]
  },
  {
    id: 3,
    title: "Вивчення мови",
    description: "Вивчати англійську мову щодня.",
    deadline: "31.10.2025",
    image: "https://zmina.info/wp-content/uploads/2023/04/csm_adobestock_139574720_60248a8925-e1681455234304.jpeg",
    subgoals: [
      { id: 1, text: "10 нових слів на день", completed: false },
      { id: 2, text: "Перегляд 1 відео англійською", completed: false }
    ]
  },
  {
    id: 4,
    title: "CheckList",
    description: "Справи на день.",
    deadline: "31.10.2025",
    image: "https://www.ldatschool.ca/wp-content/uploads/2014/09/shutterstock_410527213.jpg",
    subgoals: [
      { id: 1, text: "Вигуляти собаку", completed: false },
      { id: 2, text: "Прибрати квартиру", completed: false }
    ]
  },
];

const Home = () => {
  const [goals, setGoals] = useState(() => {
    // Завантажуємо збережені цілі з localStorage
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });
  const [filter, setFilter] = useState('all');
  const [searchQuery] = useState('');

  // Зберігаємо цілі в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const toggleSubgoal = (goalId, subgoalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedSubgoals = goal.subgoals.map(subgoal => 
          subgoal.id === subgoalId 
            ? { ...subgoal, completed: !subgoal.completed } 
            : subgoal
        );
        
        // Автоматично оновлюємо статус
        const isCompleted = updatedSubgoals.every(subgoal => subgoal.completed);
        const newStatus = isCompleted ? 'completed' : goal.status;
        
        return {
          ...goal,
          subgoals: updatedSubgoals,
          status: newStatus
        };
      }
      return goal;
    }));
  };

  const updateGoalStatus = (goalId, updates) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  // Фільтрація та пошук
  const filteredGoals = goals
    .filter(goal => {
      if (filter === 'active') return goal.status === 'active';
      if (filter === 'completed') return goal.status === 'completed';
      if (filter === 'postponed') return goal.status === 'postponed';
      return true;
    })
    .filter(goal => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        goal.title.toLowerCase().includes(query) ||
        goal.description.toLowerCase().includes(query)
      );
    });

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Досягай своїх цілей разом з нами!</h2>
          <p>Плануй, відстежуй та досягай успіхів у своїх цілях. Почни вже сьогодні!</p>
          <a href="#" className="btn-cta">Увійти</a>
        </div>
      </section>

      <Timer />

      <section className="goals-controls">
        <div className="filters">
          <button onClick={() => setFilter('all')}>Всі цілі</button>
          <button onClick={() => setFilter('active')}>Активні</button>
          <button onClick={() => setFilter('completed')}>Завершені</button>
          <button onClick={() => setFilter('postponed')}>Відкладені</button>
        </div>
        
      </section>

      <section className="goals-grid">
        {filteredGoals.length > 0 ? (
          filteredGoals.map(goal => (
            <GoalCard 
              key={goal.id}
              goal={goal}
              onToggleSubgoal={(subgoalId) => toggleSubgoal(goal.id, subgoalId)}
              onUpdateStatus={(updates) => updateGoalStatus(goal.id, updates)}
            />
          ))
        ) : (
          <p>Немає цілей, що відповідають критеріям</p>
        )}
      </section>

      <section className="benefits">
        <h2>Чому обирають нас?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span>📅</span>
            <h3>Планування</h3>
            <p>Легко плануй свої цілі та розбивай їх на підзавдання.</p>
          </div>
          <div className="benefit-card">
            <span>📊</span>
            <h3>Відстеження</h3>
            <p>Слідкуй за своїм прогресом у зручному інтерфейсі.</p>
          </div>
          <div className="benefit-card">
            <span>👥</span>
            <h3>Спільнота</h3>
            <p>Спілкуйся з однодумцями та ділись своїми успіхами.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;