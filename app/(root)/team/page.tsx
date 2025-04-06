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
    image: 'https://png.pngtree.com/png-clipart/20240721/original/pngtree-the-white-goat-standing-alone-png-image_15607029.png',
    bio: 'Leo is the goat',
  },
  {
    name: 'Devon Parikh',
    role: 'Page Developer',
    image: 'https://i1.sndcdn.com/artworks-000611542048-fpf9c7-t500x500.jpg',
    bio: 'Devon is the goat',
  },
  {
    name: 'Daniel Gao',
    role: 'Page Developer',
    image: 'https://www.telegraph.co.uk/multimedia/archive/01651/Mr_Li_1651123f.jpg',
    bio: 'Daniel did nothing',
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
