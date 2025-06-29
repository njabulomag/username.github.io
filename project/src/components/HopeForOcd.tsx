import React, { useState } from 'react';
import { Heart, Star, TrendingUp, Users, Lightbulb, BookOpen, Target, Smile, ArrowRight, Play, Quote } from 'lucide-react';

const HopeForOcd: React.FC = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const recoveryStories = [
    {
      id: 'sarah-contamination',
      name: 'Sarah M.',
      age: 28,
      ocdType: 'Contamination OCD',
      timeToRecovery: '18 months',
      beforeDescription: 'Washing hands 50+ times daily, couldn\'t touch doorknobs, avoided public places entirely',
      afterDescription: 'Living independently, working as a nurse, travels freely',
      keyTurningPoint: 'Realizing that uncertainty is part of life, not something to eliminate',
      advice: 'Start with the tiniest exposure you can imagine. I started by touching a "clean" doorknob for 1 second. Recovery is built one brave moment at a time.',
      currentLife: 'I work in a hospital now - something I never thought possible. I still have OCD, but it doesn\'t run my life anymore.',
      inspiration: 'If someone told me 2 years ago I\'d be comfortable in a hospital, I would have laughed. But here I am, helping others heal.'
    },
    {
      id: 'marcus-checking',
      name: 'Marcus T.',
      age: 35,
      ocdType: 'Checking OCD',
      timeToRecovery: '2 years',
      beforeDescription: 'Checking locks, stove, car doors 20+ times, late to everything, constant doubt',
      afterDescription: 'Checks once, trusts his memory, on time for commitments',
      keyTurningPoint: 'Learning that checking actually makes your memory worse, not better',
      advice: 'The hardest part was learning to sit with the discomfort of not knowing for sure. But that discomfort fades, and confidence grows.',
      currentLife: 'I got promoted at work because I\'m no longer constantly late. My relationships improved because I\'m present instead of anxious.',
      inspiration: 'I used to think I was protecting everyone by checking. Now I know I was just feeding the monster.'
    },
    {
      id: 'elena-intrusive',
      name: 'Elena R.',
      age: 24,
      ocdType: 'Intrusive Thoughts',
      timeToRecovery: '14 months',
      beforeDescription: 'Horrific thoughts about harming loved ones, constant guilt and shame, avoided being alone with family',
      afterDescription: 'Understands thoughts are just thoughts, comfortable around family, pursuing teaching career',
      keyTurningPoint: 'Realizing that being horrified by the thoughts proved I\'m a good person, not a dangerous one',
      advice: 'The thoughts feel so real and scary, but they\'re just brain noise. The fact that you hate them shows your true character.',
      currentLife: 'I\'m studying to be an elementary school teacher. The irony isn\'t lost on me - I was terrified of hurting children, now I want to help them learn.',
      inspiration: 'My therapist said, "Your OCD picked the thoughts that would hurt you most because you care so deeply about being good."'
    },
    {
      id: 'david-symmetry',
      name: 'David L.',
      age: 42,
      ocdType: 'Symmetry & "Just Right" OCD',
      timeToRecovery: '20 months',
      beforeDescription: 'Everything had to be perfectly aligned, spent hours arranging objects, couldn\'t leave house if things felt "wrong"',
      afterDescription: 'Tolerates asymmetry, focuses on function over perfection, enjoys spontaneous activities',
      keyTurningPoint: 'Accepting that "good enough" is actually perfect for real life',
      advice: 'I had to learn that the feeling of "wrongness" is temporary, but the freedom from perfectionism is permanent.',
      currentLife: 'My house is lived-in now, not a museum. My family can actually relax at home instead of walking on eggshells.',
      inspiration: 'I realized I was choosing the illusion of control over actually living my life.'
    },
    {
      id: 'maya-pure-o',
      name: 'Maya K.',
      age: 31,
      ocdType: 'Pure O (Mental Compulsions)',
      timeToRecovery: '16 months',
      beforeDescription: 'Constant mental reviewing, analyzing every interaction, seeking certainty about past events',
      afterDescription: 'Accepts uncertainty, present-focused, trusts her judgment',
      keyTurningPoint: 'Understanding that mental compulsions are still compulsions, even if invisible',
      advice: 'Just because you can\'t see mental compulsions doesn\'t mean they\'re not real. Learning to catch and stop them was life-changing.',
      currentLife: 'I can have conversations without replaying them for hours afterward. I\'m actually present in my own life now.',
      inspiration: 'I thought I was just being "thoughtful" but I was actually torturing myself with analysis.'
    }
  ];

  const hopefulFacts = [
    {
      icon: TrendingUp,
      title: 'High Success Rate',
      fact: '70-80% of people with OCD see significant improvement with proper treatment',
      detail: 'ERP therapy combined with medication when needed shows remarkable success rates'
    },
    {
      icon: Target,
      title: 'Treatment Works',
      fact: 'ERP therapy is effective for all types of OCD',
      detail: 'Whether you have contamination fears, checking, intrusive thoughts, or other presentations'
    },
    {
      icon: Heart,
      title: 'You\'re Not Alone',
      fact: '2.3% of adults will experience OCD in their lifetime',
      detail: 'That\'s about 1 in 40 people - you\'re part of a large, supportive community'
    },
    {
      icon: Lightbulb,
      title: 'Brain Plasticity',
      fact: 'Your brain can literally rewire itself through treatment',
      detail: 'Neuroimaging shows actual brain changes after successful OCD treatment'
    },
    {
      icon: Star,
      title: 'Recovery is Possible',
      fact: 'Many people go from severe OCD to living full, unrestricted lives',
      detail: 'Recovery doesn\'t mean perfection - it means freedom to live according to your values'
    },
    {
      icon: Users,
      title: 'Support Available',
      fact: 'More OCD specialists and resources exist now than ever before',
      detail: 'Online therapy, support groups, and specialized treatment centers are widely available'
    }
  ];

  const inspirationalQuotes = [
    {
      quote: "Recovery isn't about eliminating uncertainty - it's about learning to dance with it.",
      author: "Dr. Jonathan Grayson, OCD Specialist"
    },
    {
      quote: "You are not your thoughts. You are the observer of your thoughts.",
      author: "Mindfulness-Based OCD Treatment"
    },
    {
      quote: "Courage isn't the absence of fear - it's feeling the fear and doing it anyway.",
      author: "ERP Therapy Principle"
    },
    {
      quote: "The goal isn't to never have intrusive thoughts. The goal is to not be bothered by them.",
      author: "Dr. Steven Phillipson"
    },
    {
      quote: "Every time you resist a compulsion, you're voting for the person you want to become.",
      author: "Recovery Community Wisdom"
    }
  ];

  const recoveryMilestones = [
    {
      phase: 'Early Recovery (0-3 months)',
      description: 'Learning about OCD, starting treatment, first small exposures',
      achievements: [
        'Understanding that OCD is a medical condition, not a character flaw',
        'Completing first exposure exercises',
        'Beginning to resist some compulsions',
        'Connecting with treatment providers'
      ]
    },
    {
      phase: 'Building Momentum (3-9 months)',
      description: 'Consistent ERP practice, noticeable improvements in daily life',
      achievements: [
        'Completing more challenging exposures',
        'Reduced time spent on compulsions',
        'Improved relationships and work performance',
        'Growing confidence in ability to handle uncertainty'
      ]
    },
    {
      phase: 'Sustained Progress (9-18 months)',
      description: 'Major life improvements, occasional setbacks but quick recovery',
      achievements: [
        'Living more freely and spontaneously',
        'Pursuing previously avoided goals and activities',
        'Helping others understand OCD',
        'Developing relapse prevention skills'
      ]
    },
    {
      phase: 'Long-term Recovery (18+ months)',
      description: 'OCD no longer significantly impacts life choices and happiness',
      achievements: [
        'Living according to personal values, not OCD rules',
        'Maintaining gains with minimal ongoing treatment',
        'Serving as inspiration for others in recovery',
        'Focusing on life goals beyond OCD management'
      ]
    }
  ];

  const timeframes = [
    { id: 'all', label: 'All Stories' },
    { id: 'under-1-year', label: 'Under 1 Year' },
    { id: '1-2-years', label: '1-2 Years' },
    { id: '2-plus-years', label: '2+ Years' }
  ];

  const filteredStories = selectedTimeframe === 'all' ? recoveryStories :
    selectedTimeframe === 'under-1-year' ? recoveryStories.filter(s => parseInt(s.timeToRecovery) < 12) :
    selectedTimeframe === '1-2-years' ? recoveryStories.filter(s => {
      const months = parseInt(s.timeToRecovery);
      return months >= 12 && months <= 24;
    }) :
    recoveryStories.filter(s => parseInt(s.timeToRecovery) > 24);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Hope for OCD</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Recovery is not just possible - it's probable. Here are real stories from real people who found their way from suffering to freedom.
        </p>
      </div>

      {/* Hopeful Facts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hopefulFacts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Icon className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{fact.title}</h3>
              </div>
              <p className="text-emerald-800 font-semibold mb-2">{fact.fact}</p>
              <p className="text-slate-600 text-sm">{fact.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Recovery Stories */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-slate-800 flex items-center">
            <Users className="mr-3 text-blue-600" size={28} />
            Real Recovery Stories
          </h3>
          <div className="flex space-x-2">
            {timeframes.map(timeframe => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                activeStory === story.id
                  ? 'border-blue-300 bg-blue-50 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
              onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{story.name}</h4>
                    <p className="text-sm text-slate-600">{story.ocdType} • Age {story.age}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-emerald-600">Recovery Time</div>
                    <div className="text-lg font-bold text-emerald-700">{story.timeToRecovery}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-red-700 mb-1">Before Treatment:</h5>
                    <p className="text-sm text-slate-700">{story.beforeDescription}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-700 mb-1">After Recovery:</h5>
                    <p className="text-sm text-slate-700">{story.afterDescription}</p>
                  </div>
                </div>

                {activeStory === story.id && (
                  <div className="space-y-4 animate-in fade-in duration-300 pt-4 border-t border-blue-200">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2 flex items-center">
                        <Lightbulb size={16} className="mr-1" />
                        Key Turning Point:
                      </h5>
                      <p className="text-sm text-slate-700 italic">"{story.keyTurningPoint}"</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-purple-700 mb-2 flex items-center">
                        <Heart size={16} className="mr-1" />
                        Advice for Others:
                      </h5>
                      <p className="text-sm text-slate-700">"{story.advice}"</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-emerald-700 mb-2 flex items-center">
                        <Smile size={16} className="mr-1" />
                        Life Today:
                      </h5>
                      <p className="text-sm text-slate-700">"{story.currentLife}"</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
                      <h5 className="font-medium text-orange-700 mb-1 flex items-center">
                        <Star size={16} className="mr-1" />
                        Most Inspiring Moment:
                      </h5>
                      <p className="text-sm text-orange-800 italic">"{story.inspiration}"</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Click to {activeStory === story.id ? 'collapse' : 'read full story'}
                  </span>
                  <ArrowRight 
                    size={16} 
                    className={`text-slate-400 transition-transform ${
                      activeStory === story.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-green-600" size={28} />
          The Recovery Journey
        </h3>
        <p className="text-slate-600 mb-6">
          Recovery isn't linear, but there are common patterns. Here's what many people experience:
        </p>

        <div className="space-y-6">
          {recoveryMilestones.map((milestone, index) => (
            <div key={index} className="relative">
              {index < recoveryMilestones.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-green-300"></div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">{milestone.phase}</h4>
                  <p className="text-slate-600 mb-3">{milestone.description}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {milestone.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirational Quotes */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
          <Quote className="mr-3 text-purple-600" size={28} />
          Words of Hope
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {inspirationalQuotes.map((quote, index) => (
            <div key={index} className="bg-white/70 rounded-lg p-4 border border-purple-200">
              <p className="text-slate-700 italic mb-3">"{quote.quote}"</p>
              <p className="text-sm text-purple-700 font-medium">— {quote.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Your Recovery Story Starts Today</h3>
        <p className="text-lg mb-6 opacity-90">
          Every person in these stories started exactly where you are now - with hope, courage, and the decision to take the first step.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Find a Therapist
          </button>
          <button className="px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors">
            Start ERP Exercises
          </button>
          <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            Join Support Community
          </button>
        </div>
      </div>

      {/* Scientific Hope */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">🧬 The Science of Hope</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">Neuroplasticity Research Shows:</h4>
            <ul className="space-y-1">
              <li>• Brain circuits can be rewired at any age</li>
              <li>• ERP therapy creates measurable brain changes</li>
              <li>• Recovery improvements are often permanent</li>
              <li>• The brain's "alarm system" can be recalibrated</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Treatment Advances:</h4>
            <ul className="space-y-1">
              <li>• More effective therapy techniques than ever</li>
              <li>• Better understanding of OCD subtypes</li>
              <li>• Improved medications with fewer side effects</li>
              <li>• Online therapy making treatment accessible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Personal Message */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">💛 A Personal Message</h3>
        <p className="text-amber-700 leading-relaxed max-w-3xl mx-auto">
          If you're reading this while struggling with OCD, please know: you are not broken, you are not weak, and you are not alone. 
          The stories above aren't fairy tales - they're real people who felt exactly as hopeless as you might feel right now. 
          Recovery is not just possible for "other people" - it's possible for you too. 
          Your story of hope is waiting to be written, and it starts with the next brave step you take.
        </p>
      </div>
    </div>
  );
};

export default HopeForOcd;