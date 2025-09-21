import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Download, Plus, Trash2, FileText, Loader2 } from 'lucide-react';
import { ResumeData } from '../types';
import { aiService } from '../services/aiService';
import jsPDF from 'jspdf';

export const ResumeBuilder: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState<ResumeData | null>(null);

  const { register, control, handleSubmit, watch } = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        name: 'Himanshu Kumar',
        email: 'himanshu@example.com',
        phone: '+91 9876543210',
        location: 'Mumbai, India',
        linkedin: 'linkedin.com/in/himanshu',
        portfolio: 'himanshu.dev'
      },
      summary: 'Passionate software developer with experience in full-stack development and modern web technologies.',
      experience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Software Developer',
          duration: '2022 - Present',
          description: [
            'Developed responsive web applications using React and Node.js',
            'Collaborated with cross-functional teams to deliver high-quality software',
            'Implemented RESTful APIs and database optimization'
          ]
        }
      ],
      education: [
        {
          institution: 'Mumbai University',
          degree: 'B.Tech in Computer Science',
          year: '2022',
          gpa: '8.5/10'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Git'],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce application with payment integration',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'github.com/himanshu/ecommerce'
        }
      ]
    }
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const optimizeResume = async (data: ResumeData) => {
    setLoading(true);
    try {
      const optimized = await aiService.optimizeResume(data, 'Full Stack Developer');
      setOptimizedResume(optimized);
    } catch (error) {
      console.error('Error optimizing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (resumeData: ResumeData) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.personalInfo.name, 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`, 20, yPosition);
    yPosition += 15;

    // Summary
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROFESSIONAL SUMMARY', 20, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(resumeData.summary, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;

    // Experience
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIENCE', 20, yPosition);
    yPosition += 8;

    resumeData.experience.forEach((exp) => {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${exp.position} - ${exp.company}`, 20, yPosition);
      yPosition += 6;
      
      pdf.setFont('helvetica', 'italic');
      pdf.text(exp.duration, 20, yPosition);
      yPosition += 8;

      pdf.setFont('helvetica', 'normal');
      exp.description.forEach((desc) => {
        yPosition = addText(`• ${desc}`, 25, yPosition, pageWidth - 50, 10);
        yPosition += 2;
      });
      yPosition += 5;
    });

    // Skills
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SKILLS', 20, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(resumeData.skills.join(', '), 20, yPosition, pageWidth - 40, 10);

    pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
  };

  const resumeToDisplay = optimizedResume || watch();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h2>
        <p className="text-gray-600">Create an ATS-optimized resume that stands out</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Resume Information</h3>
          
          <form onSubmit={handleSubmit(optimizeResume)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register('personalInfo.name')}
                  placeholder="Full Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  {...register('personalInfo.email')}
                  placeholder="Email"
                  type="email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  {...register('personalInfo.phone')}
                  placeholder="Phone"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  {...register('personalInfo.location')}
                  placeholder="Location"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Summary</h4>
              <textarea
                {...register('summary')}
                rows={4}
                placeholder="Brief professional summary..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Experience</h4>
                <button
                  type="button"
                  onClick={() => appendExperience({ company: '', position: '', duration: '', description: [''] })}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>
              {experienceFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-medium text-gray-900">Experience {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      {...register(`experience.${index}.company`)}
                      placeholder="Company"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      {...register(`experience.${index}.position`)}
                      placeholder="Position"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    {...register(`experience.${index}.duration`)}
                    placeholder="Duration (e.g., 2022 - Present)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  />
                  <textarea
                    {...register(`experience.${index}.description.0`)}
                    placeholder="Job description and achievements..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                <span>{loading ? 'Optimizing...' : 'Optimize with AI'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Resume Preview</h3>
            <button
              onClick={() => downloadPDF(resumeToDisplay)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
            {/* Resume Preview Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-300 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">{resumeToDisplay.personalInfo.name}</h1>
                <p className="text-gray-600 mt-2">
                  {resumeToDisplay.personalInfo.email} | {resumeToDisplay.personalInfo.phone} | {resumeToDisplay.personalInfo.location}
                </p>
                {resumeToDisplay.personalInfo.linkedin && (
                  <p className="text-blue-600 text-sm mt-1">{resumeToDisplay.personalInfo.linkedin}</p>
                )}
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{resumeToDisplay.summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">EXPERIENCE</h2>
                {resumeToDisplay.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {exp.description.map((desc, i) => (
                        <li key={i}>• {desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">SKILLS</h2>
                <p className="text-gray-700 text-sm">{resumeToDisplay.skills.join(', ')}</p>
              </div>
            </div>
          </div>

          {optimizedResume && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ Resume optimized with AI! ATS-friendly keywords and formatting applied.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};