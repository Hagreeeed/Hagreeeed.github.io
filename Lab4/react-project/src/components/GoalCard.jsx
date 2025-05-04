// src/components/GoalCard.jsx
import GoalContent from './GoalContent';

const GoalCard = ({ goal, onToggleSubgoal, onUpdateStatus }) => {
  const isCompleted = goal.status === 'completed';
  const isPostponed = goal.status === 'postponed';

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''} ${isPostponed ? 'postponed' : ''}`}>
      <div 
        className="goal-image" 
        style={{ backgroundImage: `url(${goal.image})` }}
      />
      <GoalContent 
        goal={goal}
        onToggleSubgoal={onToggleSubgoal}
        onUpdate={onUpdateStatus}
      />
    </div>
  );
};

export default GoalCard;