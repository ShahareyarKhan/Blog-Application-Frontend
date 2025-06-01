import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
        setLoading(false);
        return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    axios
        .get('https://blog-application-backend-nu.vercel.app/api/posts/')
        .then((res) => {
            const userPosts = res.data.filter(
                (post) => post.author && post.author.username === parsedUser.username
            );
            setPosts(userPosts);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
            setLoading(false);
        });
}, []);


    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>Please log in to view your profile.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center space-x-4 mb-8">
                {user.profilePic ? (
                    <img
                        src={`https://blog-application-backend-nu.vercel.app/uploads/${user.profilePic}`}
                        alt={user.username}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-4xl text-white">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <p>Email: {user.email}</p>
                    <div className='px-4 w-[100px] hover:rounded-xl text-sm text-center my-3  md:block py-2 bg-red-600 text-white rounded cursor-pointer' onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>


            <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
            {posts.length === 0 ? (
                <p>You haven't written any blog posts yet.</p>
            ) : (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className="border p-4 rounded shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
                            <div className="text-sm text-gray-500 mt-2">
                                Topic: {post.topic} | Date:{" "}
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
