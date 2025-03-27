import { useState, useEffect } from 'react';
import { Shield, Sword, Heart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Member {
  id: number;
  name: string;
  role: string;
  level: number;
  power: string;
  joined: string;
  icon: React.ReactNode;
  roleColor: string;
}

const Crown = ({ className, size }: { className?: string, size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
  </svg>
);

const ROLES = {
  LEADER: {
    icon: <Crown className="text-clan-gold" size={18} />,
    color: "text-clan-gold",
  },
  ELDER: {
    icon: <Shield className="text-clan-orange" size={18} />,
    color: "text-clan-orange",
  },
  OFFICER: {
    icon: <Sword className="text-blue-400" size={18} />,
    color: "text-blue-400",
  },
  MEMBER: {
    icon: <Heart className="text-clan-red" size={18} />,
    color: "text-clan-red",
  },
};

const MEMBERS: Member[] = [
  {
    id: 1,
    name: "DragonLord",
    role: "Leader",
    level: 60,
    power: "5.8M",
    joined: "2023-01-15",
    icon: ROLES.LEADER.icon,
    roleColor: ROLES.LEADER.color,
  },
  {
    id: 2,
    name: "PhoenixRider",
    role: "Elder",
    level: 58,
    power: "5.2M",
    joined: "2023-01-20",
    icon: ROLES.ELDER.icon,
    roleColor: ROLES.ELDER.color,
  },
  {
    id: 3,
    name: "ShadowBlade",
    role: "Elder",
    level: 57,
    power: "4.9M",
    joined: "2023-02-05",
    icon: ROLES.ELDER.icon,
    roleColor: ROLES.ELDER.color,
  },
  {
    id: 4,
    name: "FrostQueen",
    role: "Officer",
    level: 55,
    power: "4.7M",
    joined: "2023-02-10",
    icon: ROLES.OFFICER.icon,
    roleColor: ROLES.OFFICER.color,
  },
  {
    id: 5,
    name: "StormCaller",
    role: "Officer",
    level: 54,
    power: "4.5M",
    joined: "2023-02-15",
    icon: ROLES.OFFICER.icon,
    roleColor: ROLES.OFFICER.color,
  },
  {
    id: 6,
    name: "EmberHeart",
    role: "Member",
    level: 52,
    power: "4.2M",
    joined: "2023-03-01",
    icon: ROLES.MEMBER.icon,
    roleColor: ROLES.MEMBER.color,
  },
  {
    id: 7,
    name: "VoidWalker",
    role: "Member",
    level: 51,
    power: "4.1M",
    joined: "2023-03-10",
    icon: ROLES.MEMBER.icon,
    roleColor: ROLES.MEMBER.color,
  },
  {
    id: 8,
    name: "LightBringer",
    role: "Member",
    level: 50,
    power: "4.0M",
    joined: "2023-03-15",
    icon: ROLES.MEMBER.icon,
    roleColor: ROLES.MEMBER.color,
  },
];

const Members = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(MEMBERS);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const currentElement = document.getElementById('members-section');
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredMembers(MEMBERS);
    } else {
      setFilteredMembers(
        MEMBERS.filter(member => 
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  return (
    <section id="members" className="py-24 relative">
      <div className="section-container" id="members-section">
        <h2 className="section-title text-center mb-16">Our Members</h2>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members by name or role..."
              className="w-full px-4 py-3 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Zap size={18} className="text-clan-gold" />
            </div>
          </div>
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-clan-dark-accent">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Power</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredMembers.map((member, index) => (
                  <tr 
                    key={member.id}
                    className={cn(
                      "transition-all duration-500 hover:bg-white/5",
                      isVisible ? "opacity-100" : "opacity-0",
                      index % 2 === 0 ? "bg-clan-dark-accent/30" : "bg-transparent"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${member.roleColor}`}>
                        {member.icon}
                        <span className="ml-2">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{member.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{member.power}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/70">{new Date(member.joined).toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="py-8 text-center text-white/70">
              No members found matching your search.
            </div>
          )}
          
          <div className="px-6 py-4 bg-clan-dark-accent/50 text-right text-sm text-white/70">
            Showing {filteredMembers.length} of {MEMBERS.length} members
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
