'use client'
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

export default function Drawer({ isOpen }: any) {
    // const { onOpenChange, onOpen } = useDisclosure();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])
    const onClose = () => setOpen(false);
    return (
        <>
            <Modal
                isOpen={open}
                placement='bottom'
                size="3xl"

            >
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}