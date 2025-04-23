import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LatestBlogCarousel from "./LatestBlogCarousel";
import FollowUsBlogComponent from "./FollowUsBlogComponent";
import BlogItem from "./BlogItem";

const BlogSegregationHome = ({ blogsRes }: { blogsRes: any }) => {
  const recentBlogs = blogsRes?.recent_blogs || [];
  const categories = blogsRes?.categories || [];
  return (
    <section>
      <>
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-12">
          <div className="w-full md:w-2/3">
            <LatestBlogCarousel data={recentBlogs} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="shadow-2xl px-2 rounded-lg">
              <p className="text-gray-700 font-semibold text-2xl">
                Latest Feeds
              </p>
              <div className="flex flex-col">
                {recentBlogs.slice(0, 3).map((item: any, index: number) => (
                  <Link
                    href={`/health-feed/${item?.categories[0]?.slug}/${item?.sub_categories[0]?.slug}/${item.slug}`}
                    key={index}
                    className="hover:bg-sky-50 p-2 rounded-lg h-fit"
                  >
                    <div className="flex flex-col items-center md:items-start">
                      <div className="w-full max-w-xs md:max-w-sm">
                        {item?.image ? (
                          <Image
                            src={item?.image}
                            alt={item?.title}
                            width={300}
                            height={200}
                            className="rounded-lg w-full h-28 object-cover"
                          />
                        ) : (
                          <div className="h-32 md:h-40 w-full bg-gray-200 rounded-lg"></div>
                        )}
                      </div>
                      <p className="text-gray-700 font-medium text-sm md:text-base w-full text-left">
                        {item?.title?.length > 60
                          ? `${item?.title?.slice(0, 60)}...`
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
          {categories.map((cat: any, index: number) => {
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
                  <Link
                    href={"#"}
                    className="text-sky-800 flex items-center text-sm md:text-xl transition ease-in-out duration-200 hover:translate-x-1 hover:text-sky-700"
                  >
                    View More
                    <ChevronRight className="w-4 h-4 text-sky-800 transition-transform duration-200 ease-in-out hover:translate-x-1" />
                  </Link>
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
                            width={120}
                            height={120}
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
          })}
        </div>

        <div className="md:hidden">
          <FollowUsBlogComponent />
        </div>
      </>
    </section>
  );
};

export default BlogSegregationHome;
