import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ViewMoreTeamDrawerProps {
  viewMore: boolean;
  viewMoreTeamName: string;
  onClose: () => void;
}

const ViewMoreTeamDrawer: React.FC<ViewMoreTeamDrawerProps> = ({
  viewMore,
  viewMoreTeamName,
  onClose,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const placement = isMobile ? "top" : "right";

  return (
    <Drawer
      isOpen={viewMore}
      onOpenChange={onClose}
      placement={placement}
      size="lg"
      backdrop="blur"
    >
      <DrawerContent>
        {(onCloseDrawer) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              {viewMoreTeamName}
            </DrawerHeader>
            <DrawerBody>
              {viewMoreTeamName === "Col (Dr) Surendra Ramamurthy" ? (
                <>
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">
                      Colonel (Dr) Surendra Ramamurthy
                    </span>{" "}
                    professional journey is a rare confluence of{" "}
                    <span className="font-medium">clinical expertise</span>,
                    <span className="font-medium"> military discipline</span>,
                    and{" "}
                    <span className="font-medium">visionary leadership</span> in
                    digital health.
                  </p>

                  <p className="text-base text-gray-700 leading-relaxed">
                    Trained as a clinician and having served with distinction in
                    the{" "}
                    <span className="font-medium text-black">
                      Indian Armed Forces until 2008
                    </span>
                    , he brought the same rigor and commitment from the
                    Operation Theatre to the Boardroom — dedicating over{" "}
                    <span className="font-semibold text-black">
                      four decades to Medicine
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-black">
                      15+ years to revolutionizing healthcare through technology
                    </span>
                    .
                  </p>

                  <p className="text-base text-gray-700 leading-relaxed">
                    Post-retirement, he transitioned into the civilian
                    healthtech space, leading multiple
                    <span className="font-medium text-black">
                      {" "}
                      innovative ventures
                    </span>{" "}
                    and finally founding{" "}
                    <span className="font-bold text-primary">
                      Nextcare.life
                    </span>
                    , where he serves as{" "}
                    <span className="font-semibold">
                      Chief Medical Officer & Founding Member
                    </span>
                    .
                  </p>

                  <p className="text-base text-gray-700 leading-relaxed">
                    His mission is both bold and deeply personal: to transform
                    handwritten, often illegible prescriptions into{" "}
                    <span className="font-medium text-black">
                      intelligent digital formats
                    </span>{" "}
                    enriched with{" "}
                    <span className="font-medium text-black">
                      Clinical Decision Support Systems (CDSS)
                    </span>
                    . These systems empower doctors, support pharmacists, and{" "}
                    <span className="underline decoration-primary">
                      make healthcare understandable for patients
                    </span>
                    .
                  </p>

                  <p className="text-base text-gray-700 leading-relaxed">
                    Under his guidance,{" "}
                    <span className="font-bold text-primary">
                      Nextcare.Life
                    </span>{" "}
                    has become a{" "}
                    <span className="italic text-black">movement</span> —
                    integrating:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Smart Prescription Upload</li>
                    <li>Smart Lab Reports</li>
                    <li>Predictive Analytics</li>
                    <li>Interactive Symptom Bots</li>
                    <li>5-Minute Clinical Consults</li>
                    <li>
                      Personalized Health Alerts for Indian healthcare needs
                    </li>
                  </ul>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Driven by his final professional chapter and a relentless
                    desire to leave a legacy, he is now mentoring the next
                    generation of{" "}
                    <span className="font-medium text-black">
                      digital health innovators
                    </span>
                    , creating tools that are{" "}
                    <span className="font-semibold text-primary">
                      clinically sound
                    </span>
                    ,{" "}
                    <span className="font-semibold text-primary">
                      technologically robust
                    </span>
                    , and most importantly,{" "}
                    <span className="italic font-medium">human-centric</span>.
                  </p>
                </>
              ) : null}
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onCloseDrawer}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ViewMoreTeamDrawer;
