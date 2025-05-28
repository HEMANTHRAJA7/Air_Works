import Logo from "../../assets/logo_bg_removed.png";
import { Facebook, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <img
              className="h-[100px] w-[200px]"
              src={Logo}
              alt="Company Logo"
            />
          </a>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          {/* Column 1 */}
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Category
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Workflow
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Customers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Category
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Workflow
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Customers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Category
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Workflow
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Customers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Category
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Workflow
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-800">
                  Customers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-200 sm:flex-row">
        <p className="text-sm text-gray-600 mt-5 md:mt-0">
          © {new Date().getFullYear()} Air Works. All rights reserved.
        </p>
        {/* Social Media Icons */}
          <div className="flex space-x-4 mt-5 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:example@email.com"
              className="text-gray-600 hover:text-red-500"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
      </div>
    </div>
  );
};

export default Footer;
