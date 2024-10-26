"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface BlogOverviewProps {}

const BlogOverview: React.FC<BlogOverviewProps> = ({}) => {
  const { singleBlog } = useSelector(
    (state: RootState) => state.blogs
  );
  const blog = {
    blog_id: 1,
    title:
      "Exploring the Beauty of Nature: A Journey Through Majestic Landscapes and Serene Wilderness Escapes",
    content: `<p><span style="color: rgb(51, 51, 51);">In the ever-evolving&nbsp;</span><a href="https://hyscaler.com/insights/develop-a-mobile-app-with-12-steps-to-success/" rel="noopener noreferrer" target="_blank" style="color: rgb(51, 51, 51);">mobile app development</a><span style="color: rgb(51, 51, 51);">&nbsp;landscape, developers often face the challenge of choosing between native development for performance or cross-platform solutions for flexibility. iOS developers typically rely on Swift to build high-performance apps. However, with tools like Ionic Capacitor, developers no longer need to choose one.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">Ionic Capacitor simplifies cross-platform development by allowing developers to build mobile apps using web technologies like HTML, CSS, and JavaScript while seamlessly accessing native device features. It also allows adding custom native code in Swift for iOS, making it the perfect bridge between web and native development.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">In this article, we’ll dive into&nbsp;</span><strong style="color: rgb(51, 51, 51);">5 key reasons</strong><span style="color: rgb(51, 51, 51);">&nbsp;why Ionic Capacitor makes iOS app development easier, including how it stands apart from traditional native languages like Swift and Kotlin</span></p><p><br></p><h2>1.&nbsp;<strong>Access</strong>&nbsp;Native Functionality with Built-in Plugins</h2><p>Ionic Capacitor comes with a range of pre-built plugins that allow easy access to native device features without the need to write native code. These plugins cover essential features such as:</p><ul><li>Camera</li><li>Geolocation</li><li>Push notifications</li><li>File system access</li><li>Haptics</li></ul><h2>2. Cross-platform development with a Single Codebase</h2><p>One of the strongest advantages of Ionic Capacitor is its ability to build cross-platform apps for iOS, Android, and the web using a&nbsp;<strong>single codebase</strong>. This eliminates the need to maintain separate native projects for each platform, drastically improving efficiency and reducing potential bugs.</p><p>With Capacitor, developers can:</p><ul><li>Write code once and deploy it across multiple platforms.</li><li>Focus on app logic and UI/UX rather than dealing with platform-specific challenges.</li><li>Use Capacitor plugins to ensure that device-specific functionality works seamlessly across platforms.</li></ul><p><br></p>`,
    date: "2024-10-25",
    image: "/blog_test_image2.jpg",
    metaTags: ["nature", "travel", "photography", "outdoors"],
    metaDescription:
      "Discover the beauty of nature and explore some of the world's most breathtaking landscapes.",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mb-6 border rounded-lg shadow-lg bg-white">
      <div className="relative w-full h-auto mb-4">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="responsive"
          width={700}
          height={400}
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <span className="text-sm">
            {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        {blog.metaTags.map((tag, index) => (
          <span
            key={index}
            className="bg-teal-200 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="text-gray-700 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogOverview;
