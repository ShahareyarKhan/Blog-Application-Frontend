import React, { useState } from 'react';
import { FaBars, FaBlog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className='w-full sticky top-0 z-50 bg-white shadow-sm'>

      {/* Mobile Navbar */}
      <div className='p-4 px-8 flex items-center md:hidden w-full justify-between'>
        <div>
          {open ? (
            <IoClose className='text-2xl cursor-pointer text-red-600' onClick={() => setOpen(false)} />
          ) : (
            <FaBars className='text-xl cursor-pointer text-red-600' onClick={() => setOpen(true)} />
          )}
        </div>
        <div>
          <a href="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
            <FaBlog title='Blogify' />
          </a>
        </div>
        <div>
          {isLoggedIn ? (
            <a href='/profile'>
              {user?.profilePic ? (
                <img
                  src={`https://blog-application-backend-nu.vercel.app/uploads/${user.profilePic}`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </a>
          ) : (
            <a
              href="/login"
              className="font-semibold text-sm cursor-pointer border border-red-400 text-red-600 rounded px-3 py-1 hover:shadow-sm"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${open ? "translate-x-0" : "-translate-x-full"} md:hidden bg-white w-full text-center text-sm px-6 pb-5 absolute py-2 transform space-y-5 shadow-md`}>
        <a href="/" className="block hover:text-red-600">Home</a>
        <a href="/add-blog" className="block hover:text-red-600">Add Blog</a>
        <div className='w-full border border-gray-200' />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-10 py-4">
        <a href="/" className="text-red-600 text-2xl font-bold flex items-center gap-2">
          <FaBlog /> 
        </a>
        <div className="space-x-6 text-gray-700 font-medium text-sm">
          <a href="/" className="hover:text-red-600">Home</a>
          <a href="/add-blog" className="hover:text-red-600">Add Blog</a>
         </div>
        <div>
          {isLoggedIn ? (
            <a href='/profile'>
              {user?.profilePic ? (
                <img
                  src={`https://blog-application-backend-nu.vercel.app/uploads/${user.profilePic}`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </a>
          ) : (
            <a
              href="/login"
              className="text-red-600 border border-red-400 px-4 py-1 text-sm font-medium rounded hover:shadow-sm"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
