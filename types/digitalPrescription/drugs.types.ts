
// ! investigation mapping types
type InterpretingResult = {
  low?: string | null;
  high?: string | null;
  unit_of_measure?: string | null;
  male_low_range?: string | null;
  male_high_range?: string | null;
  female_low_range?: string | null;
  female_high_range?: string | null;
  child_low_range?: string | null;
  child_high_range?: string | null;
  pregnent_women_low_range?: string | null;
  pregnent_women_high_range?: string | null;
  high_range_indication?: string | null;
  low_range_indication?: string | null;
};

type InterpretationItem = {
  name: string;
  interpreting_result: InterpretingResult;
};

type InterpretationData = {
  name: string;
  keyName: string;
  interpretation_dtls: InterpretationItem[];
};
