import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const { data } = await response.json();
        console.log('data', data)
        setPosts(data);
      } catch (error) {
        throw error;
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className=''>
      <h1>XIVPF</h1>
      <ul>
        {posts.map(({ _id, title }) => {
          return (
            <li key={_id}>{title}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
