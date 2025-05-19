"use client";

import CustomHeader from "@/components/Header/PublicLayoutHeader";
import BlogNavMenu from "./BlogNavMenu";
import BlogSegregation from "./BlogSegregation";
import SearchByTitle from "./SearchByTitle";

const BlogPage = () => {
  return (
    <>
      <div className="p-10 md:px-40">
        <BlogNavMenu />
        <SearchByTitle />

        <BlogSegregation />
      </div>
    </>
  );
};

export default BlogPage;
