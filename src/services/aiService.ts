import { CareerRecommendation, UserProfile, ResumeData, SkillGap } from '../types';

// Mock AI service - In production, this would connect to OpenAI/Gemini API
class AIService {
  private mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async generateCareerRecommendations(profile: UserProfile): Promise<CareerRecommendation[]> {
    await this.mockDelay(2000); // Simulate API call

    const recommendations: CareerRecommendation[] = [
      {
        id: '1',
        title: 'Full Stack Developer',
        category: 'immediate',
        confidenceScore: 92,
        description: 'Build end-to-end web applications using modern frameworks and technologies.',
        requiredSkills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'REST APIs'],
        salaryRange: '₹8-15 LPA',
        growthPotential: 85,
        matchReasons: [
          'Strong match with your JavaScript skills',
          'Aligns with your web development interests',
          'High demand in current market'
        ]
      },
      {
        id: '2',
        title: 'AI/ML Engineer',
        category: 'near-term',
        confidenceScore: 78,
        description: 'Develop and deploy machine learning models and AI solutions.',
        requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science', 'Statistics'],
        salaryRange: '₹12-25 LPA',
        growthPotential: 95,
        matchReasons: [
          'Growing field with high potential',
          'Matches your analytical interests',
          'Strong career growth prospects'
        ]
      },
      {
        id: '3',
        title: 'Product Manager',
        category: 'long-term',
        confidenceScore: 65,
        description: 'Lead product strategy and work with cross-functional teams.',
        requiredSkills: ['Product Strategy', 'Analytics', 'Communication', 'Leadership'],
        salaryRange: '₹15-35 LPA',
        growthPotential: 90,
        matchReasons: [
          'Leadership potential identified',
          'Strategic thinking alignment',
          'High growth trajectory'
        ]
      }
    ];

    return recommendations;
  }

  async optimizeResume(resumeData: ResumeData, targetRole: string): Promise<ResumeData> {
    await this.mockDelay(1500);

    // Mock resume optimization
    const optimizedResume = { ...resumeData };
    
    // Add ATS-friendly keywords
    optimizedResume.summary = `${resumeData.summary} Experienced in modern development practices with strong problem-solving abilities and collaborative mindset.`;
    
    // Optimize experience descriptions
    optimizedResume.experience = resumeData.experience.map(exp => ({
      ...exp,
      description: exp.description.map(desc => 
        `• ${desc} (Achieved measurable results through efficient implementation)`
      )
    }));

    return optimizedResume;
  }

  async analyzeSkillGaps(profile: UserProfile, targetRole: string): Promise<SkillGap[]> {
    await this.mockDelay(1000);

    const skillGaps: SkillGap[] = [
      {
        skill: 'React.js',
        importance: 90,
        currentLevel: 60,
        targetLevel: 85,
        resources: [
          'React Official Documentation',
          'Complete React Developer Course',
          'React Projects on GitHub'
        ]
      },
      {
        skill: 'System Design',
        importance: 80,
        currentLevel: 30,
        targetLevel: 70,
        resources: [
          'Designing Data-Intensive Applications',
          'System Design Interview Course',
          'High Scalability Blog'
        ]
      },
      {
        skill: 'TypeScript',
        importance: 75,
        currentLevel: 45,
        targetLevel: 80,
        resources: [
          'TypeScript Handbook',
          'TypeScript Deep Dive',
          'Practice with Real Projects'
        ]
      }
    ];

    return skillGaps;
  }
}

export const aiService = new AIService();