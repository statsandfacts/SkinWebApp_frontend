import { baseUrl } from "@/services/api.digitalPrescription.service";
import axios from "axios";
import type { Metadata } from "next";
import BlogOverview from "../_component/BlogOverView";

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
    `${baseUrl}blogs/?blog_id=${blogId}`
  );

  return {
    title: `${response.data?.title}`,
    description: response.data?.meta_description,
    keywords: response.data?.metatags,
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
