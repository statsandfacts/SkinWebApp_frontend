// components/ui/Breadcrumbs.tsx
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center space-x-1">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {i < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
