"use client";

import React, { useEffect, useRef, useState, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  service: string;
  message: string;
}

const SupportTicketForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dotsAnimated, setDotsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    'Web Development',
    'App Development',
    'Digital Marketing'
  ];

  // Intersection Observer for dots animation
  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDotsAnimated(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px'
      }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert('Ticket submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        service: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-brand-background py-16 px-4 sm:px-6 lg:px-8" id='contact'>
    
      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="font-nunito-sans text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-navy mb-4">
            Need Help? Open a Ticket
          </h2>
          <p className="font-nunito-sans text-lg text-gray-600">
            Submit Your Support Ticket, We will be with you as soon as we are able.
          </p>
        </div>

       {/* Decorative dots - top right */}
        <div
        className={`absolute top-[120px] -right-10 sm:top-24 sm:-right-6 md:top-28 md:-right-8 lg:top-23 lg:right-[-26px] grid grid-cols-6 gap-2 z-0 transition-all duration-1500 ease-out ${
            dotsAnimated
            ? 'translate-x-0 translate-y-0'
            : '-translate-x-40 translate-y-40'
        }`}
        >
        {[...Array(36)].map((_, i) => (
            <div
            key={i}
            className="w-2 h-2 bg-brand-accent rounded-full"
            style={{
                opacity: dotsAnimated ? 0.5 : 0.0, // Increased opacity for testing
                transition: `opacity 500ms ${i * 30}ms`,
            }}
            ></div>
        ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 relative z-10">
          {/* Name fields row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-nunito-sans"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-nunito-sans"
              />
            </div>
          </div>

          {/* Email and Phone row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-nunito-sans"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-nunito-sans"
              />
            </div>
          </div>

          {/* Service dropdown */}
          <div className="mb-6">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
              Service Type
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white font-nunito-sans"
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Message field */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-nunito-sans">
              What are you looking for?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none font-nunito-sans"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-brand-navy bg-brand-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent hover:text-white hover:shadow-lg cursor-pointer hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-nunito-sans"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>

        {/* Decorative dots - bottom left */}
        <div 
          className={`absolute -bottom-7 -left-8 grid grid-cols-6 gap-2 z-0 transition-all duration-1500 ease-out ${
            dotsAnimated 
              ? 'translate-x-0 translate-y-0' 
              : 'translate-x-40 -translate-y-40'
          }`}
        >
          {[...Array(36)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-brand-accent rounded-full opacity-40"
              style={{
                opacity: dotsAnimated ? 0.5 : 0,
                transition: `opacity 500ms ${i * 30}ms`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketForm;