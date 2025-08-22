#  RESUMIND - AI Powered Resume Analyzer

Build an intelligent Resume Analyzer with React, React Router, and Puter.js! This application implements seamless authentication, resume upload and storage capabilities, and smart AI-powered candidate-to-job matching with custom feedback and ATS scores—all wrapped in a clean, modern UI.

## ⚙️ Tech Stack

- **React** - Popular open-source JavaScript library for building user interfaces using reusable components and virtual DOM
- **React Router v7** - Advanced routing library with nested routes, data loaders/actions, error boundaries, and code splitting
- **Puter.js** - Tiny client-side SDK providing serverless auth, storage, database, and AI capabilities directly in the browser
- **Puter.com** - Advanced, open-source internet operating system for privacy-first personal cloud storage
- **Tailwind CSS** - Utility-first CSS framework for rapid custom UI development
- **TypeScript** - JavaScript superset with static typing for better code quality and error detection
- **Vite** - Fast build tool and dev server with instant startup and hot-module replacement
- **Zustand** - Minimal, hook-based state management library with zero boilerplate

## 🔋 Features

👉 **Easy & convenient auth** - Handle authentication entirely in the browser using Puter.js—no backend or setup required

👉 **Resume upload & storage** - Let users upload and store all their resumes in one place, safely and reliably

👉 **AI resume matching** - Provide a job listing and get an ATS score with custom feedback tailored to each resume

👉 **Reusable, modern UI** - Built with clean, consistent components for a great-looking and maintainable interface

👉 **Code Reusability** - Leverage reusable components and a modular codebase for efficient development

👉 **Cross-Device Compatibility** - Fully responsive design that works seamlessly across all devices

👉 **Modern UI/UX** - Clean, responsive design built with Tailwind CSS and shadcn/ui for a sleek user experience

And many more, including advanced code architecture and component reusability patterns.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Puter.js configuration and any required API keys to the `.env.local` file.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 🚀 Usage

### Authentication
- Users can sign up and log in using Puter.js authentication
- No backend setup required - everything runs in the browser

### Resume Management
- Upload multiple resume files (PDF, DOC, DOCX formats supported)
- Store resumes securely using Puter.js cloud storage
- View and manage all uploaded resumes in one dashboard

### AI-Powered Job Matching
- Input job descriptions or requirements
- Get AI-generated ATS compatibility scores
- Receive detailed feedback and suggestions for resume improvements
- Compare multiple resumes against the same job listing


## 🎯 Core Components

- **AuthProvider** - Manages user authentication state with Puter.js
- **ResumeUploader** - Handles file uploads and storage
- **JobMatcher** - AI-powered resume analysis and scoring
- **ATSScoreCard** - Displays compatibility scores and feedback
- **Dashboard** - Central hub for resume management

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
```

## 📖 API Integration

This project uses Puter.js for:
- **Authentication** - User signup, login, and session management
- **File Storage** - Secure resume upload and retrieval
- **AI Services** - Resume analysis and job matching capabilities

## 🎨 UI Components

Built with shadcn/ui components including:
- Forms and input validation
- File upload interfaces
- Progress indicators
- Score visualization
- Responsive layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Puter.js](https://puter.com/) for providing serverless backend capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- The React and open-source community for amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/sengaraditya/ai-resume-analyzer/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

Made with ❤️ by Aditya Singh Sengar. 
