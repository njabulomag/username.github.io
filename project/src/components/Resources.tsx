import React from 'react';
import { 
  Phone, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Stethoscope, 
  Globe,
  MessageCircle,
  Video
} from 'lucide-react';

const Resources: React.FC = () => {
  const crisisResources = [
    {
      title: 'National Suicide Prevention Lifeline',
      contact: '988',
      description: '24/7 crisis support and suicide prevention',
      type: 'phone'
    },
    {
      title: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: 'Free, confidential crisis support via text',
      type: 'text'
    },
    {
      title: 'SAMHSA National Helpline',
      contact: '1-800-662-4357',
      description: 'Treatment referral and information service',
      type: 'phone'
    }
  ];

  const ocdResources = [
    {
      title: 'International OCD Foundation',
      url: 'https://iocdf.org',
      description: 'Comprehensive OCD information, treatment finder, and support',
      icon: Globe
    },
    {
      title: 'OCD Action (UK)',
      url: 'https://www.ocdaction.org.uk',
      description: 'UK-based charity providing support and information',
      icon: Users
    },
    {
      title: 'Beyond OCD',
      url: 'https://beyondocd.org',
      description: 'Education, resources, and support for families',
      icon: BookOpen
    },
    {
      title: 'OCD Challenge',
      url: 'https://ocdchallenge.com',
      description: 'Online ERP therapy and self-help resources',
      icon: Video
    }
  ];

  const selfHelpResources = [
    {
      title: 'The OCD Workbook',
      author: 'Bruce M. Hyman & Cherry Pedrick',
      description: 'Self-help guide with practical exercises',
      type: 'book'
    },
    {
      title: 'Brain Lock',
      author: 'Jeffrey M. Schwartz',
      description: 'Four-step self-treatment method for OCD',
      type: 'book'
    },
    {
      title: 'Freedom from Obsessive Compulsive Disorder',
      author: 'Jonathan Grayson',
      description: 'Comprehensive guide to ERP therapy',
      type: 'book'
    },
    {
      title: 'NOCD App',
      description: 'OCD therapy platform with licensed therapists',
      type: 'app'
    },
    {
      title: 'Mindfulness-Based Apps',
      description: 'Headspace, Calm, Insight Timer for mindfulness practice',
      type: 'app'
    }
  ];

  const therapyInfo = [
    {
      title: 'Cognitive Behavioral Therapy (CBT)',
      description: 'Evidence-based therapy focusing on thoughts, feelings, and behaviors'
    },
    {
      title: 'Exposure and Response Prevention (ERP)',
      description: 'Gold standard treatment for OCD - gradual exposure to fears without compulsions'
    },
    {
      title: 'Acceptance and Commitment Therapy (ACT)',
      description: 'Focus on accepting thoughts while committing to valued actions'
    },
    {
      title: 'Mindfulness-Based Therapy',
      description: 'Using mindfulness techniques to observe thoughts without judgment'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Resources & Support</h2>
        <p className="text-slate-600">Find professional help, support communities, and educational resources</p>
      </div>

      {/* Crisis Resources */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="text-red-600" size={24} />
          <h3 className="text-xl font-semibold text-red-800">Crisis Support</h3>
        </div>
        <p className="text-red-700 mb-4 font-medium">
          If you're in immediate danger or having thoughts of self-harm, please reach out now:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="bg-white border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">{resource.title}</h4>
              <div className="text-red-700 font-mono text-lg mb-2">
                {resource.type === 'phone' ? (
                  <a href={`tel:${resource.contact.replace(/\D/g, '')}`} className="underline">
                    {resource.contact}
                  </a>
                ) : (
                  resource.contact
                )}
              </div>
              <p className="text-sm text-red-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OCD Organizations */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="text-blue-600" size={24} />
          <h3 className="text-xl font-semibold text-slate-800">OCD Organizations</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {ocdResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-sm text-slate-600">{resource.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Therapy Types */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Stethoscope className="text-emerald-600" size={24} />
          <h3 className="text-xl font-semibold text-slate-800">Types of Therapy</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {therapyInfo.map((therapy, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-2">{therapy.title}</h4>
              <p className="text-sm text-slate-600">{therapy.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
          <p className="text-sm text-emerald-800">
            <strong>Finding a Therapist:</strong> Look for mental health professionals who specialize in OCD and anxiety disorders. 
            The International OCD Foundation has a therapist directory to help you find qualified providers in your area.
          </p>
        </div>
      </div>

      {/* Self-Help Resources */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="text-purple-600" size={24} />
          <h3 className="text-xl font-semibold text-slate-800">Self-Help Resources</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">📚 Recommended Books</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selfHelpResources.filter(r => r.type === 'book').map((book, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-3">
                  <h5 className="font-medium text-slate-800 text-sm">{book.title}</h5>
                  <p className="text-xs text-slate-600 mb-1">by {book.author}</p>
                  <p className="text-xs text-slate-500">{book.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">📱 Helpful Apps</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {selfHelpResources.filter(r => r.type === 'app').map((app, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-3">
                  <h5 className="font-medium text-slate-800 text-sm">{app.title}</h5>
                  <p className="text-xs text-slate-500">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">⚠️ Important Note</h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          While self-help resources can be valuable supplements to treatment, they are not substitutes for professional care. 
          OCD is a serious mental health condition that often requires specialized treatment from qualified mental health professionals. 
          If you're struggling with OCD symptoms, consider reaching out to a therapist who specializes in anxiety disorders and OCD treatment.
        </p>
      </div>
    </div>
  );
};

export default Resources;