'use client';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal } from '@/redux/slices/loginModal.slice';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Drawer({ children, title, isCloseIcon }: any) {
  const { isModalOpen } = useSelector((state: any) => state.loginModal);
  const dispatch = useDispatch();
  const onClose = () => dispatch(setLoginModal(false));

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        placement='bottom-center'
        hideCloseButton={true}
        backdrop={'blur'}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1 relative bg-green-100'>
              <div className='flex w-full'>
                <div>{title}</div>
              </div>
              {isCloseIcon === false && (
                <button
                  className='absolute right-4 top-4 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-100'
                  onClick={onClose}>
                  <XMarkIcon className='w-5 h-5 text-gray-500' />
                </button>
              )}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
