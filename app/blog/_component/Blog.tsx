"use client";

import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchAllBlogs,
  fetchAllCategories,
} from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";
import { LoaderIcon } from "lucide-react";
import CustomHeader from "@/components/Header/PublicLayoutHeader";

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, errorMessage, loading, categories } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (!data || data.length <= 0) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!categories.data || categories.data.length <= 0) {
      dispatch(fetchAllCategories());
    }
  }, [categories]);

  return (
    <>
      <div className="p-10 md:px-40">
        <CustomHeader
          header="Digital Health Feed"
          subHeader="Stay informed with the latest in digital health and wellness."
          imageURL="/vector/health_feed.png"
        />

        <section className="flex flex-wrap justify-start sm:justify-end gap-3 mb-10 animate-slide-up">
          {categories?.loading ? (
            <div className="w-full flex justify-center items-center font-light text-slate-400 text-xs">
              <LoaderIcon className="animate-spin mr-1 h-4 w-4" />
              Fetching Categories ...
            </div>
          ) : categories?.errorMessage ? (
            <p className="p-10 md:px-40 text-red-500 animate-fade-in">
              {categories?.errorMessage}
            </p>
          ) : (
            categories?.data?.map(
              (
                category: { category_id: string; name: string },
                index: number
              ) => (
                <button
                  key={category?.category_id}
                  className={`px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium text-sky-700 bg-gray-100 rounded-full shadow-md hover:bg-sky-100 hover:scale-105 transform transition duration-300 ease-in-out`}
                  onClick={() => console.log(`Category selected: ${category}`)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "500ms",
                  }}
                >
                  {category?.name}
                </button>
              )
            )
          )}
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
