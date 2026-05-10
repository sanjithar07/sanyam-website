import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail } from "lucide-react";

const COUPLING_TYPES = [
  {
    name: "Half & Full Coupling",
    desc: "Threaded or socket-weld half/full couplings for pipe branch connections. Available in all pressure classes.",
    img: "/coupling-half-full.png",
  },
  {
    name: "Reducing Coupling",
    desc: "Connects pipes of two different diameters in line. Precision bored to ensure concentricity and flow continuity.",
    img: "/coupling-reducing.png",
  },
  {
    name: "Socket Weld Coupling",
    desc: "Socket-bore coupling for fillet-weld attachment to pipe. Ideal for small-bore, high-pressure piping systems.",
    img: "/coupling-socket-weld.png",
  },
  {
    name: "Threaded Coupling",
    desc: "Internal threads on both ends allow screwed pipe connections. No welding required — quick assembly and removal.",
    img: "/coupling-threaded.png",
  },
  {
    name: "Union Coupling",
    desc: "Three-piece assembly for easy disconnection without rotating either pipe. Used in maintenance-critical lines.",
    img: "/coupling-union.png",
  },
  {
    name: "Love Joy Coupling",
    desc: "Flexible jaw coupling for shaft-to-shaft connections. Absorbs shock and misalignment in drive transmissions.",
    img: "/coupling-love-joy.png",
  },
  {
    name: "Rigid Coupling",
    desc: "Solid coupling for perfectly aligned shafts. Transmits torque with zero backlash — used in precision machinery.",
    img: "/coupling-rigid.png",
  },
  {
    name: "Sleeve Coupling",
    desc: "Hollow cylindrical coupling connecting two shaft ends. Simple design for low-speed, low-torque applications.",
    img: "/coupling-sleeve.png",
  },
  {
    name: "Flange Coupling",
    desc: "Two flanged hubs bolted together transmitting high torque. Robust and reliable for heavy-duty rotating equipment.",
    img: "/coupling-flange.png",
  },
  {
    name: "Clamp Coupling",
    desc: "Split-clamp design allows assembly without shaft disassembly. Provides high clamping force with easy removal.",
    img: "/coupling-clamp.png",
  },
  {
    name: "Bushed Coupling",
    desc: "Uses nylon or polyurethane bushes between jaws for vibration damping. Tolerates angular and parallel misalignment.",
    img: "/coupling-bushed.png",
  },
  {
    name: "Gear Coupling",
    desc: "Crowned external gear meshing with straight internal gear sleeve. Handles high torque with angular misalignment.",
    img: "/coupling-gear.png",
  },
];

export default function ProductCouplings() {
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
            Couplings
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-400 text-base md:text-lg leading-relaxed">
            Pipe and shaft couplings machined from SS, MS, EN8 and alloy steels. From simple
            threaded connections to precision gear couplings — all available to custom dimensions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono-caps text-neutral-500">
            {["SS 304 / 316", "MS / EN8", "Alloy Steel", "Custom OD/ID", "Any Thread Standard"].map((s) => (
              <span key={s} className="border border-white/10 px-3 py-1.5 rounded-sm">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUPLING_TYPES.map((item, i) => (
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
            <h2 className="font-display uppercase text-white text-2xl md:text-3xl">Need a custom coupling?</h2>
            <p className="text-neutral-400 text-sm mt-2">Share your shaft dimensions and torque requirements — we'll manufacture to spec.</p>
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
