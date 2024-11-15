"use client";

import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllBlogs } from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";

const categories = [
  "Digital Health Care",
  "Health Tips",
  "Investigation",
  "NextCare Events",
  "Patient Stories",
  "World Health Day",
];

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, errorMessage, loading } = useSelector(
    (state: RootState) => state.blogs
  );

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  useEffect(() => {
    if (!data || data.length <= 0) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch]);

  return (
    <>
      <div className="p-10 md:px-40">
        <header className="relative mb-6 w-full p-6 rounded-lg shadow-lg bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-700 animate-fade-in">
          <div className="absolute inset-0 bg-opacity-20 bg-white rounded-lg pointer-events-none"></div>
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Digital Health Feed
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-3xl leading-relaxed">
              Stay informed with the latest in digital health and wellness.
            </p>
          </div>
        </header>

        <section className="flex flex-wrap justify-start sm:justify-end gap-3 mb-10 animate-slide-up">
          {categories.map((category: string, index: number) => (
            <button
              key={category}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium text-sky-700 bg-gray-100 rounded-full shadow-md hover:bg-sky-100 hover:scale-105 transform transition duration-300 ease-in-out`}
              onClick={() => console.log(`Category selected: ${category}`)}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: "500ms",
              }}
            >
              {category}
            </button>
          ))}
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-40 animate-pulse">
            <Loader />
          </div>
        ) : errorMessage ? (
          <p className="p-10 md:px-40 text-red-500 animate-fade-in">
            {errorMessage}
          </p>
        ) : data.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3 animate-slide-up">
            {data.map((blog: any, index: number) => (
              <BlogItem blog={blog} key={index} />
            ))}
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-gray-500">No blogs available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
