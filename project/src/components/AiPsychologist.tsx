import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Loader, MessageCircle, Lightbulb, Heart, Shield, BookOpen, Target, Zap, Smile, Coffee, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDatabase } from '../hooks/useDatabase';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'general' | 'crisis' | 'erp' | 'cbt' | 'mindfulness' | 'assessment' | 'psychoeducation';
  interventionType?: string;
  severity?: 'low' | 'moderate' | 'high' | 'crisis';
  emotion?: 'supportive' | 'encouraging' | 'concerned' | 'celebratory' | 'empathetic';
  typingDelay?: number;
}

interface UserContext {
  name?: string;
  preferredStyle: 'formal' | 'casual' | 'warm';
  sessionHistory: string[];
  currentMood: number;
  triggers: string[];
  strengths: string[];
  goals: string[];
  relationshipBuilding: {
    rapport: number;
    trust: number;
    engagement: number;
  };
}

const AiPsychologist: React.FC = () => {
  const { user } = useAuth();
  const { addAiSession, updateAiSession } = useDatabase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [sessionMode, setSessionMode] = useState<'chat' | 'guided' | 'crisis'>('chat');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [userContext, setUserContext] = useState<UserContext>({
    preferredStyle: 'warm',
    sessionHistory: [],
    currentMood: 5,
    triggers: [],
    strengths: [],
    goals: [],
    relationshipBuilding: { rapport: 0, trust: 0, engagement: 0 }
  });
  const [sessionStartTime] = useState(new Date());
  const [aiPersonality, setAiPersonality] = useState({
    currentMood: 'supportive',
    energy: 'calm',
    responseStyle: 'conversational'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Human-like response patterns and personality
  const conversationalPatterns = {
    greetings: [
      "Hi there! I'm Dr. Sage. It's really good to meet you.",
      "Hello! I'm so glad you decided to reach out today.",
      "Hey! Welcome to our space. I'm Dr. Sage, and I'm here for you.",
    ],
    
    acknowledgments: [
      "I hear you.", "That makes complete sense.", "I can really understand that.",
      "Thank you for sharing that with me.", "That sounds really difficult.",
      "I appreciate you being so open about this.", "That takes courage to say."
    ],
    
    encouragements: [
      "You're doing great by being here.", "That's a really important insight.",
      "I can see how much strength that took.", "You should be proud of that step.",
      "That's exactly the kind of thinking that leads to healing."
    ],
    
    transitions: [
      "I'm curious about something...", "Can I ask you about...",
      "I'm wondering if...", "Something you said earlier made me think...",
      "I'd love to explore that a bit more...", "That reminds me of something important..."
    ],
    
    validations: [
      "Your feelings are completely valid.", "Anyone would struggle with this.",
      "You're not alone in feeling this way.", "This is such a human experience.",
      "It's okay to feel overwhelmed by this."
    ]
  };

  // Emotional intelligence responses
  const emotionalResponses = {
    anxiety: {
      high: [
        "I can feel how intense this is for you right now. Let's take this one breath at a time.",
        "This anxiety sounds overwhelming. You're safe here with me, and we'll work through this together.",
        "I hear the panic in your words. First, let's ground you in this moment."
      ],
      moderate: [
        "I can sense the worry in what you're sharing. That's such a normal response to what you're going through.",
        "Anxiety has this way of making everything feel urgent, doesn't it? Let's slow this down together."
      ],
      low: [
        "I notice some concern in your voice. That awareness is actually really healthy.",
        "It sounds like you're managing this anxiety pretty well, even though it's still there."
      ]
    },
    
    sadness: [
      "I can hear the pain in your words. It's okay to feel sad about this.",
      "This sounds really heavy to carry. I'm here to sit with you in this.",
      "Sometimes sadness is our heart's way of honoring what matters to us."
    ],
    
    frustration: [
      "I can feel your frustration, and honestly, it makes total sense given what you're dealing with.",
      "This sounds incredibly frustrating. Anyone would feel fed up with this situation.",
      "Your frustration tells me how much you want things to be different. That's actually hope in disguise."
    ],
    
    hope: [
      "I love hearing that spark of hope in your voice.",
      "That optimism you're feeling? Hold onto that. It's powerful.",
      "There's something beautiful about the hope I'm hearing from you."
    ]
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize session with warm, human greeting
  useEffect(() => {
    if (user && messages.length === 0) {
      initializeSession();
    }
  }, [user]);

  const initializeSession = async () => {
    const timeOfDay = new Date().getHours();
    let greeting = "Hello";
    if (timeOfDay < 12) greeting = "Good morning";
    else if (timeOfDay < 17) greeting = "Good afternoon";
    else greeting = "Good evening";

    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `${greeting}! I'm Dr. Sage, and I'm really glad you're here today. 

I want you to know that this is your space - completely confidential and judgment-free. I'm here to listen, understand, and walk alongside you in whatever you're experiencing.

I specialize in helping people with OCD, anxiety, and the thoughts and feelings that can feel so overwhelming sometimes. I use approaches that research shows really work - things like CBT, ERP therapy, mindfulness, and others - but more than anything, I believe in meeting you exactly where you are.

Before we dive in, I'm curious - how are you feeling right now, in this moment? And what brought you here today? 

Take your time. There's no rush, and whatever you share is exactly what we need to start with. ☕`,
      timestamp: new Date(),
      category: 'general',
      emotion: 'supportive',
      typingDelay: 2000
    };
    
    setMessages([welcomeMessage]);

    // Create session in database
    if (user) {
      const session = await addAiSession({
        session_type: sessionMode,
        messages: [welcomeMessage],
        session_summary: 'Initial warm greeting and rapport building',
        duration: 0
      });
      if (session) {
        setCurrentSessionId(session.id);
      }
    }
  };

  // Analyze user's emotional state and context
  const analyzeUserContext = (message: string): Partial<UserContext> => {
    const lowerMessage = message.toLowerCase();
    const updates: Partial<UserContext> = {};
    
    // Detect mood indicators
    if (lowerMessage.includes('terrible') || lowerMessage.includes('awful')) {
      updates.currentMood = 2;
    } else if (lowerMessage.includes('bad') || lowerMessage.includes('struggling')) {
      updates.currentMood = 3;
    } else if (lowerMessage.includes('okay') || lowerMessage.includes('fine')) {
      updates.currentMood = 5;
    } else if (lowerMessage.includes('good') || lowerMessage.includes('better')) {
      updates.currentMood = 7;
    } else if (lowerMessage.includes('great') || lowerMessage.includes('amazing')) {
      updates.currentMood = 9;
    }

    // Detect communication style preference
    if (lowerMessage.includes('doctor') || lowerMessage.includes('professional')) {
      updates.preferredStyle = 'formal';
    } else if (lowerMessage.includes('casual') || lowerMessage.includes('friend')) {
      updates.preferredStyle = 'casual';
    }

    // Detect strengths
    const strengths: string[] = [];
    if (lowerMessage.includes('trying') || lowerMessage.includes('working on')) {
      strengths.push('motivation');
    }
    if (lowerMessage.includes('therapy') || lowerMessage.includes('help')) {
      strengths.push('help-seeking');
    }
    if (lowerMessage.includes('family') || lowerMessage.includes('friends')) {
      strengths.push('social support');
    }
    if (strengths.length > 0) {
      updates.strengths = [...(userContext.strengths || []), ...strengths];
    }

    return updates;
  };

  // Generate human-like, contextual responses
  const generateHumanResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    const context = analyzeUserContext(userMessage);
    
    // Update user context
    setUserContext(prev => ({ ...prev, ...context }));

    // Simulate human thinking time
    const thinkingTime = 1500 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    // Crisis detection with immediate human response
    if (lowerMessage.includes('hurt myself') || lowerMessage.includes('end it') || lowerMessage.includes('suicide')) {
      return `I'm really concerned about you right now, and I'm so glad you trusted me with these feelings. That takes incredible courage.

First - are you safe right now? Are you somewhere where you won't hurt yourself?

I need you to know that these feelings, as overwhelming as they are, can change. You matter, and your life has value, even when it doesn't feel that way.

**Right now, please reach out:**
• **Call 988** - National Suicide Prevention Lifeline (they're amazing, I promise)
• **Text HOME to 741741** - Crisis Text Line
• **Call 911** if you're in immediate danger

I'm going to stay right here with you. Can you tell me - what's making this feel so impossible right now? Sometimes when we're in this much pain, it helps to just... talk it through with someone who cares.

You don't have to carry this alone. 💙`;
    }

    // Respond to specific OCD presentations with empathy
    if (lowerMessage.includes('contamination') || lowerMessage.includes('germs') || lowerMessage.includes('dirty')) {
      return `Oh, contamination fears... I work with this a lot, and I want you to know first - this isn't about being "clean" or "dirty." This is your brain's alarm system working overtime, and it's exhausting.

I can imagine how isolating this feels. Like, people might see the handwashing or avoiding certain places and think "just stop doing that," but they don't understand that it feels impossible, right? Like your brain is screaming that something terrible will happen if you don't follow the rules.

Here's what I know from years of helping people with this: your brain is trying to protect you, but it's gotten the threat level all wrong. It's like having a smoke detector that goes off when you make toast - technically working, but way too sensitive.

Can you tell me what your contamination fears focus on most? Is it illness, spreading germs to others, or something else? I ask because understanding your specific fears helps me know how to best support you.

And hey - just talking about this here, with me, is actually a form of exposure. You're already being brave. 🌟`;
    }

    if (lowerMessage.includes('checking') || lowerMessage.includes('doubt') || lowerMessage.includes('did I')) {
      return `Ah, the checking... I hear this so often, and every time, my heart goes out to the person because I know how torturous that doubt feels.

It's like your brain becomes this really mean roommate who's constantly asking "But are you SURE you locked the door? Are you REALLY sure? What if you just think you remember but you didn't actually do it?" And then you check, and for maybe 30 seconds you feel relief, but then the doubt creeps back in.

The cruel irony is that checking actually makes your memory confidence worse. It's like your brain says "Well, if you need to check so much, you must not be trustworthy." So unfair.

What I'm curious about - when you're in that moment of doubt, what does your brain tell you will happen if you don't check? Because usually there's this catastrophic story underneath, and understanding that story helps us figure out how to challenge it.

You know what though? The fact that you're here, talking about this, tells me you're ready to start fighting back against that doubt. That's huge. 💪`;
    }

    if (lowerMessage.includes('intrusive') || lowerMessage.includes('bad thoughts') || lowerMessage.includes('horrible thoughts')) {
      return `Intrusive thoughts... oof. These are some of the hardest things to talk about because they feel so shameful, don't they? But I'm really glad you brought this up with me.

First thing I want you to know: having intrusive thoughts doesn't make you a bad person. In fact, the reason these thoughts are so distressing to you is BECAUSE you're a good person. Someone who actually wanted to do harmful things wouldn't be horrified by these thoughts.

Your brain is basically playing the worst game of "What if?" imaginable. It's throwing up these thoughts precisely because they go against everything you value. It's like your brain is testing your moral boundaries, but in the cruelest way possible.

I work with people who have thoughts about harming loved ones, sexual thoughts that horrify them, blasphemous thoughts when they're religious... and every single one of them is a good, caring person whose brain is just being really, really mean.

What kinds of intrusive thoughts are bothering you most? I know it's hard to say them out loud, but sometimes just naming them takes away some of their power. And I promise - nothing you tell me will shock me or change how I see you. 🤗`;
    }

    // Respond to emotional expressions
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much')) {
      return `I can really hear how overwhelmed you're feeling right now. It's like everything is just... too much, too fast, too intense. That's such a hard place to be.

When I'm working with someone who feels this overwhelmed, I always think about putting on the airplane oxygen mask first, you know? We need to get you breathing and grounded before we tackle the bigger stuff.

Right now, in this moment, can you feel your feet on the floor? Can you take one deep breath with me? Sometimes when everything feels chaotic, we need to start really, really small.

What's one thing - just one - that feels manageable today? Maybe it's just getting through the next hour, or making a cup of tea, or even just staying in this conversation with me. We don't need to solve everything today.

You reached out, which means part of you believes things can get better. I believe that too. Let's just focus on right now, together. 🌱`;
    }

    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return `Oh, I can hear how tired you are. Not just sleepy-tired, but that deep, bone-deep exhaustion that comes from fighting your own brain every day. It's like running a marathon that never ends.

OCD is exhausting. Anxiety is exhausting. Having to constantly battle your own thoughts and urges... of course you're tired. Anyone would be.

I want you to know that this tiredness doesn't mean you're weak or giving up. It means you've been fighting really hard for a really long time. That takes incredible strength, even when it doesn't feel like it.

Sometimes when we're this tired, the idea of "getting better" feels overwhelming because it sounds like more work. But here's what I've learned: the right kind of help actually gives you energy back. It's like finally having someone help you carry the heavy backpack you've been lugging around alone.

What would it feel like to have just a little more energy? What would you do with it? Sometimes imagining that can help us remember why the work is worth it. ✨`;
    }

    // Celebrate progress and strengths
    if (lowerMessage.includes('better') || lowerMessage.includes('progress') || lowerMessage.includes('improvement')) {
      return `Wait, hold on - did you just tell me things are getting better? That's HUGE! 🎉

I know it might not feel huge to you, especially if the progress feels slow or inconsistent, but I need you to really hear this: any movement toward feeling better when you're dealing with OCD and anxiety is significant. Your brain is literally rewiring itself.

Tell me more about this progress. What's different? What are you doing that's helping? I want to understand so we can build on it.

And can I just say - I love that you're noticing the improvement. Sometimes we get so focused on what's still hard that we miss the wins. The fact that you can see progress tells me you're developing some really healthy perspective.

You should be proud of yourself. Seriously. Recovery isn't a straight line, and every step forward matters, even the tiny ones. What feels most different for you right now? 🌟`;
    }

    // Default empathetic, conversational response
    const acknowledgment = conversationalPatterns.acknowledgments[Math.floor(Math.random() * conversationalPatterns.acknowledgments.length)];
    const validation = conversationalPatterns.validations[Math.floor(Math.random() * conversationalPatterns.validations.length)];
    
    return `${acknowledgment} ${validation}

What you're sharing really resonates with me. I can hear both the struggle and the strength in your words, and I want you to know that both are completely valid.

${lowerMessage.includes('help') || lowerMessage.includes('what do I do') ? 
  `It sounds like you're looking for some direction, which makes total sense. Sometimes when we're in the thick of it, it's hard to see the path forward.` :
  `I'm really glad you felt comfortable sharing this with me.`}

