import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import CopyButton from "@/components/Blog/CopyButton";
import ManageBlogComments from "@/components/Blog/ManageBlogComments";
import RelatedBlogs from "@/components/Blog/RelatedBlogs";
import {
  getAllBlogsByCategory,
  getBlogDtlsBySlug,
} from "@/services/api.digitalPrescription.service";
import dayjs from "dayjs";
import {
  CopyIcon,
  FacebookIcon,
  Linkedin,
  MessageSquare,
  Twitter,
} from "lucide-react";
import Image from "next/image";

interface BlogPageProps {
  params: { slug: string };
}

// ✅ ISR — regenerate every hour
export const revalidate = 3600;

// ✅ Pre-render dynamic routes
export async function generateStaticParams() {
  const res = await getAllBlogsByCategory();
  const blogs = res?.recent_blogs;

  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

// ✅ SEO-friendly metadata
export async function generateMetadata({ params }: BlogPageProps) {
  try {
    const res = await getBlogDtlsBySlug(params.slug);
    const blog = res;

    return {
      title: blog.title,
      description: blog.meta_description,
      openGraph: {
        title: blog.title,
        description: blog.meta_description,
        images: [blog.image],
      },
    };
  } catch (error) {
    return {
      title: "Blog not found",
      description: "No blog found for this slug.",
    };
  }
}

// ✅ Blog Detail Page Component
export default async function BlogDetailPage({ params }: BlogPageProps) {
  try {
    const blog = await getBlogDtlsBySlug(params.slug);

    const categorySlug = blog?.categories?.[0]?.slug || "category";
    const subCategorySlug = blog?.sub_categories?.[0]?.slug || "subcategory";
    const blogUrl = `https://nextcare.life/health-feed/${categorySlug}/${subCategorySlug}/${blog.slug}`;
    const shareText = encodeURIComponent(blog?.title || "");

    return (
      <article className="max-w-screen-2xl mx-auto prose p-6 mb-6 bg-white">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Health Feed", href: "/health-feed" },
          ]}
        />

        <article className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-4/5 ">
            <div className="mb-4">
              {blog?.image ? (
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  layout="responsive"
                  width={700}
                  height={400}
                  className="rounded-lg"
                />
              ) : (
                <div className="h-40"></div>
              )}
            </div>

            <p className="text-sm mb-4 text-slate-400">
              {dayjs(blog?.date).format("DD MMMM YYYY")}
            </p>

            <div className="flex gap-4 items-center mb-6">
              <span className="text-slate-600 text-sm">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${blogUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/?text=${shareText} ${blogUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
              >
                <MessageSquare className="h-4 w-4" />{" "}
              </a>
              <CopyButton url={blogUrl} />
            </div>

            {blog?.sub_categories && (
              <div className="flex flex-wrap mb-4">
                {blog?.sub_categories.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="bg-sky-200 text-sky-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                  >
                    {tag?.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-lg sm:text-xl md:text-4xl font-bold mb-8">
              {blog?.title}
            </h1>

            <div className="blog_content">
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>

            <ManageBlogComments />
          </div>
          <div className="w-full md:w-1/5 mt-3 md:mt-0 ">
            <div className="h-[650px] overflow-y-auto border rounded-lg p-3">
              <p className="font-semibold text-slate-700 text-center mb-3">
                Related Posts
              </p>

              <RelatedBlogs />
            </div>
          </div>
        </article>
      </article>
    );
  } catch (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-500">
        Blog not found.
      </div>
    );
  }
}
