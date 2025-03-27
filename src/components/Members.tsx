
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
    name: "ShadowMaster",
    role: "Leader",
    level: 75,
    power: "120M",
    joined: "2023-01-15",
    icon: ROLES.LEADER.icon,
    roleColor: ROLES.LEADER.color,
  },
  {
    id: 2,
    name: "DragonSlayer",
    role: "Elder",
    level: 73,
    power: "115M",
    joined: "2023-01-20",
    icon: ROLES.ELDER.icon,
    roleColor: ROLES.ELDER.color,
  },
  {
    id: 3,
    name: "PhoenixRiser",
    role: "Elder",
    level: 70,
    power: "110M",
    joined: "2023-02-05",
    icon: ROLES.ELDER.icon,
    roleColor: ROLES.ELDER.color,
  },
  {
    id: 4,
    name: "FrostGuardian",
    role: "Officer",
    level: 68,
    power: "105M",
    joined: "2023-02-10",
    icon: ROLES.OFFICER.icon,
    roleColor: ROLES.OFFICER.color,
  },
  {
    id: 5,
    name: "ThunderLord",
    role: "Officer",
    level: 67,
    power: "102M",
    joined: "2023-02-15",
    icon: ROLES.OFFICER.icon,
    roleColor: ROLES.OFFICER.color,
  },
  {
    id: 6,
    name: "BlazeFury",
    role: "Member",
    level: 65,
    power: "95M",
    joined: "2023-03-01",
    icon: ROLES.MEMBER.icon,
    roleColor: ROLES.MEMBER.color,
  },
  {
    id: 7,
    name: "ShadowHunter",
    role: "Member",
    level: 63,
    power: "90M",
    joined: "2023-03-10",
    icon: ROLES.MEMBER.icon,
    roleColor: ROLES.MEMBER.color,
  },
  {
    id: 8,
    name: "StormBringer",
    role: "Member",
    level: 62,
    power: "88M",
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
        <h2 className="section-title text-center mb-4">Thành Viên Của Chúng Tôi</h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-12">
          Tham gia cùng đội ngũ chiến binh ưu tú của chúng tôi tại server 284. Với hơn 150 thành viên, 
          trong đó có 12 người chơi T5 với sức mạnh trên 100 triệu, chúng tôi luôn sẵn sàng tiếp nhận 
          những chiến binh mới có tinh thần cống hiến.
        </p>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm thành viên theo tên hoặc vai trò..."
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Thành Viên</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Vai Trò</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Cấp Độ</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sức Mạnh</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Ngày Tham Gia</th>
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
              Không tìm thấy thành viên phù hợp với từ khóa tìm kiếm.
            </div>
          )}
          
          <div className="px-6 py-4 bg-clan-dark-accent/50 text-right text-sm text-white/70">
            Hiển thị {filteredMembers.length} trong số hơn 150 thành viên
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
