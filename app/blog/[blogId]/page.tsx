import { baseUrl } from "@/services/api.digitalPrescription.service";
import axios from "axios";
import type { Metadata } from "next";
import BlogOverview from "../_component/BlogOverView";
import { siteConfig } from "@/config/site";

const instance = axios.create({
  baseURL: baseUrl,
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: false,
  }),
});

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const { blogId } = params;
  const response = await instance.get(
    `${baseUrl}blogs/blog-by-slug?slug=${blogId}`
  );

  return {
    title: `${response.data?.title}`,
    description: response.data?.meta_description,
    keywords: response.data?.metatags,
    authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
    openGraph: {
      url: `https://nextcare.life/blog/${blogId}`,
      title: response.data?.title,
      description: response.data?.meta_description,
      siteName: siteConfig.name,
      images: [
        {
          url: response.data?.image || "/favicon/og_logo.png",
          alt: response.data?.title || "OpenGraph image",
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: response.data?.title || siteConfig.title,
      description: response.data?.meta_description || siteConfig.description,
      images: response.data?.image || "/favicon/og_logo.png",
      site: `https://nextcare.life/blog/${blogId}` || siteConfig.url,
      creator: siteConfig.name,
    },
  };
}

const BlogByIdPage = ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  return (
    <>
      <BlogOverview />
    </>
  );
};

export default BlogByIdPage;
