import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Plus, X } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSave: (profile: UserProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave }) => {
  const { register, handleSubmit, watch, setValue } = useForm<UserProfile>({
    defaultValues: {
      skills: ['JavaScript', 'React', 'Node.js'],
      interests: ['Web Development', 'AI/ML', 'Product Management'],
      preferredIndustries: ['Technology', 'Fintech']
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newIndustry, setNewIndustry] = useState('');

  const skills = watch('skills') || [];
  const interests = watch('interests') || [];
  const preferredIndustries = watch('preferredIndustries') || [];

  const addItem = (type: 'skills' | 'interests' | 'preferredIndustries', value: string, setter: (val: string) => void) => {
    if (value.trim()) {
      const currentItems = watch(type) || [];
      setValue(type, [...currentItems, value.trim()]);
      setter('');
    }
  };

  const removeItem = (type: 'skills' | 'interests' | 'preferredIndustries', index: number) => {
    const currentItems = watch(type) || [];
    setValue(type, currentItems.filter((_, i) => i !== index));
  };

  const onSubmit = (data: UserProfile) => {
    onSave(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h2>
          <p className="text-gray-600">Tell us about yourself to get personalized career recommendations</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role
              </label>
              <input
                {...register('currentRole')}
                type="text"
                placeholder="e.g., Software Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g., Mumbai, India"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              {...register('experience')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select experience level</option>
              <option value="fresher">Fresher (0-1 years)</option>
              <option value="junior">Junior (1-3 years)</option>
              <option value="mid">Mid-level (3-5 years)</option>
              <option value="senior">Senior (5-8 years)</option>
              <option value="lead">Lead (8+ years)</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <input
              {...register('education')}
              type="text"
              placeholder="e.g., B.Tech in Computer Science"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill, setNewSkill))}
              />
              <button
                type="button"
                onClick={() => addItem('skills', newSkill, setNewSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Interests
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeItem('interests', index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('interests', newInterest, setNewInterest))}
              />
              <button
                type="button"
                onClick={() => addItem('interests', newInterest, setNewInterest)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preferred Industries */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Industries
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {preferredIndustries.map((industry, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  {industry}
                  <button
                    type="button"
                    onClick={() => removeItem('preferredIndustries', index)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="Add an industry"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('preferredIndustries', newIndustry, setNewIndustry))}
              />
              <button
                type="button"
                onClick={() => addItem('preferredIndustries', newIndustry, setNewIndustry)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};