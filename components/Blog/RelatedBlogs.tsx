"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogsByCategory } from "@/redux/slices/digitalPrescription/blog.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import BlogItem from "./BlogItem";

const RelatedBlogs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { catSlug, subCatSlug } = params;

  const { allBlogsByCategories } = useSelector(
    (state: RootState) => state.blogs
  );
  const { data, loading, errorMessage } = allBlogsByCategories;

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchAllBlogsByCategory());
    }
  }, [dispatch, data]);

  const filteredData = (b_data: any) => {
    if (!b_data || b_data.length === 0) {
      return [];
    }
    const categoryMatch = b_data.categories?.find(
      (cat: any) => cat.slug === catSlug
    );
    return categoryMatch?.sub_categories?.find(
      (s: any) => s.slug === subCatSlug
    )?.blogs;
  };

  return (
    <>
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : errorMessage ? (
        <p className="text-center text-red-500 text-sm">{errorMessage}</p>
      ) : filteredData(data) && filteredData(data).length > 0 ? (
        <div className="grid gap-5 grid-cols-1">
          {filteredData(data).map((blog: any, index: number) => (
            <BlogItem blog={blog} key={index} isReadMore={false} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 font-light text-sm">
          Related post not found
        </p>
      )}
    </>
  );
};

export default RelatedBlogs;
