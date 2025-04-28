"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/Home/EmblaCarouselArrowButtons";
import {
  DotButton,
  useDotButton,
} from "@/components/Home/EmblaCarouselDotButton";
import Link from "next/link";

interface LatestBlogCarouselProps {
  data: any;
}

const LatestBlogCarousel: React.FC<LatestBlogCarouselProps> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3000 })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.slideNodes();
    }
  }, [emblaApi]);

  return (
    <section className=" overflow-hidden p-0">
      <div className="embla w-full" ref={emblaRef}>
        <div className="embla__container">
          {data &&
            data.length > 0 &&
            data.slice(0, 7).map((item: any, index: number) => (
              <div className="embla__slide" key={index}>
                <Link
                  href={`/health-feed/${item?.categories[0]?.slug}/${item?.sub_categories[0]?.slug}/${item.slug}`}
                >
                  <div className="mb-4">
                    {item?.image ? (
                      <Image
                        src={item?.image}
                        alt={item?.title}
                        layout="responsive"
                        width={700}
                        height={400}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="h-40"></div>
                    )}
                  </div>
                  <p className="text-gray-700 font-semibold text-2xl">
                    {item?.title}
                  </p>
                  <small className="text-gray-600 line-clamp-2 w-full">
                    {item?.meta_description}
                  </small>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots hidden md:flex">
          {scrollSnaps.map((_: any, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogCarousel;
