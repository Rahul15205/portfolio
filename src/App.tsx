import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  Github, 
  ExternalLink, 
  Cpu, 
  Database,
  Globe,
  Mail,
  Braces,
  Coffee,
  Send
} from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [typedText, setTypedText] = useState('');
  const textToType = 'JSS developer = {';
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_7ct8fma',
        'template_nphwwf2',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Rahul kumar',
          reply_to: formData.email,
        },
        '-Edlelp14_pTC2PXB'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(prev => prev + textToType[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Terminal className="w-6 h-6 text-emerald-400" />
              <span className="font-mono text-lg">~/portfolio</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Rahul15205" target="_blank" rel="noopener noreferrer" 
                className="hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:rahulkumarshukla4627@gmail.com" 
                className="hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-bold mb-6">
            <span className="text-emerald-400">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            {'name: "Rahul Kumar",\n'}<br />
            {'title: "Full Stack Developer",\n'}<br />
            {'location: "Lucknow"\n'}<br />
            {'}'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* IDE-like Tabs */}
        <div className="bg-gray-800 rounded-t-lg border border-gray-700">
          <div className="flex border-b border-gray-700">
            {['about', 'projects', 'skills', 'experience'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-mono text-sm ${
                  activeTab === tab 
                    ? 'bg-gray-900 text-emerald-400 border-t-2 border-emerald-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}.js
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-mono text-emerald-400 mb-4">
                  <Code2 className="inline-block mr-2 mb-1" />
                  About Me
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate full-stack developer with a love for clean code and innovative solutions. 
                  With expertise in modern web technologies, I create efficient, scalable, and user-friendly applications.
                </p>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Coffee className="w-4 h-4" />
                  <span>Powered by chai and curiosity</span>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard 
                  title="Student Assistance program"
                  description="A real-time collaboration platform built with React and MongoDb"
                  tech={['React', 'Node.js', 'Express', 'MongoDB']}
                  link="https://github.com/Rahul15205/Faculty-Appointment-System"
                />
                <ProjectCard 
                  title="Instagram clone"
                  description="Social Media clone where you can post image comment,like and follow."
                  tech={['React', 'Firebase', 'Javascript', 'Node.js']}
                  link="https://github.com/Rahul15205/insta-clone"
                />
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <SkillCategory 
                  icon={<Globe className="w-5 h-5" />}
                  title="Frontend"
                  skills={['React', 'TypeScript', 'Tailwind CSS', 'Next.js']}
                />
                <SkillCategory 
                  icon={<Database className="w-5 h-5" />}
                  title="Backend"
                  skills={['Node.js', 'Express', 'MongoDb', 'Cloudinary']}
                />
                <SkillCategory 
                  icon={<Cpu className="w-5 h-5" />}
                  title="DevOps"
                  skills={['Docker', 'AWS', 'CI/CD', 'Kubernetes']}
                />
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                <ExperienceItem 
                  title="Senior Developer"
                  company="Tech Corp"
                  period="2021 - Present"
                  description="Leading full-stack development of enterprise applications"
                />
                <ExperienceItem 
                  title="Software Engineer"
                  company="Startup Inc"
                  period="2018 - 2021"
                  description="Developed scalable microservices architecture"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 bg-gray-800 rounded-lg border border-gray-700 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-mono text-emerald-400">Get in Touch</h2>
              <p className="text-gray-400 mt-2">Have a question or want to work together?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-100"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-100"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-100 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-colors
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </span>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-md text-green-400 text-center">
                  Message sent successfully!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-md text-red-400 text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Braces className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-gray-400 font-mono">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-emerald-400 transition-colors">
      <h3 className="text-xl font-mono text-emerald-400 mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span key={i} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-emerald-400">
            {t}
          </span>
        ))}
      </div>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300"
      >
        <Github className="w-4 h-4 mr-1" />
        View Code
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}

interface SkillCategoryProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

function SkillCategory({ icon, title, skills }: SkillCategoryProps) {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-3 text-emerald-400">
        {icon}
        <h3 className="font-mono text-lg">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span 
            key={i}
            className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

function ExperienceItem({ title, company, period, description }: ExperienceItemProps) {
  return (
    <div className="border-l-2 border-emerald-400 pl-4">
      <h3 className="font-mono text-lg text-emerald-400">{title}</h3>
      <div className="text-gray-400 mb-2">
        <span className="font-medium">{company}</span>
        <span className="mx-2">•</span>
        <span className="text-sm">{period}</span>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default App;