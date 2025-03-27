
import { useState } from 'react';
import { Shield, User, Mail, MessageSquare, Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const RecruitmentRequirements = () => {
  const requirements = [
    { text: "Player level 40+", icon: <User size={18} /> },
    { text: "Active daily participation", icon: <Check size={18} /> },
    { text: "Power level of at least 2M", icon: <Shield size={18} /> },
    { text: "Contribute to clan wars and events", icon: <Shield size={18} /> },
    { text: "Friendly attitude and team player", icon: <MessageSquare size={18} /> },
    { text: "Discord participation required", icon: <MessageSquare size={18} /> }
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
      <ul className="space-y-3">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center text-white/80">
            <span className="text-clan-gold mr-3 flex-shrink-0">{req.icon}</span>
            <span>{req.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecruitmentBenefits = () => {
  const benefits = [
    "Access to elite tactics and strategies",
    "Regular in-game rewards and resource sharing",
    "Dedicated support for player development",
    "Priority in event participation",
    "Clan wars training and coaching",
    "Friendly community with active Discord"
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Benefits</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start text-white/80">
            <span className="text-clan-gold mr-3 mt-1">•</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Recruitment = () => {
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    power: '',
    email: '',
    discord: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          level: '',
          power: '',
          email: '',
          discord: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="recruitment" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-4">Join Our Clan</h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          Looking for skilled and dedicated players to join our ranks. 
          Submit your application below to become part of the RN:W family.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <RecruitmentRequirements />
            <RecruitmentBenefits />
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Application Form</h3>
              
              {isSubmitted ? (
                <div className="bg-clan-gold/10 border border-clan-gold/30 rounded-lg p-6 text-center animate-scale-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clan-gold/20 text-clan-gold mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Application Submitted!</h4>
                  <p className="text-white/70">Thank you for your interest in joining RN:W. We'll review your application and contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white/70 mb-1">In-Game Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
                        placeholder="Your in-game name"
                      />
                    </div>
                    <div>
                      <label htmlFor="level" className="block text-white/70 mb-1">Player Level</label>
                      <input
                        id="level"
                        name="level"
                        type="text"
                        required
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
                        placeholder="Current level"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="power" className="block text-white/70 mb-1">Power Level</label>
                      <input
                        id="power"
                        name="power"
                        type="text"
                        required
                        value={formData.power}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
                        placeholder="Your power level"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/70 mb-1">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="discord" className="block text-white/70 mb-1">Discord Username</label>
                    <input
                      id="discord"
                      name="discord"
                      type="text"
                      required
                      value={formData.discord}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
                      placeholder="Your Discord username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white/70 mb-1">Why do you want to join RN:W?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white resize-none"
                      placeholder="Tell us about yourself and why you want to join..."
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-3 rounded-lg font-semibold transition-all duration-300",
                        "flex items-center justify-center",
                        "bg-gradient-gold text-clan-dark hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-clan-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <Send size={16} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruitment;
