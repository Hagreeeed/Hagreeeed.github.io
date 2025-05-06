// src/pages/Community.jsx
import { useState, useEffect } from 'react';
import Post from '../components/Post';


const Community = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    return savedPosts ? JSON.parse(savedPosts) : [
      {
        id: 1,
        author: "Іван Петренко",
        date: "01.10.2023",
        content: "Як ви мотивуєте себе для регулярних тренувань? Діліться своїми секретами!",
        likes: 12,
        comments: [
          {
            id: 1,
            author: "Марія Іваненко",
            content: "Я завжди планую тренування на ранок, щоб почати день з енергією!"
          }
        ]
      }
    ];
  });

  // Збереження постів у localStorage
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    
    const newPost = {
      id: Date.now(),
      author: "Ви",
      date: new Date().toLocaleDateString(),
      content: postContent,
      likes: 0,
      comments: []
    };
    
    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  const addLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: "Ви",
          content: commentText
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <section className="community-section">
      <h2>Обговорення</h2>
      <p>Тут можна обмінюватися досвідом, давати поради та підтримувати інших користувачів.</p>

      <form onSubmit={handleSubmit} className="post-form">
        <textarea 
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Напишіть свій пост..." 
          required 
        />
        <button type="submit">Опублікувати</button>
      </form>

      <div className="posts">
        {posts.map(post => (
          <Post 
            key={post.id}
            post={post}
            onLike={() => addLike(post.id)}
            onAddComment={addComment}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Community;