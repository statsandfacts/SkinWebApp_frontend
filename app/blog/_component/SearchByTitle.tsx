"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchBlogsByTitle } from "@/services/api.digitalPrescription.service";

const SearchByTitle = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (title.trim()) {
        fetchBlogs();
      } else {
        setBlogs([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [title]);

  const fetchBlogs = async () => {
    try {
      const response = await searchBlogsByTitle(title);
      if (response && response.length > 0) {
        const filtered = response.filter((blog: any) =>
          blog.title.toLowerCase().includes(title.toLowerCase())
        );
        setBlogs(filtered);
        setShowDropdown(filtered.length > 0);
      } else {
        setBlogs([]);
        setShowDropdown(false);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
    }
  };

  const handleClick = (blog: any) => {
    router.push(
      `/blog/${blog?.categories[0].slug}/${blog?.sub_categories[0].slug}/${blog?.slug}`
    );
  };

  return (
    <div className="mb-10">
      <div className="max-w-[790px] relative">
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-base"
        />

        {showDropdown && blogs.length > 0 && (
          <div className="absolute  left-0 w-full bg-gray-100 rounded-md shadow-lg mt-2 z-10 max-h-[300px] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1">
              {blogs.map((blog) => (
                <div
                  key={blog.blog_id}
                  onClick={() => handleClick(blog)}
                  className="bg-white p-3 border rounded-md shadow-sm hover:bg-blue-100 cursor-pointer transition"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {blog.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchByTitle;
