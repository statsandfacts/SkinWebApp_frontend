"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import ManageComments from "./ManageComments";
import { fetchBlogDtls } from "@/redux/slices/digitalPrescription/blog.slice";
import Loader from "@/components/Loader";
import dayjs from "dayjs";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Twitter,
  Linkedin,
  MessageSquare,
  FacebookIcon,
  CopyIcon,
  LoaderIcon,
} from "lucide-react";
import BlogItem from "./BlogItem";
import styles from "./BlogContent.module.css";
import QuizClient from "./QuizClient";
import RelatedCalculator from "@/components/Blog/RelatedCalculator";
import { getRelatedBlogs } from "@/services/api.digitalPrescription.service";

interface BlogOverviewProps {}

const BlogOverview: React.FC<BlogOverviewProps> = ({}) => {
  const router = useRouter();
  const { subCategoryId, blogId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [rbLoading, setRbLoading] = useState<boolean>(false);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  const { singleBlog, sbErrorMessage, sbLoading } = useSelector(
    (state: RootState) => state.blogs
  );

  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  useEffect(() => {
    // if (!singleBlog) {
    dispatch(fetchBlogDtls(blogId));
    // }
    getAllRelatedBlogs();
  }, []);

  const getAllRelatedBlogs = () => {
    setRbLoading(true);
    getRelatedBlogs(subCategoryId, blogId)
      .then((response) => {
        setRelatedBlogs(response);
      })
      .catch((error) => {
        console.error("Error fetching related blogs:", error);
      })
      .finally(() => setRbLoading(false));
  };

  const blogUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(
    singleBlog?.title || "Check out this blog!"
  );

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(blogUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const filterData = (dataForFilter: any) => {
    const targetCategoryName = singleBlog?.categories?.[0]?.name;

    if (
      !dataForFilter ||
      !Array.isArray(dataForFilter) ||
      !targetCategoryName
    ) {
      return [];
    }

    const relatedPosts = dataForFilter.filter(
      (item: any) =>
        item?.categories?.[0]?.name === targetCategoryName &&
        item?.blog_id !== blogId
    );

    return relatedPosts ?? [];
  };

  return (
    <>
      {sbLoading ? (
        <Loader />
      ) : sbErrorMessage ? (
        <p className="p-10 md:px-40 text-red-500">{sbErrorMessage}</p>
      ) : singleBlog ? (
        <div className="max-w-screen-2xl mx-auto p-6 mb-6 bg-white">
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
            Back
          </button>

          <article className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-4/5">
              <div className="mb-4">
                {singleBlog?.image ? (
                  <Image
                    src={singleBlog?.image}
                    alt={singleBlog?.title}
                    layout="responsive"
                    width={700}
                    height={400}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="h-40"></div>
                )}
              </div>

              <p className="text-sm mb-4 text-slate-400">
                {dayjs(singleBlog?.date).format("DD MMMM YYYY")}
              </p>

              {/* add Share Social media links */}
              <div className="flex gap-4 items-center mb-6">
                <span className="text-slate-600 text-sm">Share:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${blogUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/?text=${shareText} ${blogUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <MessageSquare className="h-4 w-4" />{" "}
                </a>
                <button
                  onClick={handleCopyUrl}
                  className="p-2 rounded-full bg-gray-300 text-slate-600 hover:bg-gray-400 transition"
                >
                  <CopyIcon className="h-4 w-4" />
                </button>
                {copySuccess && (
                  <span className="text-slate-600 text-sm">Copied!</span>
                )}
              </div>

              {singleBlog?.categories && (
                <div className="flex flex-wrap mb-4">
                  {singleBlog?.categories.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="bg-sky-200 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                    >
                      {tag?.name}
                    </span>
                  ))}
                  {singleBlog?.sub_categories.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="bg-sky-200 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                    >
                      {tag?.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-lg sm:text-xl md:text-4xl font-bold mb-8">
                {singleBlog?.title}
              </h1>

              <div className={styles.content}>
                {singleBlog?.content === "quiz" &&
                singleBlog?.quiz_questions?.length > 0 ? (
                  <QuizClient questions={singleBlog.quiz_questions} />
                ) : (
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                  />
                )}
              </div>

              <ManageComments />
            </div>
            <div className="w-full md:w-1/5 mt-3 md:mt-0">
              {rbLoading ? (
                <LoaderIcon className="h-4 animate-spin flex w-full justify-center" />
              ) : relatedBlogs ? (
                <div className="h-[650px] overflow-y-auto border rounded-lg p-3">
                  {/* Heading moved inside the card */}
                  <p className="font-semibold text-slate-700 text-center mb-3">
                    Related Posts
                  </p>

                  <div className="grid gap-5 grid-cols-1">
                    {relatedBlogs.length > 0 ? (
                      relatedBlogs.map((blog: any, index: number) => (
                        <BlogItem blog={blog} key={index} isReadMore={false} />
                      ))
                    ) : (
                      <p className="text-center text-slate-400 font-light text-sm">
                        Related post not found
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {singleBlog?.related_key_word && (
                <RelatedCalculator keywords={[singleBlog?.related_key_word]} />
              )}
            </div>
          </article>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default BlogOverview;
