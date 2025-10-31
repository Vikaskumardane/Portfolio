import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What\'s your typical project timeline?",
      answer: `Project timelines vary based on complexity and scope. Here's a general breakdown:\n\n• Simple websites: 2-4 weeks\n• Web applications: 6-12 weeks\n• Complex platforms: 3-6 months\n• API development: 4-8 weeks\n\nI provide detailed timeline estimates after our initial consultation and requirements gathering.`
    },
    {
      question: "Do you work with international clients?",
      answer: `Absolutely! I work with clients worldwide and have experience collaborating across different time zones. I'm flexible with meeting times and use various communication tools like Slack, Teams, and Zoom to ensure smooth collaboration regardless of location.`
    },
    {
      question: "What technologies do you specialize in?",
      answer: `My core expertise includes:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Express, Python, Django\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Vercel, Docker\n• Mobile: React Native\n\nI stay current with the latest technologies and can adapt to your existing tech stack.`
    },
    {
      question: "How do you handle project communication?",
      answer: `I believe in transparent, regular communication:\n\n• Weekly progress updates via email\n• Bi-weekly video calls for feedback\n• Real-time chat via Slack or Teams\n• Shared project dashboard for tracking\n• Detailed documentation throughout\n\nYou'll always know the project status and next steps.`
    },
    {
      question: "What\'s included in your development process?",
      answer: `My comprehensive process includes:\n\n• Requirements analysis & planning\n• UI/UX design consultation\n• Development with regular previews\n• Testing & quality assurance\n• Deployment & launch support\n• 30-day post-launch support\n• Documentation & training\n\nEverything needed for a successful project launch.`
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer: `Yes! I offer various maintenance packages:\n\n• Security updates & monitoring\n• Performance optimization\n• Feature enhancements\n• Bug fixes & troubleshooting\n• Content updates\n• Analytics & reporting\n\nI can discuss the best maintenance plan for your specific needs.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
      <div className="mb-8">
        <h3 className="font-headline text-2xl text-foreground mb-2">
          Frequently Asked Questions
        </h3>
        <p className="text-muted-foreground">
          Common questions about working together and my development process
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-cosmic"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/10 transition-cosmic"
            >
              <h4 className="font-semibold text-foreground pr-4">
                {faq?.question}
              </h4>
              <Icon
                name={openFAQ === index ? "ChevronUp" : "ChevronDown"}
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
            </button>
            
            {openFAQ === index && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4">
                  {faq?.answer?.split('\n')?.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {line}
                        </p>
                      )}
                      {lineIndex < faq?.answer?.split('\n')?.length - 1 && line && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Have a different question?
            </h4>
            <p className="text-muted-foreground text-sm mb-3">
              Don't see your question here? Feel free to reach out directly and I'll be happy to provide more specific information about your project needs.
            </p>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary hover:text-primary/80 text-sm font-semibold transition-cosmic"
            >
              Ask your question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;