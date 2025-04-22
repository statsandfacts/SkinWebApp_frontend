import BlogHeader from "@/components/Blog/BlogHeader";
import BlogSegregationHome from "@/components/Blog/BlogSegregationHome";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import CatNavigation from "@/components/Blog/CatNavigation";
import SearchByTitle from "@/components/Blog/SearchBlogByTitle";
import {
  getAllBlogsByCategory,
  getAllCategories,
} from "@/services/api.digitalPrescription.service";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Health Feed",
    description: "Catch up with our latest blog posts and stories.",
  };
}

export default async function BlogListPage() {
  const [blogsRes, categories] = await Promise.all([
    getAllBlogsByCategory(),
    getAllCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Health Feed", href: "/health-feed" },
        ]}
      />
      <SearchByTitle />

      <CatNavigation categories={categories} />

      <BlogSegregationHome blogsRes={blogsRes} />
    </main>
  );
}
