import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Certifications = () => {
  const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    status: "Active",
    logo: "https://images.unsplash.com/photo-1629640341147-e597cad2840e",
    logoAlt: "AWS certification badge with orange and white cloud architecture symbol",
    description: "Expertise in designing distributed systems and scalable applications on AWS cloud platform",
    skills: ["Cloud Architecture", "EC2 & S3", "Lambda Functions", "RDS & DynamoDB"],
    link:"https://cp.certmetrics.com/amazon/en/public/verify/credential/545b3ddb8e984596b66d48c59761afbd"
  },
  {
    id: 2,
    title: "Meta Front-End Developer Certificate",
    issuer: "Meta via Coursera",
    date: "2023",
    status: "Completed",
    logo: "https://images.unsplash.com/photo-1644035525244-893298c05355",
    logoAlt: "Meta certification logo featuring blue gradient with modern geometric design",
    description: "Comprehensive program covering React, JavaScript, and modern front-end development practices",
    skills: ["React Development", "JavaScript ES6+", "UI/UX Design", "Version Control"],
    link:"https://www.coursera.org/account/accomplishments/verify/DC8MNG9P86F2?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course"
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    issuer: "Coursera Specialization",
    date: "2023",
    status: "Completed",
    logo: "https://images.unsplash.com/photo-1686628120260-a8c2d40d9f8b",
    logoAlt: "Coursera certificate badge with blue and white academic achievement symbol",
    description: "End-to-end web development covering both frontend and backend technologies",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    link:"https://www.coursera.org/account/accomplishments/certificate/2RVCH9WUCSFC"
  }];


  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
          <Icon name="Award" size={16} className="text-primary mr-2" />
          <span className="text-sm font-mono text-primary">Professional Certifications</span>
        </div>
        <h3 className="text-2xl font-headline text-foreground">
          Validated Technical Expertise
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Continuous learning and professional development through industry-recognized certifications and specialized training programs.
        </p>
      </div>
      {/* Certifications Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {certifications?.map((cert) =>
        <div
          key={cert?.id}
          className="group relative p-6 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-cosmic">

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <div className={`px-2 py-1 rounded-full text-xs font-mono ${
            cert?.status === 'Active' ? 'bg-success/20 text-success border border-success/30' : 'bg-primary/20 text-primary border border-primary/30'}`
            }>
                {cert?.status}
              </div>
            </div>

            {/* Certification Logo */}
            <div className="mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden cosmic-shadow group-hover:cosmic-glow transition-cosmic">
                <Image
                src={cert?.logo}
                alt={cert?.logoAlt}
                className="w-full h-full object-cover" />

              </div>
            </div>

            {/* Certification Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-body font-semibold text-foreground group-hover:text-primary transition-cosmic">
                  {cert?.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Building" size={14} />
                  <span>{cert?.issuer}</span>
                  <span>•</span>
                  <span>{cert?.date}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert?.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cert?.skills?.map((skill, index) =>
              <span
                key={index}
                className="px-2 py-1 text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20 rounded">

                    {skill}
                  </span>
              )}
              </div>
            </div>

            {/* Verification Link */}
            <div className="mt-6 pt-4 border-t border-border">
              < a  href={cert?.link} target="_blank"
    rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-cosmic">
                <Icon name="ExternalLink" size={14} />
                <span>View Certificate</span>
              </a>
            </div>
          </div>
        )}
      </div>
      {/* Learning Philosophy */}
      <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" size={24} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-body font-semibold text-foreground">
              Continuous Learning Commitment
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Technology evolves rapidly, and staying current requires dedication to continuous learning. These certifications represent not just completed courses, but ongoing commitments to excellence and professional growth in an ever-changing digital landscape.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default Certifications;