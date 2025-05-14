import React from "react";
import {
  Plane,
  Settings,
  Database,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
const PlaneIcon = () => (
  <Plane className="h-10 w-10 text-teal-600 group-hover:text-teal-700" />
);

const SettingIcon = () => (
  <Settings className="h-10 w-10 text-blue-600 group-hover:text-blue-700" />
);

const DatabaseIcon = () => (
  <Database className="h-10 w-10 text-amber-600 group-hover:text-amber-700" />
);

const BarchartIcon = () => (
  <BarChart3 className="h-10 w-10 text-indigo-600 group-hover:text-indigo-700" />
);

const ShieldIcon = () => (
  <ShieldCheck className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
);

const ShieldIcon2 = () => (
  <ShieldCheck className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
);

const ServiceSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Line & Base Maintenance",
      description:
        "Certified maintenance services across major Indian airports for various aircraft fleets.",
      icon: <PlaneIcon />,
      size: "medium",
    },
    {
      title: "Aircraft Paint & Refinishing",
      description:
        "State-of-the-art painting and livery solutions tailored to client branding and regulatory standards",
      icon: <SettingIcon />,
      size: "large",
    },
    {
      title: "Asset Management",
      description:
        "Lifecycle support for aircraft assets including delivery, storage, transition, and redelivery.",
      icon: <DatabaseIcon />,
      size: "medium",
    },
    {
      title: "Digital & Predictive Analytics",
      description:
        "AI-enabled platforms for real-time monitoring, predictive maintenance, and fleet optimization.",
      icon: <BarchartIcon />,
      size: "large",
    },
    {
      title: "Regulatory Compliance & CAMO",
      description:
        "Continuing Airworthiness Management & compliance services for DGCA, EASA, and global norms.",
      icon: <ShieldIcon />,
      size: "medium",
    },
    {
      title: "IT Regulatory Compliance & CAMO",
      description:
        "Continuing Airworthiness Management & compliance services for DGCA, EASA, and global norms.",
      icon: <ShieldIcon2 />,
      size: "large",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
          What{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            Air Works India
          </span>{" "}
          Does
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering Indian businesses with innovative technology solutions to
          thrive in the global digital landscape.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        style={{ gridAutoRows: "minmax(200px, auto)" }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl service-card ${
              service.size === "large" ? "md:row-span-2" : "md:row-span-1"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-teal-50 group-hover:to-blue-50 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-0 border-2 border-gray-100 group-hover:border-transparent rounded-2xl z-0 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-teal-500/20 group-hover:via-blue-500/10 group-hover:to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-2xl z-0 transition-all duration-500"></div>

            <div className="relative h-full rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center z-10 transition-all duration-300">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                {service.title}
              </h3>
              {service.description && (
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              )}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button className="px-4 py-2 bg-white border border-teal-200 hover:bg-teal-50 text-teal-700 rounded-lg font-medium transition-all duration-300">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
          Ready to transform your business?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Partner with Airworkis India and schedule a meeting to explore
          cutting-edge technology solutions tailored for the Indian market.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl font-medium transition-all duration-300">
          Book an Appointment
        </button>
      </div>
    </section>
  );
};

export default ServiceSection;


// import React from "react";

// const Service = () => {

//   return (
//     <div id="bento-grid" className="container mx-auto px-4 py-12">
//       <h2 className="text-5xl sm:font-semibold mb-14 max-w-2xl leading-normal">
//         What we do
//       </h2>

//       <div
//         id="grid-container"
//         className="flex flex-col gap-6 lg:grid lg:grid-cols-3"
//         style={{ gridAutoRows: "96px" }}
//       >
//         {/* Card 1 */}
//         <div className="row-start-1 row-end-3 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="row-start-1 row-end-4 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <p className="text-lg font-light">
//               We’ll ensure the underlying browser is up to date and deliver
//               performance improvements, security patches, & additional features.
//             </p>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="row-start-1 row-end-3 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Card 4 */}
//         <div className="row-start-3 row-end-6 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <p className="text-lg font-light">
//               Open your app directly from shared URLs, providing a seamless user
//               experience across platforms.
//             </p>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Card 5 */}
//         <div className="row-start-4 row-end-6 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <p className="text-lg font-light">
//               Provide secure login with OAuth, biometrics, and more.
//             </p>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Card 6 */}
//         <div className="row-start-3 row-end-6 group rounded-2xl gradient-hover-outer">
//           <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
//             <h3 className="text-2xl font-semibold">Service</h3>
//             <p className="text-lg font-light">
//               Open your app directly from shared URLs, providing a seamless user
//               experience across platforms.
//             </p>
//             <img src="" alt="Image" className="w-16 h-16" />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Service;