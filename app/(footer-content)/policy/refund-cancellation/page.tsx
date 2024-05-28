import React from 'react';

const Refund = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>
        Refund and Cancellation Policy
      </h1>
      <div className=' p-2 mt-5 rounded-md text-justify'>
        <ul>
          <li>
            We strive to ensure your satisfaction with our Nextcare.life
            application. However, if you are not entirely satisfied with your
            purchase, we offer a straightforward refund policy subject to the
            following conditions:
          </li>
        </ul>

        <ol className='space-y-4 list-decimal list-inside mt-5'>
          <li>
            <span className='text-lg font-bold'>Refund Policy</span>
            <ul className='space-y-1  list-disc list-inside w-full'>
              <li>
                Consultation Fees: Consultation fees are non-refundable once a
                consultation session has been initiated with one of our
                dermatologists. This includes any fees associated with scheduled
                or completed consultations.
              </li>
              <li>
                Subscription Plans: If you have subscribed to a recurring
                subscription plan, you may cancel future payments at any time.
                However, refunds will not be issued for the remaining period of
                the current subscription term. You will continue to have access
                to the application and its services until the end of the current
                billing cycle.
              </li>
              <li>
                Product Purchases: Refunds for skincare products purchased
                through our application will be provided only in cases of
                damaged or defective items. Please contact our customer support
                team within 5-7 days of receiving the product to initiate a
                return and refund process.
              </li>
              <li>
                Exceptions: Refunds may be granted at the discretion of our
                management team in exceptional circumstances, such as technical
                errors or service disruptions attributable to our platform.
              </li>
            </ul>
          </li>

          <li>
            <span className='text-lg font-bold'>Cancellation Policy</span>
            <ul className='space-y-1  list-disc list-inside w-full'>
              <li>
                Consultation Appointments: You may cancel or reschedule a
                consultation appointment up to [X] hours before the scheduled
                time without incurring any cancellation fees. Cancellations made
                within [X] hours of the appointment time may be subject to a
                cancellation fee.
              </li>
              <li>
                Subscription Plans: You may cancel your subscription plan at any
                time by accessing your account settings within the application.
                Once cancelled, future billing cycles will be discontinued, and
                access to premium features will cease at the end of the current
                subscription term.
              </li>
              <li>
                Automatic Renewal: If you have opted for automatic subscription
                renewal, please ensure to cancel the subscription before the
                renewal date to avoid being charged for the subsequent billing
                cycle.
              </li>
            </ul>
          </li>
          <li>
            <span className='text-lg font-bold'>Contact Us:</span>
            <ul className='space-y-1  list-disc list-inside w-full'>
              <li>
                If you have any questions or concerns regarding our Refund and
                Cancellation Policy, please contact our customer support team at
                [contact email] or [contact phone number]. We are committed to
                providing prompt assistance and resolving any issues you may
                encounter.
              </li>
            </ul>
          </li>
        </ol>
        <p className='mt-5'>
          Note: This Refund and Cancellation Policy is subject to change without
          prior notice. Please review this policy periodically for any updates
          or revisions.
        </p>
        <p>last update: 25-05-2024 </p>
      </div>
    </div>
  );
};

export default Refund;
