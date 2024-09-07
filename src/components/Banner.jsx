import React, { useEffect, useState } from 'react'
import { URL } from '../url'
import axios from 'axios'

const Banner = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${URL}/api/banners`);
        console.log("banner posts", res.data);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching banner posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return; // Don't set up interval if there are no posts

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [posts]); // Re-run this effect if posts array changes

  const currentPost = posts[currentIndex];

  return (
    <div className=' bg-[#5b3e31] text-white text-center top-0 left-0 right-0 z-50 py-2'>
      {currentPost && <p className='text-lg'>{currentPost.title}</p>}
    </div>
  )
}

export default Banner