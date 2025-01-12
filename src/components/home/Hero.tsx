import React from 'react';

export const Hero: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Grand Nord Developers Community
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Ensemble, innovons pour le développement technologique du Grand Nord
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button className="px-8 py-3 bg-white text-blue-900 rounded-md hover:bg-blue-50 font-semibold">
                        Devenir Membre
                    </button>
                    <button className="px-8 py-3 border-2 rounded-md hover:bg-blue-800">
                        Découvrir nos Projets
                    </button>
                </div>
            </div>
        </div>
    );
};