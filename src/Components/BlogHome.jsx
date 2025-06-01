import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import BlogItem from './BlogItem';
const BlogHome = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])

    const [editDeleteId, setEditDeleteId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await axios.get('https://blog-application-backend-nu.vercel.app/api/posts')
            setPosts(res.data)
        } catch (err) {
            console.error('Error fetching posts:', err)
        }
    }

    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const handleLike = async (postId) => {
        try {
            await axios.put(`https://blog-application-backend-nu.vercel.app/api/posts/${postId}/like`, {}, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            fetchPosts(); // Refresh posts to show updated likes
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleDislike = async (postId) => {
        try {
            await axios.put(`https://blog-application-backend-nu.vercel.app/api/posts/${postId}/dislike`, {}, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            fetchPosts(); // Refresh posts to show updated dislikes
        } catch (err) {
            console.error("Error disliking post:", err);
        }
    };

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            if (!token) {
                alert("No token found. Please log in again.");
                return;
            }

            await axios.delete(`https://blog-application-backend-nu.vercel.app/api/posts/${postId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            setPosts(posts.filter((post) => post._id !== postId));
            setEditDeleteId(null);
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post. Try again.");
        }
    };

    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl w-[90%] px-6 lg:px-8">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-4xl font-semibold md:font-extrabold tracking-tight text-center sm:text-5xl">
                        Welcome to the blog
                    </h2>
                    <p className="mt-2 text-lg text-gray-600 text-center">
                        Get expert insights and strategies to grow, scale, and succeed in your business.
                    </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="flex max-w-xl flex-col items-start justify-between shadow-xs hover:shadow-md p-4 rounded-md shadow-gray-400 transform hover:scale-105"
                        >
                            <div className="w-full flex items-center justify-between text-sm mb-2">
                                <div className='text-gray-600'>
                                    Date: {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className='text-gray-600 hover:text-black hover:font-semibold cursor-pointer'>{post.topic}</div>
                            </div>

                            {post.image && (
                                <img
                                    src={`https://blog-application-backend-nu.vercel.app${post.image}`}
                                    alt={post.title}
                                    className="mb-4 w-full h-48 object-cover rounded-md" onClick={() => setSelectedPost(post)}
                                />
                            )}

                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600" onClick={() => setSelectedPost(post)}>
                                    <a>{post.title}</a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm text-gray-600" onClick={() => setSelectedPost(post)}>{post.content}</p>
                            </div>

                            <div className="relative mt-8 flex items-center justify-between w-full">
                                <div className='flex items-center gap-3'>
                                    {post.author.profilePic ? (
                                        <img
                                            alt={post.author.username}
                                            src={`https://blog-application-backend-nu.vercel.app/uploads/${post.author.profilePic}`}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                                            {post.author.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <p className="font-semibold text-gray-900">{post.author.username}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => handleLike(post._id)}
                                        className="flex items-center cursor-pointer text-red-600"
                                        title="Like"
                                    >
                                        <AiOutlineLike className="text-2xl" />
                                        <span className="ml-1 text-sm">{post.likes?.length || 0}</span>
                                    </div>

                                    <div
                                        onClick={() => handleDislike(post._id)}
                                        className="flex items-center cursor-pointer text-blue-600"
                                        title="Dislike"
                                    >
                                        <AiOutlineDislike className="text-2xl" />
                                        <span className="ml-1 text-sm">{post.dislikes?.length || 0}</span>
                                    </div>
                                    {post.author.username === user?.username && (
                                        <div className="relative">
                                            <BsThreeDotsVertical
                                                className="text-2xl text-gray-600 cursor-pointer"
                                                onClick={() =>
                                                    setEditDeleteId(editDeleteId === post._id ? null : post._id)
                                                }
                                            />

                                            {editDeleteId === post._id && (
                                                <div className="absolute top-6 right-0 z-10 bg-white border border-gray-400 rounded shadow-md text-sm">
                                                    <div className="hover:bg-gray-300 px-4 py-2 cursor-pointer" onClick={() => navigate(`/edit/${post._id}`)}>Edit</div>
                                                    <div
                                                        className="hover:bg-red-300  px-4 py-2 cursor-pointer"
                                                        onClick={() => handleDelete(post._id)}
                                                    >
                                                        Delete
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>

            {selectedPost && (
                <BlogItem
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    token={token}
                />
            )}
        </div>
    )
}

export default BlogHome
