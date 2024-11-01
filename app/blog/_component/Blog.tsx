"use client";

import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllBlogs } from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, errorMessage, loading } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <>
      <div className="p-10 md:px-40">
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
        ) : <></>}
      </div>
    </>
  );
};

export default BlogPage;
