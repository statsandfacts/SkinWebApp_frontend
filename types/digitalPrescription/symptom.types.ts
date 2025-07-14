// types/symptomBot.ts
export interface Tip {
  title: string;
  description: string;
  color: string;
}

export interface Condition {
  title: string;
  description: string;
  data: Tip[];
}
