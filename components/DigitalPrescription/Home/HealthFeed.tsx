"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { fetchAllBlogsByCategory } from "@/redux/slices/digitalPrescription/blog.slice";
import dayjs from "dayjs";
import Link from "next/link";

const HealthFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { allBlogsByCategories } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    if (
      allBlogsByCategories.data &&
      (!allBlogsByCategories.data?.categories ||
        allBlogsByCategories.data?.categories.length <= 0)
    ) {
      dispatch(fetchAllBlogsByCategory());
    }
  }, [dispatch]);

  return (
    <motion.div
      className="p-6 sm:p-10 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Health Feed
      </motion.h1>
      <motion.h3
        className="text-lg sm:text-xl mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Explore health tips, insights, and digital healthcare trends —
        empowering you to make informed decisions.
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {allBlogsByCategories.data &&
          allBlogsByCategories.data?.recent_blogs &&
          allBlogsByCategories.data?.recent_blogs
            .slice(0, 3)
            .map((item: any, index: number) => (
              <motion.div
                key={index}
                className="w-full max-w-xs mx-auto flex flex-col items-center text-center bg-white p-4 rounded-lg "
                whileHover={{
                  y: -2,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {item?.image ? (
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={400}
                      height={350}
                      className="rounded-lg w-full object-cover"
                    />
                  ) : (
                    <div className="h-32 md:h-40 w-full bg-gray-200 rounded-lg"></div>
                  )}
                </motion.div>
                <h2 className="text-lg font-bold mt-4">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Posted on {dayjs(item?.date).format("DD MMMM YYYY")}
                </p>
                <motion.button
                  className="mt-3 px-4 py-2 bg-[#025687] text-white text-sm font-medium rounded-lg flex items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push(`/blog/${item?.slug}`);
                  }}
                >
                  Read More <ArrowRight size={20} className="ml-1" />
                </motion.button>
              </motion.div>
            ))}
      </motion.div>

      <Link
        href={"/blog"}
        className="mt-6 inline-flex items-center text-[#025687] text-lg font-semibold hover:text-[#013a5c] transition-colors duration-300"
      >
        Explore
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <ArrowRight size={20} />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default HealthFeed;
