import axios from 'axios';
import {useState, useEffect} from 'react';
import { Pagination } from './components/Pagination';
import { Posts } from './components/Posts';

function App() {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const lastPosts = currentPage * postsPerPage;
  const firstPosts = lastPosts - postsPerPage;
  const currentPosts = posts.slice(firstPosts,lastPosts)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const getPerPage = (e) => {
    setPostsPerPage(e.target.value);
  }
  return (
    <div className="container mt-5">
    <div className="row align-items-center">
      <h1 className="text-primary mb-3 col-7">My Blog</h1>
      <div className="filter col-5">
        <span>Chọn số lượng bài viết muốn hiển thị ở mỗi trang</span>
        <input 
        type="number" 
        min="5"
        max="50"
        step="5"
        onChange={getPerPage}
        />
      </div>
    </div>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
    
  );
}

export default App;
