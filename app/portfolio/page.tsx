"use client";

import Image from "next/image";

export default function PortfolioPage() {
  const projects = [
    {
      title: "East Nashville Custom Build",
      img: "/portfolio/east-nashville.jpg",
    },
    {
      title: "La Vergne Rental Renovation",
      img: "/portfolio/la-vergne.jpg",
    },
    {
      title: "Murfreesboro Modern Farmhouse",
      img: "/portfolio/murfreesboro.jpg",
    },
  ];

  return (
    <main className="relative w-full min-h-screen text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/backgrounds/kitchen-dark-modern.png"
          alt="Luxury Kitchen Background"
          fill
          priority
          className="object-cover object-center opacity-10"
        />
      </div>

      {/* Overlay Content */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Recent Projects & Installations
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From builder-grade installs to luxury remodels — every Dezenio
            project showcases our commitment to detail, service, and premium
            product lines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform border border-white/10"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-gray-300">
                  Premium cabinetry installation with tailored selections and
                  jobsite coordination.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
