import React, { useState, useEffect, useRef } from "react";
import profileImage from "./assets/mark-morales.jpg";
import html2pdf from "html2pdf.js";

const Resume = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsLoaded(true);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const skills = [
    { name: "Account Management", level: 95 },
    { name: "Sales & Territory Management", level: 90 },
    { name: "Planning & Development", level: 88 },
    { name: "People Management", level: 92 },
  ];

  const experiences = [
    {
      title: "Business Development Manager",
      company: "TDT Powersteel Corp.",
      period: "Mar. 2025 – Present",
      description:
        "Responsible for creating revenue opportunities by opening new markets, structuring profitable deals, and converting non-performing or idle assets into scalable, margin-positive business.",
      current: true,
    },
    {
      title: "Sales Manager",
      company: "TDT Powersteel Corp.",
      period: "July 2021 – Feb. 2025",
      description: "",
    },
    {
      title: "Market Intel and Bus. Dev. Manager",
      company: "Fortem Cement Corp.",
      period: "Mar. 2021 – July 2021",
      description: "",
    },
    {
      title: "Regional Sales Manager (GT Central Luzon)",
      company: "Matimco, Inc.",
      period: "Jan. 2019 – Nov. 2020",
      description: "",
    },
    {
      title: "Sales Information Manager",
      company: "Matimco, Inc.",
      period: "Nov. 2016 – Dec. 2018",
      description: "",
    },
    {
      title: "GT Sales Information Analyst",
      company: "Matimco, Inc.",
      period: "Feb. 2013 – Oct. 2016",
      description: "",
    },
    {
      title: "Managing Assistant",
      company: "GreenHearts, Inc.",
      period: "June 2011 – Oct. 2012",
      description: "",
    },
  ];

  const education = [
    {
      institution: "University of Caloocan City",
      degree: "Bachelor of Science in Business Administration",
      major: "Major in Financial Management",
      period: "2007 - 2011",
    },
    {
      institution: "San Jose Del Monte National High School",
      period: "2003 - 2007",
    },
    {
      institution: "Muzon Pabahay Elementary School",
      period: "1997 - 2003",
    },
  ];

  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: "Mark_Jeffrey_Morales_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mark Jeffrey Morales' Resume",
          text: "Check out Mark Jeffrey Morales' resume.",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        alert(
          "Unable to share. Please copy the link manually: " +
            window.location.href,
        );
      }
    }
  };

  return (
    <div
      ref={resumeRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 overflow-x-hidden"
    >
      {/* Animated Background with floating particles */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 animate-pulse"></div>
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float-1"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-teal-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float-3"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-teal-300 rounded-full animate-float-4"></div>
      </div>

      {/* Resume Container - Single Page Layout */}
      <div
        className={`relative max-w-7xl mx-auto bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 ${
          isLoaded
            ? "opacity-100 scale-100 animate-slide-up"
            : "opacity-0 scale-95"
        }`}
      >
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-screen">
          {/* Left Sidebar - Contact & Skills */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 lg:p-8 border-r border-slate-700/50">
            {/* Profile Photo */}
            <div
              className={`w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-blue-500/30 transition-all duration-700 delay-200 ${
                isLoaded
                  ? "opacity-100 scale-100 rotate-0 animate-profile-float"
                  : "opacity-0 scale-50 rotate-180"
              }`}
            >
              <img
                src={profileImage}
                alt="Mark Jeffrey Morales"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Name and Title - Mobile Only */}
            <div className="lg:hidden text-center mb-6">
              <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Mark Jeffrey Morales
              </h1>
              <div className="text-base text-teal-400 font-semibold">
                Business Development Manager
              </div>
            </div>

            {/* Contact Section */}
            <div
              ref={(el) => (sectionRefs.current.contact = el)}
              id="contact"
              className={`mb-8 transition-all duration-700 delay-300 ${
                visibleSections.has("contact") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-base md:text-lg font-bold text-blue-400 mb-4 flex items-center gap-2 animate-pulse-slow">
                <svg
                  className="w-5 h-5 animate-bounce-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                CONTACT
              </h2>
              <div className="space-y-3 text-sm md:text-base">
                <div className="group hover:text-teal-400 transition-all duration-300 hover:translate-x-1 hover:scale-105">
                  <div className="text-slate-400 mb-1">Phone</div>
                  <div className="text-slate-200">(+63) 917-314-2685</div>
                </div>
                <div className="group hover:text-teal-400 transition-all duration-300 hover:translate-x-1 hover:scale-105">
                  <div className="text-slate-400 mb-1">Email</div>
                  <div className="text-slate-200 break-all">
                    markjeffreymorales@gmail.com
                  </div>
                </div>
                <div className="group hover:text-teal-400 transition-all duration-300 hover:translate-x-1 hover:scale-105">
                  <div className="text-slate-400 mb-1">Location</div>
                  <div className="text-slate-200 leading-relaxed">
                    B. 15 L. 42 North Fairway Homes, Brgy. Muzon, CSJDM, Bulacan
                  </div>
                </div>
              </div>
            </div>

            {/* Core Skills */}
            <div
              ref={(el) => (sectionRefs.current.skills = el)}
              id="skills"
              className={`mb-8 transition-all duration-700 delay-400 ${
                visibleSections.has("skills") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2 animate-pulse-slow">
                <svg
                  className="w-5 h-5 animate-bounce-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                CORE SKILLS
              </h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group animate-slide-in-left"
                    style={{ animationDelay: `${800 + index * 150}ms` }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm md:text-base text-slate-200 group-hover:text-teal-400 transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-xs md:text-sm text-teal-400 font-semibold animate-count-up">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden group-hover:bg-slate-700/70 transition-colors duration-300">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-blue-500/50 group-hover:h-2.5 group-hover:animate-shimmer"
                        style={{
                          width: isLoaded ? `${skill.level}%` : "0%",
                          transitionDelay: `${600 + index * 100}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              ref={(el) => (sectionRefs.current.education = el)}
              id="education"
              className={`transition-all duration-700 delay-500 ${
                visibleSections.has("education") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2 animate-pulse-slow">
                <svg
                  className="w-5 h-5 animate-bounce-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="group hover:translate-x-2 transition-all duration-300 hover:bg-slate-800/50 p-3 rounded-lg animate-slide-in-left"
                    style={{ animationDelay: `${1000 + index * 150}ms` }}
                  >
                    <div className="text-sm md:text-base font-semibold text-teal-400 mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {edu.institution}
                    </div>
                    {edu.degree && (
                      <div className="text-xs md:text-sm text-slate-300 mb-1">
                        {edu.degree}
                      </div>
                    )}
                    {edu.major && (
                      <div className="text-xs md:text-sm text-slate-400 mb-1">
                        {edu.major}
                      </div>
                    )}
                    <div className="text-xs md:text-sm text-slate-500">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Header & Experience */}
          <div className="lg:col-span-2 p-6 lg:p-10">
            {/* Header - Desktop Only */}
            <div
              ref={(el) => (sectionRefs.current.header = el)}
              id="header"
              className={`hidden lg:block mb-8 transition-all duration-700 delay-300 ${
                visibleSections.has("header") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-down"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift">
                Mark Jeffrey Morales
              </h1>
              <div className="text-xl lg:text-2xl text-teal-400 font-semibold mb-4 animate-slide-in-right">
                Business Development Manager
              </div>
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 animate-pulse-slow">
                <span className="text-sm text-blue-300 font-medium">
                  10+ Years of Sales & Business Development Excellence
                </span>
              </div>
            </div>

            {/* Profile Summary */}
            <div
              ref={(el) => (sectionRefs.current.profile = el)}
              id="profile"
              className={`mb-8 transition-all duration-700 delay-400 ${
                visibleSections.has("profile") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg md:text-xl font-bold text-blue-400 mb-3 flex items-center gap-2 group">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full group-hover:h-8 transition-all duration-300 animate-pulse-slow"></div>
                PROFESSIONAL PROFILE
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base hover:text-slate-200 transition-colors duration-300">
                Highly qualified individual with a dynamic and goal-oriented
                quality possessing a decade of experience in sales and business
                development. Capable of handling & managing duties and
                responsibilities with utmost professionalism, efficiency, and
                effectiveness. An individual that could lead and develop people
                towards success that will benefit the company and its people.
              </p>
            </div>

            {/* Professional Experience */}
            <div
              ref={(el) => (sectionRefs.current.experience = el)}
              id="experience"
              className={`transition-all duration-700 delay-500 ${
                visibleSections.has("experience") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg md:text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 group">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full group-hover:h-8 transition-all duration-300 animate-pulse-slow"></div>
                PROFESSIONAL EXPERIENCE
              </h2>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="group relative pl-6 pb-4 border-l-2 border-slate-700 hover:border-teal-500 transition-all duration-300 last:pb-0 animate-slide-in-right hover:bg-slate-800/30 rounded-r-lg p-3 -ml-3"
                    style={{ animationDelay: `${1200 + index * 100}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1 -translate-x-[9px] w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 ring-4 ring-slate-800 group-hover:scale-125 group-hover:ring-teal-500/50 transition-all duration-300 animate-pulse-slow"></div>

                    {exp.current && (
                      <div className="inline-block px-2 py-0.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded text-xs font-semibold mb-2 animate-pulse-slow hover:scale-105 transition-transform duration-300">
                        CURRENT
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <h3 className="text-base lg:text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors duration-300 group-hover:translate-x-1">
                        {exp.title}
                      </h3>
                      <span className="text-xs lg:text-sm text-slate-400 whitespace-nowrap group-hover:text-slate-300 transition-colors duration-300">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-sm text-teal-400 font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {exp.company}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div
              ref={(el) => (sectionRefs.current.footer = el)}
              id="footer"
              className={`mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap gap-3 transition-all duration-700 delay-600 ${
                visibleSections.has("footer") || isLoaded
                  ? "opacity-100 translate-y-0 animate-fade-in-up"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none px-6 py-3 md:py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 hover:from-blue-500 hover:to-teal-500 animate-pulse-slow"
              >
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-6 py-3 md:py-2.5 bg-slate-700/50 rounded-lg font-semibold text-sm md:text-base hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 active:scale-95 hover:border hover:border-teal-500/50"
              >
                Print Resume
              </button>
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-none px-6 py-3 md:py-2.5 bg-slate-700/50 rounded-lg font-semibold text-sm md:text-base hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 active:scale-95 hover:border hover:border-teal-500/50"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="text-center mt-6 text-slate-500 text-xs animate-fade-in opacity-0"
        style={{ animationDelay: "1500ms", animationFillMode: "forwards" }}
      >
        © 2025 Mark Jeffrey Morales. All rights reserved.
      </div>
    </div>
  );
};

export default Resume;
