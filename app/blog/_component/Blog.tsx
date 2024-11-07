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
        <header className="mb-2 w-full rounded-lg p-2 shadow-md bg-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-sky-700">
            Digital Health Feed
          </h1>
          <p className="mt-2 md:mt-4 text-base sm:text-2xl font-medium text-center text-slate-600 mx-auto">
            Stay informed with the latest in digital health and wellness.
          </p>
        </header>

        <section className="flex flex-wrap justify-start sm:justify-end gap-3 mb-10">
          {categories.map((category: string) => (
            <button
              key={category}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium text-sky-700 bg-gray-100 rounded-full shadow-md hover:bg-sky-100 transition`}
              onClick={() => console.log(`Category selected: ${category}`)}
            >
              {category}
            </button>
          ))}
        </section>

        {loading ? (
          <Loader />
        ) : errorMessage ? (
          <p className="p-10 md:px-40 text-red-500">{errorMessage}</p>
        ) : data.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
            {data.map((blog: any, index: number) => (
              <BlogItem blog={blog} key={index} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BlogPage;
