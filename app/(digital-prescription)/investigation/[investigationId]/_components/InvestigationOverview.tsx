"use client";
import React, { useCallback, useEffect } from "react";
import {
  Link as ScrollLink,
  Element as ScrollElement,
  scroller,
} from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getInvestigationDetails } from "@/redux/slices/digitalPrescription/drug.slice";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import SubGroupingMapping from "./SubGroupingMapping";

const InvestigationOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { investigationId } = useParams();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  const fetchDrugDetails = useCallback(() => {
    if (investigationId) {
      const id = Array.isArray(investigationId)
        ? investigationId[0]
        : investigationId;
      dispatch(getInvestigationDetails(id));
    }
  }, [dispatch, investigationId]);

  // useEffect(() => {
  //   fetchDrugDetails();
  // }, [fetchDrugDetails]);
  console.log("data============", data);
  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 ml-3 text-center w-full"> Error: {error} </p>
      ) : ( */}
      <>
        {data && data.length > 0 && (
          <React.Fragment>
            <div className="hidden sm:block w-1/4 bg-white shadow-lg rounded-lg p-4 sticky top-20 max-h-[600px] overflow-auto">
              <ul className="space-y-2">
                {data.map((section: any) => (
                  <li key={section.name}>
                    <ScrollLink
                      to={section.name}
                      smooth={true}
                      duration={500}
                      spy={true}
                      activeClass="font-bold text-sky-600"
                      className="block py-2 px-4 rounded-lg hover:bg-sky-50 transition duration-200 cursor-pointer"
                      offset={-100}
                    >
                      {section.name}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full sm:w-3/4 sm:ml-4">
              <div>
                <Button
                  onClick={() => router.back()}
                  className="rounded-lg bg-white shadow-md"
                  startContent={<ArrowLeftIcon className="w-4 h-4" />}
                >
                  Back
                </Button>
              </div>
              <div className="mt-2">
                {data.map((section: any, i: number) => (
                  <ScrollElement key={i} name={section.name} className="mb-2">
                    <div className="bg-white shadow-md rounded-lg mb-4 transition-transform duration-200 p-4">
                      {section?.keyName === "test_details" ? (
                        <div>
                          <h2 className="text-3xl font-semibold text-gray-900">
                            {section?.test_details?.name}
                          </h2>
                          <p className="mb-4 border-b pb-2 text-gray-500 font-normal text-base mt-2">
                            {section?.test_details?.synonyms}{" "}
                          </p>
                          <div>
                            <strong className="text-gray-800 font-semibold text-base"> Test Preparation: </strong>
                            <span className="text-gray-500 font-normal text-base">
                              {section?.test_details?.test_preparation}
                            </span>
                          </div>
                          <div>
                            <strong className="text-gray-800 font-semibold text-base"> You Need To Provide: </strong>
                            <span className="text-gray-500 font-normal text-base">
                              {section?.test_details?.you_need_to_provide}
                            </span>
                          </div>
                        </div>
                      ) : section?.keyName === "understanding_test" ? (
                        <div>
                          <p className="text-gray-800 font-semibold text-base mb-3">
                            {section?.understanding_test?.short_desc}
                          </p>
                          <p className="text-gray-500 font-normal text-base mt-2">
                            {section?.understanding_test?.long_desc}
                          </p>
                        </div>
                      ) : section?.keyName === "sub_groups" ? (
                        <SubGroupingMapping subGroup={section?.sub_groups} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </ScrollElement>
                ))}
              </div>
            </div>
          </React.Fragment>
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default InvestigationOverview;
