"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const DownloadAbhaCard = () => {
  const { abhaImageUrl } = useSelector(
    (state: RootState) => state.abdm
  );

  return (
    <div>
      <div className="flex flex-col items-center p-6 space-y-4 bg-white">
        {abhaImageUrl ? (
          <>
            <div className="relative w-full h-[28rem]">
              <Image
                src={`data:image/png;base64,${abhaImageUrl}`}
                alt="Downloadable content"
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>
            <a
              href={`data:image/png;base64,${abhaImageUrl}`}
              download="abha-card.png"
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
            >
              Download ABHA Card
            </a>
          </>
        ) : (
          <p className="text-slate-600 text-sm">ABHA Image Not Found</p>
        )}
      </div>
    </div>
  );
};

export default DownloadAbhaCard;
