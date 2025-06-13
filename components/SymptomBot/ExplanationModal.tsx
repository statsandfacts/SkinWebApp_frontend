import { setModalVisible } from "@/redux/slices/symptomBot.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import clsx from "clsx";

export default function ExplanationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();

  const { isModalOpen, ExplanationData } = useSelector(
    (state: RootState) => state.symptomBot
  ) as {
    isModalOpen: boolean;
    ExplanationData: {
      heading: string;
      content: any[];
      colors: string[];
      images: string[] | null;
    } | null;
  };

  console.log(ExplanationData);

  return (
    <>
      <Modal
        onClose={() => dispatch(setModalVisible(false))}
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 font-light">Explanation</ModalHeader>
          <ModalBody className="px-10">
            <h3 className="font-bold">{ExplanationData?.heading}</h3>
            <div
              className={
                ExplanationData?.images ? "grid grid-cols-2 gap-4" : ""
              }
            >
              {ExplanationData && ExplanationData?.content.length > 1 ? (
                ExplanationData?.content.map((data: any, index: number) => (
                  <div key={index}>
                    {ExplanationData.images && (
                      <Image
                        src={ExplanationData.images[index]}
                        alt="Headache Images"
                        width={350}
                        height={350}
                      />
                    )}
                    {/* <li
                      key={index}
                      className="font-semibold text-gray-700 list-disc"
                    >
                      {data}
                    </li> */}
                    {ExplanationData?.images ? <div className="mt-3">
                      <p className={clsx("font-bold", data?.color && data?.color)}>{data?.heading} :</p>
                      <p className="font-normal">{data?.desc}</p>
                    </div> : 
                    <div className={clsx("flex gap-2 mt-2 bg-slate-100 py-5 px-2 rounded-lg justify-center")}>
                      <p className={clsx("font-bold w-[30%]", data?.color && data?.color)}>{data?.heading}</p>
                      <p className="font-normal w-[65%] text-gray-600">{data?.desc}</p>
                    </div>
                    }
                  </div>
                ))
              ) : (
                <div>
                  <p className="font-bold">{ExplanationData?.content[0]?.heading}</p>
                  <p className="font-normal text-gray-600">{ExplanationData?.content[0]?.desc}</p>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={() => dispatch(setModalVisible(false))}
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
