import { Calendar, Code, Users } from 'lucide-react';
import React from 'react';

export const Features: React.FC = () => {
    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Calendar className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Événements Réguliers</h3>
                        <p className="text-gray-600">
                            Participez à nos hackathons, ateliers et formations dans tout le Grand Nord.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Users className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Communauté Active</h3>
                        <p className="text-gray-600">
                            Rejoignez une communauté dynamique de développeurs passionnés.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Code className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Projets Innovants</h3>
                        <p className="text-gray-600">
                            Collaborez sur des projets qui impactent notre région.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};