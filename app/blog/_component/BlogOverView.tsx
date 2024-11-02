"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import ManageComments from "./ManageComments";
import { fetchBlogDtls } from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";

interface BlogOverviewProps {}

const BlogOverview: React.FC<BlogOverviewProps> = ({}) => {
  const { blogId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { singleBlog, sbErrorMessage, sbLoading } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (!singleBlog) {
      dispatch(fetchBlogDtls(blogId));
    }
  }, [singleBlog]);

  return (
    <>
      {sbLoading ? (
        <Loader />
      ) : sbErrorMessage ? (
        <p className="p-10 md:px-40 text-red-500">{sbErrorMessage}</p>
      ) : singleBlog ? (
        <div className="max-w-5xl mx-auto p-6 mb-6 border rounded-lg shadow-lg bg-white">
          <div className="relative w-full h-auto mb-4">
            <Image
              src={singleBlog?.image}
              alt={singleBlog?.title}
              layout="responsive"
              width={700}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
              <h1 className="text-3xl font-bold mb-2">{singleBlog?.title}</h1>
              <span className="text-sm">
                {new Date(singleBlog?.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap mb-4">
            {singleBlog?.categories.map((tag: any, index: number) => (
              <span
                key={index}
                className="bg-sky-200 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
              >
                {tag?.name}
              </span>
            ))}
          </div>

          <div
            className="text-gray-700 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: singleBlog.content }}
          />

          <ManageComments />
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default BlogOverview;
