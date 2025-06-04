import type { Metadata } from "next";
import BlogPage from "./_component/Blog";
import CommonHeroSection from "@/components/common/CommonHeroSection";

export const metadata: Metadata = {
  title: "Health Feed",
};

const Blog = () => {
  return (
    <>
      <CommonHeroSection
        key={"blog-hero"}
        title="Digital Health Feed"
        subtitle="Stay informed with the latest in digital health and wellness."
      />
      <BlogPage />
    </>
  );
};

export default Blog;
