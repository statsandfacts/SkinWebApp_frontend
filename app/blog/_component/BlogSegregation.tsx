"use client";

import {
  fetchAllBlogsByCategory,
  setReduxCatData,
} from "@/redux/slices/digitalPrescription/blog.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { ChevronRight, Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LatestBlogCarousel from "./LatestBlogCarousel";
import Image from "next/image";
import BlogItem from "./BlogItem";
import { useRouter } from "next/navigation";
import FollowUsBlogComponent from "./FollowUsBlogComponent";

const BlogSegregation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { allBlogsByCategories } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (
      allBlogsByCategories.data &&
      (!allBlogsByCategories.data?.categories ||
        allBlogsByCategories.data?.categories.length <= 0)
    ) {
      dispatch(fetchAllBlogsByCategory());
    }
  }, [dispatch]);

  return (
    <div>
      <section>
        {allBlogsByCategories.loading ? (
          <div className="flex justify-center items-center h-40 animate-pulse">
            <Loader />
          </div>
        ) : allBlogsByCategories.errorMessage ? (
          <p className="p-10 md:px-40 text-red-500 animate-fade-in">
            {allBlogsByCategories.errorMessage}
          </p>
        ) : (
          <>
            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-12">
              <div className="w-full md:w-2/3">
                <LatestBlogCarousel
                  data={
                    allBlogsByCategories.data &&
                    allBlogsByCategories.data?.recent_blogs
                  }
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="shadow-2xl p-4 rounded-lg">
                  <p className="text-gray-700 font-semibold text-2xl">
                    Latest Feeds
                  </p>
                  <div className="flex flex-col gap-4">
                    {allBlogsByCategories.data &&
                      allBlogsByCategories.data?.recent_blogs &&
                      allBlogsByCategories.data?.recent_blogs
                        .slice(0, 4)
                        .map((item: any, index: number) => (
                          <Link
                            href={`/blog/${item?.slug}`}
                            key={index}
                            className="hover:bg-sky-50 p-2 rounded-lg h-fit"
                          >
                            <div className="flex gap-4">
                              {item?.image ? (
                                <Image
                                  src={item?.image}
                                  alt={item?.title}
                                  width={150}
                                  height={150}
                                  className="rounded-lg"
                                />
                              ) : (
                                <div className="h-40"></div>
                              )}
                              <p className="text-gray-700 font-semibold text-base md:text-lg">
                                {item?.title?.length > 30
                                  ? `${item?.title?.slice(0, 30)}...`
                                  : item?.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>

                <div className="hidden md:flex md:flex-col">
                  <FollowUsBlogComponent />
                </div>
              </div>
            </div>

            <div className="mt-6 md:flex flex-col gap-4 animate-slide-up">
              {allBlogsByCategories.data &&
                allBlogsByCategories.data.categories &&
                allBlogsByCategories.data.categories.map(
                  (cat: any, index: number) => {
                    const allBlogs =
                      cat?.sub_categories?.flatMap(
                        (subCat: any) => subCat?.blogs || []
                      ) || [];

                    const topBlogs = allBlogs.slice(0, 3);

                    return (
                      <div key={index}>
                        <div className="flex justify-between mt-4">
                          <p className="text-sky-800 text-base md:text-xl font-medium">
                            {cat?.name}
                          </p>
                          <button
                            onClick={() => {
                              dispatch(setReduxCatData(cat));
                              router.push(`/blog/category/${cat.category_id}`);
                            }}
                            className="text-sky-800 flex items-center text-sm md:text-xl transition ease-in-out duration-200 hover:translate-x-1 hover:text-sky-700"
                          >
                            View More
                            <ChevronRight className="w-4 h-4 text-sky-800 transition-transform duration-200 ease-in-out hover:translate-x-1" />
                          </button>
                        </div>

                        <div className="hidden md:grid gap-5 grid-cols-1 md:grid-cols-3 mt-2">
                          {topBlogs.map((blog: any, blogIndex: number) => (
                            <BlogItem blog={blog} key={blogIndex} />
                          ))}
                        </div>

                        <div className="flex flex-col gap-4 md:hidden">
                          {topBlogs.map((blog: any, blogIndex: number) => (
                            <Link
                              href={`/blog/${blog?.slug}`}
                              key={blogIndex}
                              className="hover:bg-sky-50 p-2 rounded-lg h-fit"
                            >
                              <div className="flex gap-4">
                                {blog?.image ? (
                                  <Image
                                    src={blog?.image}
                                    alt={blog?.title}
                                    width={150}
                                    height={150}
                                    className="rounded-lg"
                                  />
                                ) : (
                                  <div className="h-40"></div>
                                )}
                                <p className="text-gray-700 font-semibold text-base md:text-lg">
                                  {blog?.title?.length > 45
                                    ? `${blog?.title?.slice(0, 45)}...`
                                    : blog?.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>

            <div className="md:hidden">
              <FollowUsBlogComponent />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default BlogSegregation;
