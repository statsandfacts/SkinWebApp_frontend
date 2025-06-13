import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type RawStatus =
  | "low_very_abnormal"
  | "low_abnormal"
  | "low_borderline"
  | "normal"
  | "high_borderline"
  | "high_abnormal"
  | "high_very_abnormal";
type SimpleStatus = "Normal" | "Borderline" | "Abnormal" | "Very abnormal";
type Detail = {
  name: string;
  value: string;
  range?: { low: string; high: string };
  unit?: string;
  classification: RawStatus;
};
type Group = { group_name: string; grp_short_drsc?: string; dtls: Detail[] };

const simplifyStatus = (s: RawStatus): SimpleStatus => {
  if (s === "normal") return "Normal";
  if (s.endsWith("borderline")) return "Borderline";
  if (s.endsWith("abnormal"))
    return s.includes("very") ? "Very abnormal" : "Abnormal";
  return "Normal";
};

const statusColors: Record<SimpleStatus, string> = {
  Normal: "bg-green-600",
  Borderline: "bg-yellow-400",
  Abnormal: "bg-orange-400",
  "Very abnormal": "bg-red-500",
};

export default function AllReports() {
  const groupedResults = useSelector(
    (state: RootState) =>
      state.userDashboard.singleReport.data?.data?.slr_res?.grouped_results as
        | Group[]
        | undefined
  );
  const initialTabs = groupedResults
    ? groupedResults.reduce((acc, g) => {
        acc[g.group_name] = "Normal";
        return acc;
      }, {} as Record<string, SimpleStatus>)
    : [];

  const [activeTabs, setActiveTabs] = useState<any>(initialTabs);

  // track active tabs per group

  const tabList: SimpleStatus[] = [
    "Normal",
    "Borderline",
    "Abnormal",
    "Very abnormal",
  ];

  return (
    <div className="space-y-12 p-6 max-w-6xl mx-auto">
      {groupedResults &&
        groupedResults.map((g) => {
          const activeTab = g.group_name ? activeTabs[g.group_name] : "Normal";
          const filtered = g.dtls.filter(
            (d) => simplifyStatus(d.classification) === activeTab
          );

          return (
            <section key={g.group_name}>
              <h2 className="text-2xl font-bold text-center flex justify-center items-center gap-2 mb-2 ">
                {g.group_name} <CircleAlert className="w-5 h-5 text-blue-700" />
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-xl shadow p-4 mx-4 mb-6">
                <span className="font-semibold">Nextcare says:</span>{" "}
                <span className="text-gray-800">
                  {g.grp_short_drsc ||
                    (filtered.length > 0
                      ? `Overview: ${filtered.length} marker(s) classified as "${activeTab}".`
                      : `No markers in "${activeTab}".`)}
                </span>
              </div>

              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(k) => {
                  if (typeof k === "string") {
                    setActiveTabs((prev: any) => ({
                      ...prev,
                      [g.group_name]: k as SimpleStatus,
                    }));
                  }
                }}
                variant="underlined"
                classNames={{
                  tabList: "flex space-x-7 mb-4",
                  tab: "text-white  text-center py-2 px-16 rounded-md",
                }}
              >
                {tabList.map((st) => (
                  <Tab key={st} value={st} className={statusColors[st]}>
                    {st}
                  </Tab>
                ))}
              </Tabs>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 px-10 ">
                {filtered.length > 0 ? (
                  filtered.map((d, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-1 items-start"
                    >
                      <div>
                        <h3 className="font-semibold">{d.name}</h3>
                        {d.range && (
                          <p className="text-gray-600 text-sm mt-1">
                            Range: {d.range.low}–{d.range.high} {d.unit ?? ""}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-0 space-x-4">
                        <div className="flex flex-col items-end">
                          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                            Lab says: in range
                          </span>
                          <div
                            className={`h-2 w-24 rounded mt-1 ${
                              statusColors[simplifyStatus(d.classification)]
                            }`}
                          />
                        </div>
                        <div className=" font-semibold">
                          {d.value} {d.unit}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 italic">
                    No markers with {activeTab} status in this group.
                  </div>
                )}
              </div>
            </section>
          );
        })}
    </div>
  );
}
