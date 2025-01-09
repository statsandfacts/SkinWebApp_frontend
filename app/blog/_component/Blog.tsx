"use client";

import { useEffect  } from "react";
import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllBlogs } from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";
import CustomHeader from "@/components/Header/PublicLayoutHeader";
import BlogNavMenu from "./BlogNavMenu";

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, errorMessage, loading } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (!data || data.length <= 0) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch]);

  return (
    <>
      <div className="p-10 md:px-40">
        <CustomHeader
          header="Digital Health Feed"
          subHeader="Stay informed with the latest in digital health and wellness."
          imageURL="/vector/health_feed.png"
        />

        <BlogNavMenu />

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
