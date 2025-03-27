
import { useEffect, useState } from 'react';
import { Trophy, Users, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const currentElement = document.getElementById(`stat-${label.toLowerCase()}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [label]);
  
  return (
    <div 
      id={`stat-${label.toLowerCase()}`}
      className={cn(
        "glass-card p-6 card-hover transition-opacity duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-clan-dark-accent border border-clan-gold/30 text-clan-gold mb-4">
          {icon}
        </div>
        <div className="gold-gradient-text text-3xl md:text-4xl font-bold mb-2">{value}</div>
        <div className="text-white/70">{label}</div>
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: <Trophy size={28} />, value: "87", label: "Victories", delay: 100 },
    { icon: <Users size={28} />, value: "35", label: "Members", delay: 200 },
    { icon: <Star size={28} />, value: "14", label: "Top 100 Players", delay: 300 },
    { icon: <Crown size={28} />, value: "#2", label: "Server Rank", delay: 400 }
  ];

  return (
    <section id="stats" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Clan Statistics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
