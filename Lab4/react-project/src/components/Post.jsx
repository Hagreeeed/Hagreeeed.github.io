// src/components/Post.jsx
import { useState } from 'react';

const Post = ({ post, onLike, onAddComment, onDelete }) => {
  const [commentText, setCommentText] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    onAddComment(post.id, commentText);
    setCommentText('');
    setShowCommentForm(false);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="author">{post.author}</span>
        <span className="date">{post.date}</span>
        <button 
          className="delete-post-btn"
          onClick={onDelete}
          aria-label="Видалити пост"
        >
          ×
        </button>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button className="like-btn" onClick={() => onLike(post.id)}>
          👍 {post.likes}
        </button>
        <button 
          className="comment-btn" 
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          💬 Коментувати ({post.comments.length})
        </button>
      </div>
      
      {showCommentForm && (
        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Напишіть коментар..."
            rows="3"
          />
          <div className="comment-form-actions">
            <button type="submit">Додати коментар</button>
            <button 
              type="button" 
              onClick={() => setShowCommentForm(false)}
            >
              Скасувати
            </button>
          </div>
        </form>
      )}
      
      {post.comments.length > 0 && (
        <div className="comments">
          <h4>Коментарі ({post.comments.length})</h4>
          {post.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <span className="comment-author">{comment.author}</span>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;