import { baseUrl } from "@/services/api.digitalPrescription.service";
import axios from "axios";
import type { Metadata } from "next";
// import BlogOverview from "../_component/BlogOverView";
import BlogOverview from "../../../_component/BlogOverView";
import { siteConfig } from "@/config/site";

const instance = axios.create({
  baseURL: `https://nextcare.life/api/api/stage1/`,
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

  try {
    const response = await instance.get(
      `https://nextcare.life/api/api/stage1/blogs/blog-by-slug/?slug=${blogId}`
    );
    const data = response.data;

    return {
      title: data?.title || "Blog | NextCare",
      description: data?.meta_description || siteConfig.description,
      keywords: data?.metatags || [],
      authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
      openGraph: {
        url:
          `https://nextcare.life/blog/${data?.categories[0]?.slug}/${data?.sub_categories[0]?.slug}/${blogId}` ||
          `https://nextcare.life/blog`,
        title: data?.title,
        description: data?.meta_description,
        siteName: siteConfig.name,
        images: [
          {
            url: data?.image || "/favicon/og_logo.png",
            alt: data?.title || "OpenGraph image",
          },
        ],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: data?.title || siteConfig.title,
        description: data?.meta_description || siteConfig.description,
        images: data?.image || "/favicon/og_logo.png",
        site:
          `https://nextcare.life/blog/${data?.categories[0]?.slug}/${data?.sub_categories[0]?.slug}/${blogId}` ||
          `https://nextcare.life/blog`,
        creator: siteConfig.name,
      },
    };
  } catch (error: any) {
    console.error("generateMetadata error:", error?.message);

    return {
      title: "Blog Not Found",
      description: "This blog does not exist or has been removed.",
    };
  }
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
