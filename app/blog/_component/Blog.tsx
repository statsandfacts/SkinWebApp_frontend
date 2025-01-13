"use client";

import CustomHeader from "@/components/Header/PublicLayoutHeader";
import BlogNavMenu from "./BlogNavMenu";
import BlogSegregation from "./BlogSegregation";

const BlogPage = () => {
  return (
    <>
      <div className="p-10 md:px-40">
        <CustomHeader
          header="Digital Health Feed"
          subHeader="Stay informed with the latest in digital health and wellness."
          imageURL="/vector/health_feed.png"
        />

        {/* <BlogNavMenu />

        <BlogSegregation /> */}
      </div>
    </>
  );
};

export default BlogPage;
