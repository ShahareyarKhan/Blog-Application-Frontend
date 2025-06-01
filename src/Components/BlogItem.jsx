import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const BlogItem = ({ post, onClose, handleLike, handleDislike }) => {
    if (!post) return null;

    return (
        <div className='fixed inset-0 z-50 bg-[#0011227c] flex justify-center items-center'>
            <div className='w-[90%] p-4 shadow-md rounded-xl bg-white max-h-[90vh] overflow-auto relative max-w-4xl'>
                <div className='sticky rounded-full p-1 top-4 right-4 '>
                    <IoClose className='text-3xl cursor-pointer text-red-600' onClick={onClose} />
                </div>

                <div className='flex flex-col md:flex-row gap-6 '>
                    <div className='w-full md:w-1/2'>
                        {post.image && (
                            <img
                                src={`https://blog-application-backend-nu.vercel.app${post.image}`}
                                alt={post.title}
                                className='rounded-md'
                            />
                        )}
                        <div className='text-2xl md:hidden mt-6 md:text-3xl font-bold'>
                            {post.title}
                        </div>
                        <div className='md:hidden flex gap-8 mt-4'>
                            <div className='text-gray-600 text-sm'>
                                Date: {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </div>
                            <div className='text-gray-600 text-sm '>
                                Topic: {post.topic}
                            </div>
                        </div>

                        {/* Like/Dislike Section */}
                        <div className='mt-4 flex gap-6 items-center'>
                            <div
                                className='flex items-center gap-1 cursor-pointer text-green-600'
                                onClick={() => handleLike(post._id)}
                                title='Like'
                            >
                                <AiOutlineLike className='text-2xl' />
                                <span>{post.likes?.length || 0}</span>
                            </div>
                            <div
                                className='flex items-center gap-1 cursor-pointer text-red-600'
                                onClick={() => handleDislike(post._id)}
                                title='Dislike'
                            >
                                <AiOutlineDislike className='text-2xl' />
                                <span>{post.dislikes?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 text-sm md:text-md text-justify'>
                        <div className='hidden md:flex text-2xl md:text-3xl font-bold mb-2'>
                            {post.title}
                        </div>

                        <div className='hidden md:flex gap-8 mb-2'>
                            <div className='text-gray-600 text-sm'>
                                Date: {new Date(post.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </div>
                            <div className='text-gray-600 text-sm '>
                                Topic: {post.topic}
                            </div>
                        </div>

                        <div>{post.content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
