import React from 'react';
import './team.css'; 

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Leo Shi',
    role: 'Page Developer',
    image: '',
    bio: 'Leo is the goat'
  },
  {
    name: 'Devon Patel Rajesh',
    role: 'Page Developer',
    image: 'Leo.webp',
    bio: 'Devon is the Goat.',
  },
  {
    name: 'Daniel Gao',
    role: 'Page Development',
    image: '',
    bio: 'Daniel is the goat',
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="team-container">
      <h1 className="team-heading">Meet the Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h2 className="team-member-name">{member.name}</h2>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;