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
    `${baseUrl}users/get-user?user_id=00010ef8-5d5a-4372-a48d-27ac1a05bc71`
  );

  return {
    title: `${response.data?.detail?.name}`,
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
