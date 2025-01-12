export const JoinCommunity = () => (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Rejoignez la Communauté</h2>
        <p className="text-xl text-gray-600 mb-8">Ensemble, innovons pour le développement du Grand Nord</p>
        <div className="flex justify-center gap-4">
          <a href="/contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Devenir membre
          </a>
          <a href="/projects" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Voir les projets
          </a>
        </div>
      </div>
    </section>
  );