"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { fetchAllCategories } from "@/redux/slices/digitalPrescription/blog.slice";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const BlogNavMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { categories } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    if (!categories.data || categories.data.length <= 0) {
      dispatch(fetchAllCategories());
    }
  }, [categories]);

  return (
    <>
      <section className="flex flex-wrap justify-start sm:justify-end gap-3 mb-5 animate-slide-up">
        {categories?.loading ? (
          <div className="w-full flex justify-center items-center font-light text-slate-400 text-xs">
            <LoaderIcon className="animate-spin mr-1 h-4 w-4" />
            Fetching Categories ...
          </div>
        ) : categories?.errorMessage ? (
          <p className="p-10 md:px-40 text-red-500 animate-fade-in">
            {categories?.errorMessage}
          </p>
        ) : (
          <>
            <Navbar>
              <NavbarContent className="overflow-x-auto w-full max-w-[100%]">
                {categories?.data?.map(
                  (
                    category: {
                      category_id: string;
                      name: string;
                      sub_categories: [];
                    },
                    index: number
                  ) => (
                    <Dropdown key={index}>
                      <NavbarItem>
                        <DropdownTrigger>
                          <Button
                            disableRipple
                            className="p-0 bg-transparent data-[hover=true]:bg-transparent text-sky-800 font-semibold"
                            endContent={
                              <ChevronDown className="h-4 w-4 text-sky-800" />
                            }
                            radius="sm"
                            variant="light"
                          >
                            {category?.name}
                          </Button>
                        </DropdownTrigger>
                      </NavbarItem>
                      <DropdownMenu
                        aria-label="ACME features"
                        className="w-[250px]"
                        itemClasses={{
                          base: "gap-4",
                        }}
                      >
                        {category?.sub_categories.map(
                          (
                            item: {
                              sub_category_id: string;
                              name: string;
                            },
                            index: number
                          ) => (
                            <DropdownItem
                              key={index}
                              onClick={() => {
                                router.push(
                                  `/blog/sub-category/${item.sub_category_id}`
                                );
                              }}
                            >
                              {item?.name}
                            </DropdownItem>
                          )
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  )
                )}
              </NavbarContent>
            </Navbar>
          </>
        )}
      </section>
    </>
  );
};

export default BlogNavMenu;
