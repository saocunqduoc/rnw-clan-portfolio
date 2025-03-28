
import { useEffect, useState } from 'react';
import { Trophy, Users, Star, Crown, Zap, Award, MapPin, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';

const StatCard = ({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const currentElement = document.getElementById(`stat-${label.toLowerCase().replace(/\s+/g, '-')}`);
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
      id={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
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

const KingdomCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const currentElement = document.getElementById('kingdom-card');
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  
  return (
    <div 
      id="kingdom-card"
      className={cn(
        "glass-card overflow-hidden transition-opacity duration-1000 h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative">
        <div className="h-64 bg-gradient-to-b from-blue-500 to-blue-700 relative overflow-hidden">
          <img 
            src="/lovable-uploads/ea2308b4-ba72-4a9c-a043-386692613b83.png" 
            alt="Kingdom Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center">
          <span className="text-white font-bold">LIÊN MINH</span>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-2">
          <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs font-bold">1</div>
          <span className="text-white font-bold">LIÊN MINH</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-black/30 px-3 py-1 rounded-full text-sm mb-2">
            <span className="text-white">-284-</span>
          </div>
          <h3 className="text-xl font-bold text-white">[ RN ] REJUVE NATION - W</h3>
        </div>
        
        <Table className="w-full">
          <TableBody className="divide-y divide-white/10">
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Lực Chiến:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">10.834.266.306</TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Thủ Lĩnh:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold flex items-center justify-end gap-2">
                M A X
                <Crown size={16} className="text-yellow-500" />
              </TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Lãnh thổ:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">402</TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Quà Liên Minh:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">
                <div className="flex items-center justify-end gap-1">
                  Lv.50
                  <GraduationCap size={16} className="text-yellow-500" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Thành viên:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">
                <div className="flex items-center justify-end gap-1">
                  200/200
                  <Users size={16} className="text-white" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70">Vùng Liên Kết:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">Hsing-Lo</TableCell>
            </TableRow>
            <TableRow className="border-white/10">
              <TableCell className="py-3 px-0 text-white/70 text-xs">Lực Lượng Liên Minh Cơ Động:</TableCell>
              <TableCell className="py-3 px-0 text-right text-white font-bold">Kim Cương</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { icon: <Trophy size={28} />, value: "4", label: "Chiến Thắng", delay: 100 },
    { icon: <Users size={28} />, value: "150+", label: "Thành Viên", delay: 200 },
    { icon: <Star size={28} />, value: "12", label: "T5 > 100M", delay: 300 },
    { icon: <Crown size={28} />, value: "C", label: "Seed", delay: 400 },
    { icon: <Zap size={28} />, value: "10 Tỷ", label: "Sức Mạnh Vương Quốc", delay: 500 }
  ];

  return (
    <section id="stats" className="py-24 relative">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Thống Kê Clan</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Kingdom Card */}
          <div className="flex justify-center">
            <KingdomCard />
          </div>
          
          {/* Right Side - Stats */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </section>
  );
};

export default Stats;
