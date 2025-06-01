import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const topics = [
    'News',
    'Technology',
    'Sports',
    'Programming',
    'Marketing',
    'Job',
    'Entertainment',
    'Others',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('topic', formData.topic);
      if (imageFile) {
        data.append('image', imageFile);
      }

      // For debugging: Log FormData content
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const res = await axios.post('https://blog-application-backend-nu.vercel.app/api/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Blog post added successfully!');
      setFormData({
        title: '',
        content: '',
        topic: '',
      });
      setImageFile(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl text-center md:text-left font-bold text-red-600 mb-6 border-b pb-4">
        Create a New Blog Post
      </h2>

      {message && (
        <p
          className={`mb-6 px-4 py-3 rounded ${
            message.includes('successfully')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 text-sm py-2 focus:border-red-500 focus:ring focus:ring-red-200 outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block mb-2 font-semibold text-sm text-gray-700"
          >
            Topic <span className="text-red-600">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full rounded-md border text-sm border-gray-300 px-3 py-2 focus:border-red-500 focus:ring focus:ring-red-200 outline-none transition"
          >
            <option value="" disabled>
              Select blog topic
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Upload Image <span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full text-gray-600 bg-gray-300 hover:shadow-md shadow-gray-400 rounded text-sm p-2"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block mb-2 font-semibold text-sm text-gray-700"
          >
            Content <span className="text-red-600">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Write your blog content here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full rounded-md border text-sm border-gray-300 px-4 py-3 resize-y focus:border-red-500 focus:ring focus:ring-red-200 outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 text-sm transition disabled:opacity-60"
        >
          {loading ? 'Posting...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
