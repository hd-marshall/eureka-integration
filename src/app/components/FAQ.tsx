'use client';

import React, { useState } from 'react';

const FAQComponent: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is Eureka Integration?",
      answer: "Eureka Integration is a full-service software engineering company specialising in custom web applications, mobile development, and cloud infrastructure. We partner with businesses of all sizes to design, build, and deliver software that solves real problems and drives growth."
    },
    {
      question: "Who do you typically work with?",
      answer: "We work with startups, SMEs, and larger enterprises across a range of industries. This includes businesses building their first digital product, companies looking to modernise legacy systems, and organisations that need a trusted technical partner to deliver software on their behalf."
    },
    {
      question: "What services do you provide?",
      answer: "We offer full-stack web development, mobile app development (iOS/Android), cloud infrastructure setup and management, API development, database design, UI/UX design, DevOps services, and ongoing maintenance and support for existing applications."
    },
    {
      question: "How does your development process work – will you walk me through it?",
      answer: "Our process starts with discovery and requirements gathering, followed by system architecture design, UI/UX mockups, development in iterative sprints, rigorous testing phases, deployment to production, and ongoing support. We maintain transparent communication throughout with regular demos and progress updates."
    },
    {
      question: "Which technologies and frameworks do you specialise in?",
      answer: "Our expertise spans React, Next.js, Node.js, Python, TypeScript, AWS/Azure cloud platforms, PostgreSQL, MongoDB, Docker, Kubernetes, and modern CI/CD pipelines. We stay current with emerging technologies and choose the best tech stack for each project's specific requirements."
    },
    {
      question: "What are the typical project timelines and costs?",
      answer: "Project timelines vary from 6–8 weeks for simple applications to 6+ months for complex enterprise solutions. Costs depend on scope, complexity, and features required. We provide detailed estimates after our discovery phase and offer both fixed-price and time-and-materials engagement models."
    }
  ];

  const toggleQuestion = (index: number): void => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl py-16 mx-auto bg-brand-background">
      <div className="space-y-0">
        {faqData.map((item, index) => (
          <div key={index} className="group">
            {/* Separator Line */}
            <div className="h-px w-full bg-brand-navy transition-colors duration-200" />
            
            {/* Question Row */}
            <div
              className="flex items-center justify-between py-6 px-8 cursor-pointer transition-all duration-200 group-hover:translate-x-2"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-lg font-nunito-sans font-medium text-gray-800 pr-8 flex-grow">
                {item.question}
              </span>
              
              {/* Fixed Size Button Container */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full border-2 border-brand-navy bg-transparent transition-all duration-200 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent relative">
                  {/* CSS Arrow - Default state */}
                  <div 
                    className={`w-0 h-0 border-l-[8px] border-r-0 border-t-[5px] border-b-[5px] border-l-brand-navy border-t-transparent border-b-transparent transition-all duration-200 group-hover:opacity-0 ${
                      openQuestion === index ? 'rotate-90' : ''
                    }`}
                  />
                  {/* CSS Arrow - Hover state */}
                  <div 
                    className={`w-0 h-0 border-l-[8px] border-r-0 border-t-[5px] border-b-[5px] border-l-white border-t-transparent border-b-transparent absolute transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                      openQuestion === index ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Final separator line */}
        <div className="h-px w-full bg-brand-navy" />
      </div>
    </div>
  );
};

export default FAQComponent;