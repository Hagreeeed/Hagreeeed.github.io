// src/components/GoalContent.jsx
import { useState } from 'react';

const GoalContent = ({ goal, onToggleSubgoal, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(goal.title);
  const [editedDescription, setEditedDescription] = useState(goal.description);

  const handleSave = () => {
    onUpdate({
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const progress = Math.round(
    (goal.subgoals.filter(subgoal => subgoal.completed).length / goal.subgoals.length) * 100
  ) || 0;

  return (
    <div className="goal-content">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
          />
        </>
      ) : (
        <>
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
        </>
      )}

      <div className="goal-meta">
        <div className="deadline">
          <span>Дедлайн: {goal.deadline}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
          <span>{progress}%</span>
        </div>
      </div>
      
      <div className="subgoals">
        {goal.subgoals.map(subgoal => (
          <div className="subgoal" key={subgoal.id}>
            <input
              type="checkbox"
              id={`subgoal-${goal.id}-${subgoal.id}`}
              checked={subgoal.completed}
              onChange={() => onToggleSubgoal(subgoal.id)}
            />
            <label htmlFor={`subgoal-${goal.id}-${subgoal.id}`}>
              {subgoal.text}
            </label>
          </div>
        ))}
      </div>
      
      <div className="goal-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Зберегти</button>
            <button onClick={() => setIsEditing(false)}>Скасувати</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Редагувати</button>
            <select
              value={goal.status}
              onChange={(e) => onUpdate({ status: e.target.value })}
            >
              <option value="active">Активна</option>
              <option value="completed">Завершена</option>
              <option value="postponed">Відкладена</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalContent;