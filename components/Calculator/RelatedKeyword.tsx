"use client";

import React, { useEffect, useState } from "react";
import { findBlogsByKeyword } from "@/services/api.digitalPrescription.service";
import { AxiosError } from "axios";
// import BlogItem from "../Blog/BlogItem";
import { Loader } from "lucide-react";
import BlogItem from "@/app/blog/_component/BlogItem";

const RelatedKeyword = ({ keyword }: { keyword: string }) => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [keyword]);

  const fetchRelatedBlogs = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      setErrorMessage("");
      const response = await findBlogsByKeyword(keyword);
      if (response && response.length > 0) {
        setBlogs(response);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      const err = error as AxiosError<{ detail?: string }>;
      const message =
        err?.response?.data?.detail ||
        "Something went wrong while fetching related blogs.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Related Blogs
      </h2>

      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : errorMessage ? (
        <p className="text-center text-red-500 italic mt-6">{errorMessage}</p>
      ) : blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: any) => (
            <BlogItem blog={blog} isReadMore={true} key={blog.blog_id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RelatedKeyword;
