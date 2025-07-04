# Hope for OCD - Recovery Support App

A comprehensive Progressive Web App (PWA) designed to support individuals on their OCD recovery journey with evidence-based tools, AI support, and community features.

## 🌟 Features

### Core Functionality
- **Hope Stories**: Inspiring real recovery stories from people who've overcome OCD
- **AI Psychologist (Dr. Sage)**: Human-like therapeutic conversations with advanced AI
- **Mood Tracking**: Daily mood and anxiety level monitoring with pattern recognition
- **Thought Records**: CBT-based thought challenging exercises
- **ERP Tracker**: Exposure and Response Prevention session logging with progress tracking
- **Crisis Toolkit**: Immediate support tools for difficult moments
- **Meditation Center**: Guided meditations specifically for OCD and anxiety
- **Sleep Center**: Sleep stories and tools for better rest
- **Coping Strategies**: Evidence-based techniques for managing symptoms
- **Education Library**: Expert-created content about OCD and treatment
- **Community Support**: Anonymous peer support and encouragement
- **Progress Tracking**: Visual progress monitoring and achievements

### Advanced Features
- **Offline Support**: Core features work without internet connection
- **Data Export**: Export your data in JSON or CSV format
- **Accessibility Settings**: Customizable font sizes, high contrast, reduced motion
- **Privacy Controls**: Granular privacy settings and data retention options
- **Smart Notifications**: Helpful reminders and encouragement
- **Performance Monitoring**: Optimized for speed and reliability

### PWA Features
- **Installable**: Can be installed on phones, tablets, and computers
- **Offline Support**: Core features work without internet connection
- **Push Notifications**: Reminders and encouragement (when enabled)
- **Native App Feel**: Full-screen experience with app-like navigation
- **Cross-Platform**: Works on iOS, Android, Windows, macOS, and Linux

## 🚀 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom accessibility features
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Authentication**: Supabase Auth with email/password
- **PWA**: Service Worker with offline caching and background sync
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

## 📱 Installation

### On Mobile (iOS/Android)
1. Open the app in your mobile browser
2. Look for the "Install" banner at the bottom
3. Tap "Install App" or use your browser's "Add to Home Screen" option
4. The app will appear on your home screen like a native app

### On Desktop (Windows/Mac/Linux)
1. Open the app in Chrome, Edge, or another PWA-compatible browser
2. Look for the install icon in the address bar
3. Click "Install Hope for OCD"
4. The app will be added to your applications and can be launched independently

### Manual Installation
If you don't see the install prompt:
- **Chrome/Edge**: Click the menu (⋮) → "Install Hope for OCD"
- **Safari (iOS)**: Tap Share → "Add to Home Screen"
- **Firefox**: Look for the install icon in the address bar

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Electron Desktop App
```bash
# Development
npm run electron-dev

# Build desktop app
npm run build-electron
```

## 🗄️ Database Schema

The app uses Supabase with the following main tables:
- `profiles` - User profiles and settings
- `mood_entries` - Daily mood and anxiety tracking
- `thought_records` - CBT thought challenging exercises
- `erp_sessions` - Exposure and Response Prevention tracking
- `ai_sessions` - AI psychologist conversation history
- `meditation_sessions` - Meditation and mindfulness tracking
- `sleep_sessions` - Sleep aid usage tracking
- `crisis_logs` - Crisis toolkit usage for insights
- `achievements` - Progress badges and milestones
- `education_progress` - Learning content completion

## 🔒 Privacy & Security

### Data Protection
- **End-to-End Encryption**: All personal data is encrypted in transit and at rest
- **Local-First**: Core features work offline with local data storage
- **No Data Selling**: We never sell or share personal data with third parties
- **GDPR Compliant**: Full control over your data with export/delete options
- **Anonymous Options**: Use the app without creating an account

### Security Features
- **Row Level Security (RLS)**: Database-level access controls
- **Secure Authentication**: Supabase Auth with industry-standard security
- **Content Security Policy**: Protection against XSS attacks
- **Regular Security Audits**: Ongoing security monitoring and updates

## ♿ Accessibility

### Built-in Accessibility Features
- **Screen Reader Support**: Full ARIA labels and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast Mode**: Enhanced visibility for low vision users
- **Adjustable Font Sizes**: Customizable text sizing (12px-24px)
- **Reduced Motion**: Respect for motion sensitivity preferences
- **Focus Management**: Clear focus indicators and logical tab order

### Compliance
- **WCAG 2.1 AA**: Meets Web Content Accessibility Guidelines
- **Section 508**: Compliant with US federal accessibility standards
- **ADA**: Designed to meet Americans with Disabilities Act requirements

## 🌍 Internationalization

Currently available in English with plans for:
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Portuguese (Português)
- Japanese (日本語)

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Responsive images with proper sizing
- **Caching Strategy**: Intelligent caching for offline support
- **Performance Monitoring**: Real-time performance tracking

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Crisis Support

If you're in crisis or having thoughts of self-harm:
- **Call 988** - National Suicide Prevention Lifeline (US)
- **Text HOME to 741741** - Crisis Text Line
- **Call 911** - Emergency services
- **International**: Contact your local emergency services

## 📞 Support & Feedback

- **In-App Support**: Use the feedback option in settings
- **Email**: support@hopeforocd.app
- **Community**: Join our support forum
- **Bug Reports**: Use GitHub issues for technical problems

## 🏥 Professional Resources

This app complements but doesn't replace professional treatment. For comprehensive care:
- **Find a Therapist**: International OCD Foundation directory
- **OCD Specialists**: [IOCDF.org](https://iocdf.org)
- **Medication Consultation**: Consult with a psychiatrist
- **Intensive Programs**: Residential and outpatient options

## 🌈 About Hope for OCD

Hope for OCD was created by a team of mental health professionals, people with lived experience of OCD, and technology experts. Our mission is to make evidence-based OCD support accessible to everyone, everywhere.

**Remember**: Recovery is possible. You are not alone. There is hope.

---

*Hope for OCD - Your Recovery Support Companion*

**Version**: 1.1.0  
**Last Updated**: December 2024  
**Compatibility**: iOS 12+, Android 8+, Chrome 80+, Firefox 75+, Safari 13+, Edge 80+