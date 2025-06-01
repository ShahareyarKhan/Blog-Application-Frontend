import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        content: '',
        topic: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    // console.log(form.title, form.content, form.topic, form.image);

    useEffect(() => {
        axios.get(`https://blog-application-backend-nu.vercel.app/api/posts/${id}`)
            .then(res => {
                const { title, content, topic, image } = res.data;
                setForm({ title, content, topic, image: image });
            })
            .catch(err => {
                console.error('Error fetching post:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        formData.append('topic', form.topic);
        if (form.image) {
            formData.append('image', form.image);
        }

        await axios.put(`https://blog-application-backend-nu.vercel.app/api/posts/${id}`, formData, {
            headers: {
                authorization: `Bearer ${token}`,
                // Do NOT manually set Content-Type here for FormData
            }
        });

        navigate('/');
    } catch (err) {
        console.error('Error updating post:', err);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-6">Edit Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                    rows="6"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    placeholder="Topic"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
