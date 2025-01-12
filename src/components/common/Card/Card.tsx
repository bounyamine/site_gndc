import { ChevronRight } from 'lucide-react';

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  date?: string;
  onClick?: () => void;
};

const Card = ({ title, description, imageUrl, tags, date, onClick }: CardProps) => {
  return (
    <div 
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        
        {date && (
          <span className="text-sm text-gray-500 mb-2">{date}</span>
        )}
        
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 flex justify-end border-t">
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default Card;