${userContext.currentMood <= 4 ? 
  `I can sense this is a really difficult time for you. That's okay - we don't have to fix everything today. Sometimes just being heard and understood is the first step.` :
  `I'm hearing some resilience in how you're approaching this, which gives me a lot of hope.`}

Can you tell me a bit more about what this experience is like for you day-to-day? I'm particularly interested in ${lowerMessage.includes('work') ? 'how this affects your work life' : 
lowerMessage.includes('family') || lowerMessage.includes('relationship') ? 'how this impacts your relationships' :
lowerMessage.includes('sleep') ? 'how this affects your sleep and daily routine' :
'what a typical day looks like when you\'re struggling with this'}.

I'm here, and I'm listening. Take your time. 💙`;
  };

  // Simulate realistic typing with pauses
  const simulateTyping = async (message: string, delay: number = 2000) => {
    setIsTyping(true);
    
    const typingMessages = [
      "thinking about what you shared...",
      "considering the best way to respond...",
      "reflecting on your experience...",
      "processing this with care..."
    ];
    
    const typingMessage = typingMessages[Math.floor(Math.random() * typingMessages.length)];
    setTypingText(typingMessage);
    
    // Simulate variable typing speed
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setIsTyping(false);
    setTypingText('');
  };

  const sendMessage = async (content: string, category?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      category: category as any
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      // Simulate human-like thinking and typing
      await simulateTyping(content);

      // Generate human-like response
      const aiResponse = await generateHumanResponse(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category: category as any,
        emotion: content.toLowerCase().includes('crisis') ? 'concerned' : 
                content.toLowerCase().includes('better') ? 'celebratory' : 'empathetic'
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update session in database
      if (currentSessionId && user) {
        const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000 / 60);
        await updateAiSession(currentSessionId, {
          messages: [...messages, userMessage, aiMessage],
          duration: sessionDuration,
          session_summary: `Therapeutic conversation - ${messages.length + 2} exchanges. Mood: ${userContext.currentMood}/10`
        });
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm so sorry - I'm having some technical difficulties right now. This is frustrating, I know, especially when you're reaching out for support.\n\nIf this is urgent, please don't hesitate to contact:\n• 988 - National Suicide Prevention Lifeline\n• Text HOME to 741741\n• Your local emergency services\n\nI should be back up and running in just a moment. Thank you for your patience. 💙",
        timestamp: new Date(),
        emotion: 'concerned'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const conversationalPrompts = [
    {
      text: "I'm having a really hard time with intrusive thoughts today",
      category: 'cbt' as const,
      icon: Brain,
      emotion: 'concerned'
    },
    {
      text: "Can you help me understand why I keep checking things?",
      category: 'general' as const,
      icon: MessageCircle,
      emotion: 'curious'
    },
    {
      text: "I'm feeling overwhelmed and don't know where to start",
      category: 'crisis' as const,
      icon: Heart,
      emotion: 'supportive'
    },
    {
      text: "I think I made some progress this week",
      category: 'general' as const,
      icon: Smile,
      emotion: 'celebratory'
    },
    {
      text: "My family doesn't understand what I'm going through",
      category: 'general' as const,
      icon: Heart,
      emotion: 'empathetic'
    },
    {
      text: "I'm ready to try some exposure exercises",
      category: 'erp' as const,
      icon: Target,
      emotion: 'encouraging'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 max-w-md mx-auto">
          <Brain size={48} className="mx-auto mb-4 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Sign In to Meet Dr. Sage</h3>
          <p className="text-purple-600 text-sm">
            Connect with your personal AI therapist for warm, human-like support and evidence-based guidance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Dr. Sage</h2>
        <p className="text-slate-600">Your Personal AI Therapist • Warm, Human-Like Support</p>
      </div>

      {/* Session Mood & Context */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Coffee size={16} className="text-amber-600" />
              <span className="text-sm text-slate-600">
                Session started {sessionStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {userContext.currentMood && (
              <div className="flex items-center space-x-2">
                <Heart size={16} className="text-pink-600" />
                <span className="text-sm text-slate-600">
                  Current mood: {userContext.currentMood}/10
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Dr. Sage is online</span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white p-4 rounded-2xl rounded-br-md'
                    : 'space-y-3'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain size={20} className="text-white" />
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-md">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-semibold text-slate-800">Dr. Sage</span>
                        {message.emotion && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            message.emotion === 'supportive' ? 'bg-blue-100 text-blue-700' :
                            message.emotion === 'encouraging' ? 'bg-green-100 text-green-700' :
                            message.emotion === 'concerned' ? 'bg-red-100 text-red-700' :
                            message.emotion === 'celebratory' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {message.emotion}
                          </span>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                        {message.content}
                      </div>
                    </div>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                )}
                
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-purple-200 text-right' : 'text-slate-500 ml-13'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Brain size={20} className="text-white" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-800">Dr. Sage</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      thinking
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader className="animate-spin" size={16} className="text-purple-600" />
                    <span className="text-sm text-slate-600 italic">{typingText}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Conversation Starters */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">💬 Not sure how to start? Try one of these:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {conversationalPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={index}
                    onClick={() => sendMessage(prompt.text, prompt.category)}
                    className="flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left group"
                  >
                    <Icon size={16} className="text-purple-600 group-hover:text-purple-700" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-800">{prompt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-slate-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Share whatever's on your mind..."
              className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Dr. Sage responds with warmth, empathy, and evidence-based guidance
          </p>
        </form>
      </div>

      {/* Human-Like AI Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">🤗 About Dr. Sage</h3>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Dr. Sage is designed to feel like talking to a real therapist - warm, empathetic, and genuinely caring. 
          Using advanced AI, Dr. Sage provides personalized, human-like responses that adapt to your communication style and emotional needs.
        </p>
        <p className="text-slate-700 text-sm">
          <strong>Remember:</strong> While Dr. Sage offers sophisticated therapeutic support, this complements but doesn't replace professional human care. 
          For crisis situations or complex needs, please reach out to licensed mental health professionals.
        </p>
      </div>
    </div>
  );
};

export default AiPsychologist;