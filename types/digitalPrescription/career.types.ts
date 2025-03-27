export interface CareerJobType {
  job_id: number;
  job_title: string;
  location: string;
  experience_range: string;
  employment_type: string;
  status: string;
  department: string;
  salary_range: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  posted_date: string;
  image_url: string | null;
}
