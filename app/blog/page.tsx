import type { Metadata } from "next";
import BlogItem from "./_component/BlogItem";

export const metadata: Metadata = {
  title: "Blogs",
};

const image =
  "https://s3.us-east-2.amazonaws.com/nextcare.life/prescription-test-upload/9040433820_20241025122615.jpg";
const blogPosts = [
  {
    blog_id: 1,
    title:
      "Exploring the Beauty of Nature: A Journey Through Majestic Landscapes and Serene Wilderness Escapes",
    content:
      "Nature offers us an endless bounty of wonders, from majestic mountains to serene lakes...",
    date: "2024-10-25",
    image,
    metaTags: ["nature", "travel", "photography", "outdoors"],
    metaDescription:
      "Discover the beauty of nature and explore some of the world's most breathtaking landscapes.",
  },
  {
    blog_id: 2,
    title:
      "Top 10 Tips for Healthy Eating and Sustainable Choices for a Better Lifestyle",
    content:
      "Eating healthy is all about making the right choices. Here are the top 10 tips to help you...",
    date: "2024-09-15",
    image,
    metaTags: ["health", "nutrition", "wellness", "food"],
    metaDescription:
      "Learn the best tips for healthy eating and maintaining a balanced diet for a better lifestyle.",
  },
  {
    blog_id: 3,
    title: "A Beginner’s Guide to Yoga",
    content:
      "Yoga has been practiced for centuries as a means of strengthening the mind and body. In this guide...",
    date: "2024-08-10",
    image,
    metaTags: ["yoga", "fitness", "mindfulness", "beginner"],
    metaDescription:
      "Get started with yoga through this beginner-friendly guide and learn the basics of this ancient practice.",
  },
  {
    blog_id: 4,
    title: "The Future of Artificial Intelligence",
    content:
      "Artificial Intelligence is rapidly evolving, shaping the way we live and work. This article explores...",
    date: "2024-07-05",
    image,
    metaTags: ["AI", "technology", "innovation", "future"],
    metaDescription:
      "Explore the future of artificial intelligence and how it will impact various industries and daily life.",
  },
];

const Blog = () => {
  return (
    <div className="p-10 md:px-40">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {blogPosts.map((blog: any, index: number) => (
          <BlogItem blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
