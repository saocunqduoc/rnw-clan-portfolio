
import { useState, useEffect } from 'react';
import { Trophy, Star, Award, Flag, Target, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Kingdom Conquest",
    date: "Apr 12, 2023",
    description: "Conquered the Northern Kingdom after a 3-day siege, claiming valuable territory and resources.",
    icon: <Flag className="text-clan-gold" size={24} />
  },
  {
    id: 2,
    title: "Alliance Victory",
    date: "May 3, 2023",
    description: "Led a strategic alliance of 5 clans to defeat the server's dominant faction.",
    icon: <Trophy className="text-clan-gold" size={24} />
  },
  {
    id: 3,
    title: "Boss Raid Champions",
    date: "Jun 18, 2023",
    description: "First clan to defeat the Mythic Dragon World Boss, earning exclusive clan rewards.",
    icon: <Award className="text-clan-gold" size={24} />
  },
  {
    id: 4,
    title: "War Tournament Finalists",
    date: "Jul 25, 2023",
    description: "Reached the final round of the Summer War Tournament, ranked #2 among 64 participating clans.",
    icon: <Medal className="text-clan-gold" size={24} />
  },
  {
    id: 5,
    title: "Resource Kings",
    date: "Aug 9, 2023",
    description: "Achieved top position in resource collection challenge, gathering over 10M resources in 24 hours.",
    icon: <Star className="text-clan-gold" size={24} />
  },
  {
    id: 6,
    title: "Perfect Defense",
    date: "Sep 21, 2023",
    description: "Successfully defended our territory against 20+ attacks without a single loss during Invasion Week.",
    icon: <Target className="text-clan-gold" size={24} />
  },
];

const Achievements = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setVisibleItems(prev => [...prev, id]);
        }
      });
    }, { threshold: 0.2 });
    
    const elements = document.querySelectorAll('.achievement-item');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="achievements" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Clan Achievements</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-clan-gold/30 before:to-transparent">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div 
                key={achievement.id}
                data-id={achievement.id}
                className={cn(
                  "achievement-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
                  "mb-12 last:mb-0 transition-opacity duration-500",
                  visibleItems.includes(achievement.id) ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-clan-dark-accent group-hover:bg-clan-gold/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                  {achievement.icon}
                </div>
                
                <div className="glass-card w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl card-hover transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                    <span className="text-xs font-medium text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="text-white/70">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
