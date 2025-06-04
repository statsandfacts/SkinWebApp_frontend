import { setExplanationModal } from "@/redux/slices/symptomBot.slice";
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

  
  export default function ExplanationModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useDispatch();

    const { isModalOpen, ExplanationData } = useSelector(
        (state: RootState) => state.symptomBot
      ) as { isModalOpen: boolean; ExplanationData: { header: string; content: string[]; colors: string[]; images: string[] | null } | null };

    //   console.log(ExplanationData);
  
    return (
      <>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal
          onClose={() => dispatch(setExplanationModal(false))}
          isOpen={isModalOpen}
          onOpenChange={onOpenChange}
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Explanation</ModalHeader>
                <ModalBody className="px-10">
                    <h3 className="font-bold">{ExplanationData?.header}</h3>
                    <div className={ExplanationData?.images ? "grid grid-cols-2 gap-4" : ""}>
                    {ExplanationData && ExplanationData?.content.length > 1 ? ExplanationData?.content.map((data, index) =>(
                        <div key={index}>
                            {ExplanationData.images && <Image 
                                src={ExplanationData.images[index]}
                                alt="Headache Images"
                                width={350}
                                height={350}
                            />}
                            <li key={index} className={`${ExplanationData?.colors[index]} list-none pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-black mb-2`}>
                                {data}
                            </li>
                        </div>
                    )): (<p>{ExplanationData?.content[0]}</p>)}
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={() => dispatch(setExplanationModal(false))}>
                    Okay
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
                    Okay
                  </Button> */}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  