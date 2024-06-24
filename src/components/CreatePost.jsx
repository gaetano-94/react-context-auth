import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CreatePost = ({ categories, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('tags', tags);

    try {
      const { data: newPost } = await axios.post(
        `${apiUrl}/api/posts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onPostCreated(newPost);
      setTitle('');
      setContent('');
      setImage(null);
      setCategory('');
      setTags('');
    } catch (error) {
      console.error('Errore nella creazione del post:', error);
    }
  };

  return (
    <div className="create-post">
      <h2>Crea un nuovo post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contenuto:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Immagine:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tags (separati da virgola):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Crea Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
