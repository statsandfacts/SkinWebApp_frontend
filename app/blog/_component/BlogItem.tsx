"use client";
import { setABlog } from "@/redux/slices/digitalPrescription/blog.slice";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

interface BlogProps {
  blog: any;
  isReadMore?: boolean;
}

const BlogItem: React.FC<BlogProps> = ({ blog, isReadMore = true }) => {
  // console.log(blog);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Card className="rounded-lg shadow-lg h-full animate-fade-in">
      <CardBody className="overflow-visible p-2">
        <Image
          alt={blog?.title}
          className="object-cover cursor-pointer"
          src={blog?.image}
          onClick={(e) => {
            dispatch(setABlog(blog));
            router.push(
              `/blog/${blog?.categories[0].slug}/${blog?.sub_categories[0].slug}/${blog?.slug}`
            );
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setABlog(blog));
            router.push(
              `/blog/${blog?.categories[0].slug}/${blog?.sub_categories[0].slug}/${blog?.slug}`
            );
          }}
          className="text-lg text-gray-700 text-center sm:text-left font-bold w-full hover:text-sky-700 transition duration-200 hover:underline mt-1"
        >
          {blog?.title}
        </button>
        <small className="text-gray-600 line-clamp-2 w-full mt-1">
          {blog?.meta_description}
        </small>
      </CardBody>
      <CardFooter className="flex flex-col gap-2 p-4">
        {isReadMore && (
          <>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center justify-end w-full text-sky-700 text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setABlog(blog));
                router.push(
                  `/blog/${blog?.categories[0].slug}/${blog?.sub_categories[0].slug}/${blog?.slug}`
                );
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
