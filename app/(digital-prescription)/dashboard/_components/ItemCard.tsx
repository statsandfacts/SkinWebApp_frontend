import Link from "next/link";

interface ItemCardProps {
  title: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, link, icon: Icon }) => {
  return (
    <Link href={link} passHref>
      <div
        className="bg-gray-50 p-8 rounded-xl shadow-md transform transition-all duration-500 hover:translate-y-0.5 hover:-translate-x-0.5 hover:scale-100 hover:shadow-xl hover:bg-sky-50
        hover:text-sky-800 cursor-pointer group relative overflow-hidden flex flex-col justify-center items-center"
      >
        <Icon className="w-10 h-10 text-sky-600 group-hover:text-sky-700 transition-colors duration-500" />
        <div className="mt-4 text-lg font-semibold text-slate-700 group-hover:text-sky-700 transition-all duration-500 ease-in-out">
          {title}
        </div>
        <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-sky-50 opacity-0 group-hover:opacity-20 transition-all duration-700"></span>
      </div>
    </Link>
  );
};

export default ItemCard;
