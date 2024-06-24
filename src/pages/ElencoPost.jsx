import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ElencoPost() {
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const fetchPosts = async () => {
    const { data: response } = await axios.get(`${apiUrl}/api/posts`);
    setPosts(response);
  };

  const fetchCategories = async () => {
    const { data: response } = await axios.get(`${apiUrl}/api/categories`);
    setCategories(response);
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setShowCreatePost(false);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="create-post-toggle">
        <button onClick={() => setShowCreatePost(!showCreatePost)}>
          {showCreatePost ? 'Annulla' : 'Crea Nuovo Post'}
        </button>
      </div>
      {showCreatePost && (
        <CreatePost categories={categories} onPostCreated={handlePostCreated} />
      )}
      <div className="posts">
        {posts === null && 'Caricando posts...'}
        {posts?.length === 0 && 'Nessun posts trovato.'}
        {posts?.length > 0 &&
          posts.map((p) => (
            <PostCard
              key={p.id}
              image={p.image}
              title={p.title}
              content={p.content}
              category={p.category}
              tags={p.tags}
              published={p.published}
            />
          ))}
      </div>
    </div>
  );
}
