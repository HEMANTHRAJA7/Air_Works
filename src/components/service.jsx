import React from "react";

const Service = () => {
  
  return (
    <div id="bento-grid" className="container mx-auto px-4 py-12">
      <h2 className="text-5xl sm:font-semibold mb-14 max-w-2xl leading-normal">
        What we do
      </h2>

      <div
        id="grid-container"
        className="flex flex-col gap-6 lg:grid lg:grid-cols-3"
        style={{ gridAutoRows: "96px" }}
      >
        {/* Card 1 */}
        <div className="row-start-1 row-end-3 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="row-start-1 row-end-4 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <p className="text-lg font-light">
              We’ll ensure the underlying browser is up to date and deliver
              performance improvements, security patches, & additional features.
            </p>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="row-start-1 row-end-3 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="row-start-3 row-end-6 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <p className="text-lg font-light">
              Open your app directly from shared URLs, providing a seamless user
              experience across platforms.
            </p>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="row-start-4 row-end-6 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <p className="text-lg font-light">
              Provide secure login with OAuth, biometrics, and more.
            </p>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>

        {/* Card 6 */}
        <div className="row-start-3 row-end-6 group rounded-2xl gradient-hover-outer">
          <div className="rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center justify-center text-center">
            <h3 className="text-2xl font-semibold">Service</h3>
            <p className="text-lg font-light">
              Open your app directly from shared URLs, providing a seamless user
              experience across platforms.
            </p>
            <img src="" alt="Image" className="w-16 h-16" />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Service;
