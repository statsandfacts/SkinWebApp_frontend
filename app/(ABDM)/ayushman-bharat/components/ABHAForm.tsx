"use client";
import {
  createAbhaNumber,
  downloadAbha,
  downloadAbhaCard,
  generateOtpThroughAadhar,
  linkAbdmMobile,
  updateAbdmLinkedMobileOtp,
} from "@/services/api.abdm.service";
import { Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

const ABHAForm: React.FC = () => {
  const [inputValues, setInputValues] = useState<string[]>(["", "", ""]);
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [mobileNo, setMobileNo] = useState<string | number>("");
  const [otpValuesLinkedMob, setOtpValuesLinkedMob] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isOptSendSuccessfully, setIsOptSendSuccessfully] =
    useState<boolean>(false);
  const [isLinkedMobOptSend, setIsLinkedMobOptSend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [txnId, setTxnId] = useState<string>("");

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const otpRefs = React.useMemo(
    () => Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>()),
    []
  );

  const otpLinkedMobRefs = React.useMemo(
    () => Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>()),
    []
  );

  const handleInputChange = (index: number, value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);

      const isComplete = newValues.every((val) => val.length === 4);
      setIsButtonEnabled(isComplete);

      if (value.length === 4 && index < 2) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d{0,1}$/.test(value)) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOtpValues(newValues);

      const isComplete = newValues.every((val) => val.length === 1);
      setIsButtonEnabled(isComplete);

      if (value.length === 1 && index < 5) {
        otpRefs[index + 1].current?.focus();
      } else if (value === "" && index > 0) {
        otpRefs[index - 1].current?.focus();
      }
    }
  };

  const handleLinkedMobOtpChange = (index: number, value: string) => {
    if (/^\d{0,1}$/.test(value)) {
      const newValues = [...otpValuesLinkedMob];
      newValues[index] = value;
      setOtpValuesLinkedMob(newValues);

      const isComplete = newValues.every((val) => val.length === 1);
      setIsButtonEnabled(isComplete);

      if (value.length === 1 && index < 5) {
        otpLinkedMobRefs[index + 1].current?.focus();
      } else if (value === "" && index > 0) {
        otpLinkedMobRefs[index - 1].current?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLinkedMobOptSend) {
      linkMobile();
      return;
    } else if (isOptSendSuccessfully) {
      const otp = otpValues.join("");
      if (!mobileNo) {
        setError("Mobile Number is required.");
        toast.warning("Mobile Number is required.");
        return;
      }
      setIsButtonEnabled(false);
      setIsLoading(true);
      createAbhaNumber({ txnId, otpVal: otp, mobile: mobileNo })
        .then((res) => {
          console.log("response----------------", res);
          setMessage(res?.message);
          if (!res?.ABHAProfile?.mobile) {
            getOtpForLinkMobile();
          } else {
            DownloadAbhaCard(res?.tokens?.token);
          }
        })
        .catch((error) => {
          setError(error?.response?.data?.detail || "OTP generate failed.");
        })
        .finally(() => {
          setIsLoading(false);
          setIsButtonEnabled(false);
        });
    } else {
      const healthId = inputValues.join("");
      if (isButtonEnabled) {
        console.log("Aadhaar Number Submitted:", healthId);

        setIsButtonEnabled(false);
        setIsLoading(true);
        generateOtpThroughAadhar({ loginId: healthId })
          .then((response) => {
            setIsButtonEnabled(true);
            console.log("response ==========", response);
            setMessage(response?.message);
            setTxnId(response?.txnId);
            setIsOptSendSuccessfully(true);
          })
          .catch((error) => {
            setError(error?.response?.data?.detail || "OTP generate failed.");
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const getOtpForLinkMobile = () => {
    updateAbdmLinkedMobileOtp({ txnId, loginId: mobileNo })
      .then((res) => {
        setMessage(res?.message);
        setTxnId(res?.txnId);
        setIsLinkedMobOptSend(true);
      })
      .catch((error) => {
        setError(error?.response?.data?.detail || "OTP generate failed.");
      })
      .finally(() => {
        setIsLoading(false);
        setIsButtonEnabled(false);
      });
  };

  const linkMobile = () => {
    setIsButtonEnabled(false);
    setIsLoading(true);
    linkAbdmMobile({
      txnId,
      otpVal: otpValuesLinkedMob.join(""),
    })
      .then((res) => {
        setMessage(res?.message);
        setMessage("");
      })
      .catch((error) => {
        setError(
          error?.response?.data?.detail || "Mobile Number Linked Failed."
        );
      })
      .finally(() => {
        setIsLoading(false);
        setIsButtonEnabled(false);
      });
  };

  const DownloadAbhaCard = (token: any) => {
    downloadAbha(token)
      .then((res) => {
        console.log("response----------------", res);
      })
      .catch((error) => {
        setError(error?.response?.data?.detail || "Download failed.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 w-full">
      {/* {!true ? ( */}
      {!isOptSendSuccessfully ? (
        <div className="mb-4">
          <label
            htmlFor="healthId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter Your Aadhaar Number
          </label>
          <div className="flex space-x-2">
            {inputValues.map((value, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={4}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="xxxx"
                className="block w-1/3 border border-gray-300 rounded-md p-3 text-center shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-base"
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
      ) : (
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter the 6-digit OTP
          </label>
          {message && <p className="text-sm py-2 text-gray-700">{message}</p>}
          {error && <p className="text-sm text-red-700 mb-2">{error}</p>}
          <div className="flex space-x-2">
            {isLinkedMobOptSend ? (
              <>
                {otpValuesLinkedMob.map((value, index) => (
                  <input
                    key={index}
                    ref={otpLinkedMobRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) =>
                      handleLinkedMobOtpChange(index, e.target.value)
                    }
                    placeholder="-"
                    className="block w-1/6 border border-gray-300 rounded-md p-3 text-center shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-base"
                  />
                ))}
              </>
            ) : (
              <>
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    placeholder="-"
                    className="block w-1/6 border border-gray-300 rounded-md p-3 text-center shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-base"
                  />
                ))}
              </>
            )}
          </div>
          {!isLinkedMobOptSend && (
            <div className="mt-4">
              <label
                htmlFor="mobile_number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter the Mobile Number you would like to link with ABHA
              </label>
              <input
                type="number"
                placeholder="Mobile Number"
                className="block w-full border border-gray-300 rounded-md p-3 text-left shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-base"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
          )}
        </div>
      )}
      <button
        type="submit"
        className={`w-full font-bold py-2 px-4 rounded-lg transition flex justify-center items-center ${
          isButtonEnabled
            ? "bg-sky-800 text-white hover:bg-sky-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        // disabled={!isButtonEnabled}
      >
        {isOptSendSuccessfully ? "Verify & Continue" : "Create ABHA"}
        {isLoading && (
          <Loader2 className="animate-spin h-5 w-5 text-gray-900 ml-2" />
        )}
      </button>
    </form>
  );
};

export default ABHAForm;
