import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface BlogProps {
  blog: any;
  isReadMore?: boolean;
}

const BlogItem: React.FC<BlogProps> = ({ blog, isReadMore = true }) => {
  return (
    <Card className="rounded-lg shadow-lg h-full animate-fade-in">
      <CardBody className="overflow-visible p-0">
        <Link
          href={`/health-feed/${blog?.categories[0]?.slug}/${blog?.sub_categories[0]?.slug}/${blog.slug}`}
        >
          <Image
            alt={blog?.title}
            className="object-cover cursor-pointer"
            src={blog?.image}
          />
        </Link>
      </CardBody>
      <CardFooter className="flex flex-col space-y-2 p-4">
        <Link
          href={`/health-feed/${blog?.categories[0]?.slug}/${blog?.sub_categories[0]?.slug}/${blog.slug}`}
          className="text-lg text-gray-700 text-left font-bold"
        >
          {blog?.title}
        </Link>
        {isReadMore && (
          <>
            <small className="text-gray-600 line-clamp-2 w-full">
              {blog?.meta_description}
            </small>
            <Link
              href={`/health-feed/${blog?.categories[0]?.slug}/${blog?.sub_categories[0]?.slug}/${blog.slug}`}
              className="flex items-center justify-end w-full text-sky-700 text-sm font-medium transition-transform duration-200 hover:translate-x-1"
            >
              READ MORE <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogItem;
