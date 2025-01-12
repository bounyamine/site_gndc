import { Card } from "../ui/card";

export const Projects = () => (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Projets Populaires</h2>
        <div className="grid grid-cols-3 gap-8">
          <Card/>
        </div>
      </div>
    </section>
  );