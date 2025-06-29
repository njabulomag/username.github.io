import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Shield, Plus, Flag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const CommunitySupport: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: 'all', name: 'All Posts', icon: '💬' },
    { id: 'support', name: 'Support', icon: '🤗' },
    { id: 'success', name: 'Success Stories', icon: '🎉' },
    { id: 'tips', name: 'Tips & Advice', icon: '💡' },
    { id: 'questions', name: 'Questions', icon: '❓' }
  ];

  // Mock community posts (in real app, these would come from database)
  const communityPosts = [
    {
      id: '1',
      anonymous_id: 'Anonymous_Warrior_123',
      content: "Had my first successful ERP session today! I touched a doorknob and didn't wash my hands for 30 minutes. It was terrifying but I did it. The anxiety did go down eventually, just like my therapist said it would. To anyone starting ERP - it really does work, even when it feels impossible. 💪",
      post_type: 'success',
      likes_count: 24,
      created_at: '2024-01-15T10:30:00Z',
      replies: 8
    },
    {
      id: '2',
      anonymous_id: 'HopeSeeker_456',
      content: "Does anyone else struggle with 'just right' feelings? I keep rearranging things until they feel perfect and it's taking hours out of my day. My therapist says this is symmetry OCD but I'm having trouble with the exposures. Any tips for sitting with that uncomfortable feeling?",
      post_type: 'questions',
      likes_count: 12,
      created_at: '2024-01-14T15:45:00Z',
      replies: 15
    },
    {
      id: '3',
      anonymous_id: 'RecoveryJourney_789',
      content: "6 months into ERP therapy and I want to share what's helped me the most: 1) Starting with easier exposures and building up, 2) Having a support person who understands, 3) Celebrating small wins, 4) Being patient with setbacks. Recovery isn't linear but it's possible! ✨",
      post_type: 'tips',
      likes_count: 31,
      created_at: '2024-01-13T09:20:00Z',
      replies: 6
    },
    {
      id: '4',
      anonymous_id: 'BraveHeart_321',
      content: "Feeling overwhelmed today. The intrusive thoughts are really loud and I'm struggling not to do my compulsions. Just needed to share this somewhere safe. Thank you all for being here. This community means so much to me. 💙",
      post_type: 'support',
      likes_count: 18,
      created_at: '2024-01-12T20:15:00Z',
      replies: 12
    },
    {
      id: '5',
      anonymous_id: 'TherapyGrad_654',
      content: "I graduated from intensive OCD therapy today! 🎓 Two years ago I couldn't leave my house without checking the stove 50 times. Today I left for my celebration dinner and only checked once. To everyone still fighting - please don't give up. You are stronger than your OCD.",
      post_type: 'success',
      likes_count: 47,
      created_at: '2024-01-11T16:30:00Z',
      replies: 20
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.post_type === selectedCategory);

  const submitPost = () => {
    if (!newPostContent.trim()) return;
    
    // In real app, this would save to database
    console.log('New post:', newPostContent);
    setNewPostContent('');
    setShowNewPost(false);
  };

  const getPostTypeColor = (type: string) => {
    const colors = {
      support: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      tips: 'bg-purple-100 text-purple-800',
      questions: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPostTypeEmoji = (type: string) => {
    const emojis = {
      support: '🤗',
      success: '🎉',
      tips: '💡',
      questions: '❓'
    };
    return emojis[type as keyof typeof emojis] || '💬';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-8 max-w-md mx-auto">
          <Users size={48} className="mx-auto mb-4 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Sign In for Community Support</h3>
          <p className="text-purple-600 text-sm">
            Join our anonymous, supportive community to share experiences and connect with others on similar journeys.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Community Support</h2>
        <p className="text-slate-600">Connect with others who understand your journey</p>
      </div>

      {/* Community Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-blue-800">Community Guidelines</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-1">
            <li>• Be kind and supportive to all members</li>
            <li>• No medical advice - share experiences only</li>
            <li>• Respect anonymity and privacy</li>
          </ul>
          <ul className="space-y-1">
            <li>• No graphic details of compulsions</li>
            <li>• Report inappropriate content</li>
            <li>• Focus on hope and recovery</li>
          </ul>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Browse Posts</h3>
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} />
            <span>New Post</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-lg mb-1">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6 animate-in fade-in duration-300">
            <h4 className="font-semibold text-slate-800 mb-3">Share with the community</h4>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your experience, ask a question, or offer support... Remember, this is anonymous and moderated for safety."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={4}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-slate-500">
                Posts are reviewed before appearing publicly
              </p>
              <div className="space-x-2">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPost}
                  disabled={!newPostContent.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.anonymous_id.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{post.anonymous_id}</div>
                    <div className="text-sm text-slate-500">{formatTimeAgo(post.created_at)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPostTypeColor(post.post_type)}`}>
                    {getPostTypeEmoji(post.post_type)} {post.post_type}
                  </span>
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <Flag size={14} />
                  </button>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">{post.content}</p>

              <div className="flex items-center space-x-6 pt-3 border-t border-slate-100">
                <button className="flex items-center space-x-2 text-slate-600 hover:text-red-600 transition-colors">
                  <Heart size={16} />
                  <span className="text-sm">{post.likes_count}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
                  <MessageCircle size={16} />
                  <span className="text-sm">{post.replies} replies</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Resources */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">🌟 Remember</h3>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          This community is here to provide peer support and encouragement. While sharing experiences can be incredibly helpful, 
          please remember that community advice is not a substitute for professional treatment.
        </p>
        <p className="text-slate-700 text-sm">
          <strong>In crisis?</strong> Please reach out to a mental health professional or crisis hotline immediately. 
          Your safety and wellbeing are the top priority.
        </p>
      </div>
    </div>
  );
};

export default CommunitySupport;