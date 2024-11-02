import type { Metadata } from "next";
import BlogPage from "./_component/Blog";

export const metadata: Metadata = {
  title: "Health News",
};

const Blog = () => {
  return (
    <>
      <BlogPage />
    </>
  );
};

export default Blog;
