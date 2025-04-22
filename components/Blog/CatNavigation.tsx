import Link from "next/link";

interface SubCategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  sub_categories: SubCategory[];
}

interface CatNavigationProps {
  categories: Category[];
}

export default function CatNavigation({ categories }: CatNavigationProps) {
  return (
    <div className="mb-10 border-b pb-4">
      <div className="flex justify-center">
        <nav className="flex flex-wrap gap-6 relative z-10">
          {categories.map((cat) => (
            <div key={cat.slug} className="relative group">
              <button className="text-sky-700 font-semibold hover:underline">
                {cat.name}
              </button>

              <div className="absolute left-0 mt-2 w-48 shadow-md bg-white border rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                <ul className="py-2 px-4 space-y-1 text-sm text-gray-700">
                  {cat.sub_categories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        // href={`/health-feed/category/${cat.slug}/${sub.slug}`}
                        href={"#"}
                        className="block hover:text-sky-600"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
