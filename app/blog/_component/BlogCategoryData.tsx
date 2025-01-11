"use client";
import Loader from "@/components/Loader";
import { RootState } from "@/redux/store";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BlogItem from "./BlogItem";

const BlogCategoryData = () => {
  const router = useRouter();
  const { allBlogsByCategories, reduxCatData } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (!reduxCatData) {
      router.replace("/blog");
    }
  }, []);

  return (
    <>
      {allBlogsByCategories.loading ? (
        <Loader />
      ) : allBlogsByCategories.errorMessage ? (
        <p className="p-10 md:px-40 text-red-500">
          {allBlogsByCategories.errorMessage}
        </p>
      ) : allBlogsByCategories.data ? (
        <div className="max-w-screen-2xl mx-auto p-6 mb-6 bg-white">
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
            Back
          </button>

          <div className="mx-2">
            <p className="text-sky-800 text-xl font-medium">
              {reduxCatData?.name}
            </p>

            <div>
              {(
                reduxCatData?.sub_categories?.flatMap(
                  (subCat: any) => subCat?.blogs || []
                ) || []
              ).map((blog: any, index: number) => (
                <div key={index}>
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mt-2">
                    <BlogItem blog={blog} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 text-xl font-normal">
            {"No Data Found."}
          </p>
        </>
      )}
    </>
  );
};

export default BlogCategoryData;
