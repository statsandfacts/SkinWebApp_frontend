"use client";

import {
  fetchAllBlogsByCategory,
  setReduxCatData,
} from "@/redux/slices/digitalPrescription/blog.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Loader,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LatestBlogCarousel from "./LatestBlogCarousel";
import Image from "next/image";
import BlogItem from "./BlogItem";
import { useRouter } from "next/navigation";

const BlogSegregation = () => {
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
              <div className="w-2/3">
                <LatestBlogCarousel
                  data={allBlogsByCategories.data?.recent_blogs}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="shadow-2xl p-4 rounded-lg">
                  <p className="text-gray-700 font-semibold text-2xl">
                    Latest Feeds
                  </p>
                  <div className="flex flex-col gap-4">
                    {allBlogsByCategories.data?.recent_blogs.length > 0 &&
                      allBlogsByCategories.data?.recent_blogs
                        .slice(0, 4)
                        .map((item: any, index: number) => (
                          <Link
                            href={`/blog/${item.blog_id}`}
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
                              <p className="text-gray-700 font-semibold text-lg">
                                {item?.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>

                <div className="shadow-2xl p-4 mt-6 rounded-lg">
                  <p className="text-gray-700 font-semibold text-2xl">
                    Follow Us
                  </p>
                  <div className="flex gap-4 items-center py-2">
                    <Link
                      href="https://www.linkedin.com/company/nextcare-life/"
                      className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://twitter.com/NextcareLife"
                      className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr"
                      className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
                    >
                      <Instagram className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://www.facebook.com/share/19dqeCuNou/?mibextid=wwXIfr"
                      className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
                    >
                      <Facebook className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@NCL24283"
                      className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
                    >
                      <Youtube className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-4 animate-slide-up">
                {allBlogsByCategories.data.categories.map(
                  (cat: any, index: number) => {
                    const allBlogs =
                      cat?.sub_categories?.flatMap(
                        (subCat: any) => subCat?.blogs || []
                      ) || [];

                    const topBlogs = allBlogs.slice(0, 3);

                    return (
                      <div key={index}>
                        <div className="flex justify-between">
                          <p className="text-sky-800 text-xl font-medium">
                            {cat?.name}
                          </p>
                          <button
                            onClick={() => {
                              dispatch(setReduxCatData(cat));
                              router.push(`/blog/category/${cat.category_id}`);
                            }}
                            className="text-sky-800 flex items-center transition ease-in-out duration-200 hover:translate-x-1 hover:text-sky-700"
                          >
                            View More
                            <ChevronRight className="w-4 h-4 text-sky-800 transition-transform duration-200 ease-in-out hover:translate-x-1" />
                          </button>
                        </div>

                        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mt-2">
                          {topBlogs.map((blog: any, blogIndex: number) => (
                            <BlogItem blog={blog} key={blogIndex} />
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default BlogSegregation;
