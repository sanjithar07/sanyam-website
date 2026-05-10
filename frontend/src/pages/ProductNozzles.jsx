import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail } from "lucide-react";

const NOZZLE_TYPES = [
  {
    name: "SS Air Nozzles",
    desc: "Stainless steel boiler air nozzles machined for corrosion resistance and long service life in high-temperature air distribution.",
    img: "/nozzle-ss-air.png",
  },
  {
    name: "MS Air Nozzles",
    desc: "Mild steel air nozzles for standard boiler grate applications. Cost-effective with reliable air distribution performance.",
    img: "/nozzle-ms-air.png",
  },
  {
    name: "EN8 Air Nozzles",
    desc: "EN8 medium carbon steel nozzles for demanding boiler environments — offering superior hardness and wear resistance.",
    img: "/nozzle-en8-air.png",
  },
  {
    name: "High Pressure Nozzles",
    desc: "Precision-ground nozzles rated for high-pressure air and steam systems. Tight dimensional tolerances for consistent flow characteristics.",
    img: "/nozzle-high-pressure.png",
  },
  {
    name: "Casting Nozzles",
    desc: "Cast nozzle bodies finished to drawing specifications. Suitable for high-volume replacement programmes with reliable dimensional repeat.",
    img: "/nozzle-casting.png",
  },
  {
    name: "Any Kinds of Nozzles",
    desc: "Custom nozzles manufactured to any geometry, material or thread specification. We work from drawings, samples or reverse engineering.",
    img: "/nozzle-any-kinds.png",
  },
];

export default function ProductNozzles() {
  return (
    <div className="App min-h-screen bg-[#0a0a0a]">
      {/* Nav bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 border border-[#C5A059]/50 flex items-center justify-center rotate-45">
              <div className="w-3.5 h-3.5 bg-[#C5A059]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-white text-base leading-none">SANYAM</div>
              <div className="font-mono-caps text-[9px] text-[#C5A059] mt-0.5">ENGINEERING</div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono-caps text-[10px] text-neutral-400 hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="font-mono-caps text-[11px] text-[#C5A059] mb-4">— Product Range</div>
          <h1 className="font-display uppercase text-white text-5xl md:text-7xl leading-[0.9] tracking-tighter">
            Boiler Air<br />
            <span className="gold-text">Nozzles</span>
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed">
            SS, MS and EN8 boiler air nozzles machined to precise tolerances. Available in
            standard and custom geometries — from single-piece samples to high-volume production batches.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono-caps text-neutral-500">
            {["SS 304 / 316", "MS / EN8", "Cast Iron", "High Pressure Rated", "Custom Geometry"].map((s) => (
              <span key={s} className="border border-white/10 px-3 py-1.5 rounded-sm">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NOZZLE_TYPES.map((item, i) => (
              <div key={i} className="card-dark rounded-sm overflow-hidden group">
                <div className="relative h-52 overflow-hidden bg-white/5 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display uppercase text-white text-lg">{item.name}</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5 bg-[#0b0b0d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display uppercase text-white text-2xl md:text-3xl">Need custom nozzles?</h2>
            <p className="text-neutral-400 text-sm mt-2">Send us a drawing or sample — we'll match it exactly.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918460812572"
              className="btn-gold px-6 py-3 text-sm font-semibold rounded-sm inline-flex items-center gap-2"
            >
              <Phone size={15} /> Call Us
            </a>
            <a
              href="mailto:info@sanyamengineering.com"
              className="btn-outline-gold px-6 py-3 text-sm font-semibold rounded-sm inline-flex items-center gap-2"
            >
              <Mail size={15} /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
          <div>© {new Date().getFullYear()} Sanyam Engineering. All rights reserved.</div>
          <div className="font-mono-caps text-[9px]">PRECISION · CONSISTENCY · RELIABILITY</div>
        </div>
      </footer>
    </div>
  );
}
