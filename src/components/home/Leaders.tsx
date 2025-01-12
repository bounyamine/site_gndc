import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

interface TeamMember {  
  _id: string;  
  name: string;  
  position: string;  
  bio: string;  
  imageUrl: string;  
}  

export const Leaders: React.FC = () => {  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);  

  useEffect(() => {  
    const fetchTeamMembers = async () => {  
      try {  
        const response = await axios.get<TeamMember[]>('/api/team');
        setTeamMembers(response.data);  
      } catch (error) {  
        console.error('Erreur lors de la récupération des membres de l\'équipe :', error);  
      }  
    };  

    fetchTeamMembers();  
  }, []);  

  return (  
    <div className="py-16">  
      <div className="container mx-auto px-4">  
        <h2 className="text-3xl font-bold mb-8 text-center">Équipe de Direction</h2>  
        {teamMembers.length > 0 ? (  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">  
            {teamMembers.map((member) => (  
              <div key={member._id} className="border rounded-lg overflow-hidden">  
                <img  
                  src={member.imageUrl}  
                  alt={member.name}  
                  className="w-full object-cover h-48"  
                />  
                <div className="p-6">  
                  <h3 className="font-semibold text-xl mb-1">{member.name}</h3>  
                  <p className="text-gray-600 mb-2">{member.position}</p>  
                  <p className="text-gray-600">{member.bio}</p>  
                </div>  
              </div>  
            ))}  
          </div>  
        ) : (  
          <p className="text-gray-600 text-center">Aucun membre de l'équipe pour le moment.</p>  
        )}  
      </div>  
    </div>  
  );  
};