export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface UserProfile {
  skills: string[];
  experience: string;
  interests: string[];
  currentRole?: string;
  education: string;
  location: string;
  preferredIndustries: string[];
}

export interface CareerRecommendation {
  id: string;
  title: string;
  category: 'immediate' | 'near-term' | 'long-term';
  confidenceScore: number;
  description: string;
  requiredSkills: string[];
  salaryRange: string;
  growthPotential: number;
  matchReasons: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

export interface SkillGap {
  skill: string;
  importance: number;
  currentLevel: number;
  targetLevel: number;
  resources: string[];
}