import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const ContactUs = () => {
  return (
    <div className='w-full'>
      <div className='text-center w-full'></div>
      <div className='max-w-screen-xl mt-2 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg'>
        <div className='flex flex-col justify-between'>
          <div>
            <h2 className='text-4xl lg:text-5xl font-bold leading-tight'>
              Get In Touch
            </h2>
            <div className='text-gray-700 mt-8'>
              Contact us for questions, technical assistance, or collaboration
              opportunities via the contact information provided.
              <ul className='mt-5 pr-10'>
                <li>
                  <a href='tel'>
                    <PhoneIcon className='inline-block w-6 h-6 mr-2' />
                    +1 (800) 555-1234
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <EnvelopeIcon className='inline-block w-6 h-6 mr-2' />
                    nextcare.life@gmail.com
                  </a>
                </li>
                <li>
                  <MapPinIcon className='inline-block w-6 h-6 mr-2' />
                  Campus 11, KIIT University, Patia, Bhubaneswar, Odisha 751024
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=''>
          <div>
            <span className='uppercase text-sm text-gray-600 font-bold'>
              Full Name
            </span>
            <input
              className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
              type='text'
              placeholder=''
            />
          </div>
          <div className='mt-8'>
            <span className='uppercase text-sm text-gray-600 font-bold'>
              Email
            </span>
            <input
              className='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
              type='text'
            />
          </div>
          <div className='mt-8'>
            <span className='uppercase text-sm text-gray-600 font-bold'>
              Message
            </span>
            <textarea className='w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'></textarea>
          </div>
          <div className='mt-8'>
            <button className='uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline'>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
