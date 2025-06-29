import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, User, ExternalLink } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';

const EducationLibrary: React.FC = () => {
  const { user } = useAuth();
  const { addEducationProgress } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedContent, setCompletedContent] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Content', icon: '📚' },
    { id: 'basics', name: 'OCD Basics', icon: '🧠' },
    { id: 'treatment', name: 'Treatment', icon: '🏥' },
    { id: 'coping', name: 'Coping Skills', icon: '🛠️' },
    { id: 'family', name: 'Family & Friends', icon: '👨‍👩‍👧‍👦' },
    { id: 'research', name: 'Latest Research', icon: '🔬' }
  ];

  const educationalContent = [
    {
      id: 'what-is-ocd',
      title: 'What is OCD? Understanding the Basics',
      type: 'video',
      duration: 12,
      category: 'basics',
      difficulty: 'Beginner',
      author: 'Dr. Sarah Johnson, Clinical Psychologist',
      description: 'Learn the fundamental concepts of OCD, including obsessions, compulsions, and how they differ from everyday worries.',
      keyPoints: [
        'Definition of obsessions and compulsions',
        'Common OCD themes and presentations',
        'How OCD differs from perfectionism or being "neat"',
        'The OCD cycle and how it maintains itself'
      ]
    },
    {
      id: 'erp-explained',
      title: 'ERP Therapy: The Gold Standard Treatment',
      type: 'video',
      duration: 18,
      category: 'treatment',
      difficulty: 'Intermediate',
      author: 'Dr. Michael Chen, OCD Specialist',
      description: 'Deep dive into Exposure and Response Prevention therapy, how it works, and what to expect.',
      keyPoints: [
        'How ERP breaks the OCD cycle',
        'Building an exposure hierarchy',
        'Response prevention techniques',
        'Working with a therapist vs. self-directed ERP'
      ]
    },
    {
      id: 'medication-options',
      title: 'Medication for OCD: SSRIs and Beyond',
      type: 'article',
      duration: 8,
      category: 'treatment',
      difficulty: 'Intermediate',
      author: 'Dr. Lisa Rodriguez, Psychiatrist',
      description: 'Comprehensive guide to medication options for OCD, including benefits, side effects, and considerations.',
      keyPoints: [
        'First-line medications for OCD',
        'How long medications take to work',
        'Managing side effects',
        'Combining medication with therapy'
      ]
    },
    {
      id: 'intrusive-thoughts',
      title: 'Understanding Intrusive Thoughts',
      type: 'video',
      duration: 15,
      category: 'basics',
      difficulty: 'Beginner',
      author: 'Dr. Amanda Foster, Clinical Psychologist',
      description: 'Learn why intrusive thoughts happen, why they feel so real, and how to respond to them effectively.',
      keyPoints: [
        'Why everyone has intrusive thoughts',
        'The difference between thoughts and actions',
        'Why fighting thoughts makes them stronger',
        'Healthy ways to respond to intrusive thoughts'
      ]
    },
    {
      id: 'family-support',
      title: 'How Family Can Help (Without Enabling)',
      type: 'video',
      duration: 20,
      category: 'family',
      difficulty: 'Beginner',
      author: 'Dr. Robert Kim, Family Therapist',
      description: 'Guide for family members on how to support their loved one with OCD without reinforcing symptoms.',
      keyPoints: [
        'Recognizing accommodation behaviors',
        'How to respond to requests for reassurance',
        'Supporting treatment goals',
        'Taking care of your own mental health'
      ]
    },
    {
      id: 'mindfulness-ocd',
      title: 'Mindfulness Techniques for OCD',
      type: 'article',
      duration: 10,
      category: 'coping',
      difficulty: 'Intermediate',
      author: 'Dr. Jennifer Walsh, Mindfulness Expert',
      description: 'Learn how mindfulness can complement traditional OCD treatment and specific techniques to try.',
      keyPoints: [
        'Observing thoughts without judgment',
        'Acceptance vs. resignation',
        'Mindful exposure exercises',
        'Daily mindfulness practices'
      ]
    },
    {
      id: 'ocd-research-2024',
      title: 'Latest OCD Research Findings (2024)',
      type: 'article',
      duration: 12,
      category: 'research',
      difficulty: 'Advanced',
      author: 'Dr. Thomas Anderson, Research Director',
      description: 'Overview of the most recent research in OCD treatment, including new therapeutic approaches and brain imaging studies.',
      keyPoints: [
        'New treatment modalities being studied',
        'Brain imaging insights',
        'Genetic research findings',
        'Future directions in OCD treatment'
      ]
    },
    {
      id: 'workplace-ocd',
      title: 'Managing OCD in the Workplace',
      type: 'video',
      duration: 14,
      category: 'coping',
      difficulty: 'Intermediate',
      author: 'Dr. Patricia Lee, Occupational Psychologist',
      description: 'Practical strategies for managing OCD symptoms at work and knowing your rights as an employee.',
      keyPoints: [
        'Workplace accommodations for OCD',
        'Managing perfectionism at work',
        'Disclosure decisions',
        'Building supportive relationships with colleagues'
      ]
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? educationalContent 
    : educationalContent.filter(content => content.category === selectedCategory);

  const markAsComplete = (contentId: string) => {
    if (user) {
      addEducationProgress({
        content_id: contentId,
        content_type: 'educational',
        progress_percentage: 100,
        completed: true
      });
    }
    setCompletedContent(prev => [...prev, contentId]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? <Play size={16} /> : <BookOpen size={16} />;
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto">
          <BookOpen size={48} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sign In for Education Library</h3>
          <p className="text-blue-600 text-sm">
            Access expert-created educational content about OCD, treatment options, and coping strategies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Education Library</h2>
        <p className="text-slate-600">Expert-created content to help you understand and manage OCD</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xl mb-1">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <div key={content.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{content.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{content.description}</p>
                </div>
                {completedContent.includes(content.id) && (
                  <CheckCircle className="text-green-600 flex-shrink-0 ml-2" size={20} />
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User size={14} />
                <span>{content.author}</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-slate-600">
                  {getTypeIcon(content.type)}
                  <span className="text-sm capitalize">{content.type}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600">
                  <Clock size={14} />
                  <span className="text-sm">{content.duration} min</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(content.difficulty)}`}>
                  {content.difficulty}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Key Topics:</h4>
                <ul className="space-y-1">
                  {content.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => markAsComplete(content.id)}
                  disabled={completedContent.includes(content.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    completedContent.includes(content.id)
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {completedContent.includes(content.id) ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      {getTypeIcon(content.type)}
                      <span>{content.type === 'video' ? 'Watch' : 'Read'}</span>
                    </>
                  )}
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-800 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">📊 Your Learning Progress</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completedContent.length}</div>
            <div className="text-sm text-slate-600">Content Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedContent.length / educationalContent.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Library Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {completedContent.reduce((total, contentId) => {
                const content = educationalContent.find(c => c.id === contentId);
                return total + (content?.duration || 0);
              }, 0)}
            </div>
            <div className="text-sm text-slate-600">Minutes Learned</div>
          </div>
        </div>
      </div>

      {/* Expert Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">👨‍⚕️ Expert Note</h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          This educational content is created by licensed mental health professionals and is based on current research and clinical best practices. 
          While this information is valuable for understanding OCD, it's not a substitute for personalized professional treatment. 
          Always consult with a qualified mental health provider for diagnosis and treatment planning.
        </p>
      </div>
    </div>
  );
};

export default EducationLibrary;