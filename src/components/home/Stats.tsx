import { Calendar, Code, MapPin, Users } from "lucide-react";

export const Stats = () => (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Membres', count: '250+' },
            { icon: Calendar, label: 'Événements', count: '15' },
            { icon: Code, label: 'Projets', count: '12' },
            { icon: MapPin, label: 'Régions', count: '3' }
          ].map(({ icon: Icon, label, count }) => (
            <div key={label} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-1">{count}</h3>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );