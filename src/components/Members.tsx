
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define role icons and colors
const RoleIcon = ({ role }: { role: string }) => {
  switch (role) {
    case 'King':
      return <Crown className="text-yellow-500" size={18} />;
    case 'Queen':
      return <Crown className="text-pink-400" size={18} />;
    case 'R4':
      return <Sword className="text-blue-400" size={18} />;
    default:
      return <Shield className="text-green-400" size={18} />;
  }
};

// Define member interface
interface Member {
  id: number;
  name: string;
  role: 'King' | 'Queen' | 'R4' | 'Member';
  power: string;
  kills: string;
}

// SVG icons components
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

const Shield = ({ className, size }: { className?: string, size: number }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const Sword = ({ className, size }: { className?: string, size: number }) => (
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
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </svg>
);

// Generate fake member data
const generateMembers = (): Member[] => {
  const members: Member[] = [];
  
  // Add King
  members.push({
    id: 1,
    name: "M A X",
    role: "King",
    power: formatNumber(Math.floor(300000000 + Math.random() * 200000000)),
    kills: formatNumber(Math.floor(20000000 + Math.random() * 10000000))
  });
  
  // Add Queen
  members.push({
    id: 2,
    name: "Z Z A R",
    role: "Queen",
    power: formatNumber(Math.floor(250000000 + Math.random() * 150000000)),
    kills: formatNumber(Math.floor(15000000 + Math.random() * 8000000))
  });
  
  // Add R4 members
  for (let i = 3; i <= 12; i++) {
    members.push({
      id: i,
      name: generateRandomName(),
      role: "R4",
      power: formatNumber(Math.floor(150000000 + Math.random() * 100000000)),
      kills: formatNumber(Math.floor(8000000 + Math.random() * 7000000))
    });
  }
  
  // Add regular members
  for (let i = 13; i <= 150; i++) {
    members.push({
      id: i,
      name: generateRandomName(),
      role: "Member",
      power: formatNumber(Math.floor(50000000 + Math.random() * 100000000)),
      kills: formatNumber(Math.floor(1000000 + Math.random() * 7000000))
    });
  }
  
  return members;
};

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Generate random name
const generateRandomName = (): string => {
  const prefixes = ["Dragon", "Shadow", "Phoenix", "Frost", "Storm", "Fire", "Ice", "Thunder", "Night", "Blood", "Star", "Moon", "Sun", "Dark", "Light"];
  const suffixes = ["Slayer", "Hunter", "Knight", "Warrior", "Lord", "Master", "Rider", "Tamer", "Guardian", "King", "Queen", "Prince", "Princess", "Emperor", "Empress"];
  
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

// The main Members component
const Members = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [members] = useState<Member[]>(generateMembers());
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  
  // Get current members for the page
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Intersection observer for animation
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

  // Filter members based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter(member => 
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, members]);

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => goToPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis2">
          <span className="flex h-9 w-9 items-center justify-center">...</span>
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

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
              className="w-full px-4 py-3 bg-clan-dark-accent border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-clan-gold/50 text-white pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-clan-gold" />
            </div>
          </div>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <ScrollArea className="h-[520px] w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-clan-dark-accent sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Thành Viên</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Vai Trò</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Sức Mạnh</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Điểm Tiêu Diệt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentMembers.map((member, index) => {
                    let roleColor = "text-green-400";
                    if (member.role === "King") roleColor = "text-yellow-500";
                    if (member.role === "Queen") roleColor = "text-pink-400";
                    if (member.role === "R4") roleColor = "text-blue-400";
                    
                    return (
                      <tr 
                        key={member.id}
                        className={cn(
                          "transition-all duration-300 hover:bg-white/5",
                          isVisible ? "opacity-100" : "opacity-0",
                          index % 2 === 0 ? "bg-clan-dark-accent/30" : "bg-transparent"
                        )}
                        style={{ transitionDelay: `${index * 30}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center text-sm ${roleColor}`}>
                            <RoleIcon role={member.role} />
                            <span className="ml-2">{member.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{member.power}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{member.kills}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {currentMembers.length === 0 && (
              <div className="py-8 text-center text-white/70">
                Không tìm thấy thành viên phù hợp với từ khóa tìm kiếm.
              </div>
            )}
          </ScrollArea>
          
          <div className="px-6 py-4 bg-clan-dark-accent/50 text-sm text-white/70 flex justify-between items-center">
            <div>
              Hiển thị {Math.min(indexOfFirstMember + 1, filteredMembers.length)} - {Math.min(indexOfLastMember, filteredMembers.length)} trong tổng số {filteredMembers.length} thành viên
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => goToPage(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => goToPage(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Members;
