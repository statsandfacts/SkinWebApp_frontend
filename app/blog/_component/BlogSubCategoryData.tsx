"use client";
import Loader from "@/components/Loader";
import { AppDispatch, RootState } from "@/redux/store";
import { ChevronLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "./BlogItem";
import { fetchAllBlogsByCategory } from "@/redux/slices/digitalPrescription/blog.slice";

const BlogSubCategoryData = () => {
  const { subCategoryId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { allBlogsByCategories } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (
      !allBlogsByCategories.data?.categories ||
      allBlogsByCategories.data?.categories.length <= 0
    ) {
      dispatch(fetchAllBlogsByCategory());
    }
  }, [allBlogsByCategories]);

  const subCategoryData = allBlogsByCategories?.data?.categories
    ?.flatMap((category: any) => category.sub_categories || [])
    .find((subCat: any) => subCat.sub_category_id === subCategoryId);

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
              {subCategoryData?.name}
            </p>

            <div>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mt-2">
                {subCategoryData?.blogs.length > 0 ? (
                  subCategoryData?.blogs.map((blog: any, index: number) => (
                    <div key={index}>
                      <BlogItem blog={blog} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 text-lg font-normal text-center">
                    No feeds found.
                  </p>
                )}
              </div>
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

export default BlogSubCategoryData;
