"use client";
import { setABlog } from "@/redux/slices/digitalPrescription/blog.slice";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

interface BlogProps {
  blog: any;
  isReadMore?: boolean;
}

const BlogItem: React.FC<BlogProps> = ({ blog, isReadMore = true }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Card className="rounded-lg shadow-lg h-full animate-fade-in">
      <CardBody className="overflow-visible p-0">
        <Image
          alt={blog?.title}
          className="object-cover cursor-pointer"
          src={blog?.image}
          onClick={(e) => {
            dispatch(setABlog(blog));
            router.push(`/blog/${blog?.slug}`);
          }}
        />
      </CardBody>
      <CardFooter className="flex flex-col space-y-2 p-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setABlog(blog));
            router.push(`/blog/${blog?.slug}`);
          }}
          className="text-lg text-gray-700 text-left font-bold"
        >
          {blog?.title}
        </button>
        {isReadMore && (
          <>
            <small className="text-gray-600 line-clamp-2 w-full">
              {blog?.meta_description}
            </small>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center justify-end w-full text-sky-700 text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setABlog(blog));
                router.push(`/blog/${blog?.slug}`);
              }}
            >
              READ MORE <ChevronRightIcon className="h-4 w-4 ml-1" />
            </motion.button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogItem;
