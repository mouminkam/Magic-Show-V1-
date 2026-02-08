import { MapPin, Mail, Phone, Printer } from "lucide-react";

/**
 * ContactDetails Component
 * Displays contact information and about us section
 * @param {Object} props - Component props
 * @param {Object} props.contactDetails - Contact details data
 * @param {string} props.contactDetails.title - Contact details title
 * @param {string} props.contactDetails.address - Address
 * @param {string} props.contactDetails.email - Email address
 * @param {string} props.contactDetails.phone - Phone number
 * @param {string} props.contactDetails.fax - Fax number
 * @param {string} props.contactDetails.aboutTitle - About us title
 * @param {string} props.contactDetails.aboutText - About us text
 */
export default function ContactDetails({ contactDetails }) {
  // Default values if data is not provided
  const defaultData = {
    title: "CONTACT DETAIL",
    address: "222-UTC , Americans",
    email: "Support@emtheme.com",
    phone: "(00)-213 1234567",
    fax: "(00)-213 1879017",
    aboutTitle: "ABOUT US",
    aboutText: "Pharetra, erat sed fermentum feugiat, velit mauris egestas quam mauris egestas quam.",
  };

  const contactData = contactDetails || defaultData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div>
        <h3 className="text-2xl font-normal text-gray-600 uppercase tracking-widest mb-8">
          {contactData.title}
        </h3>
        <ul className="space-y-6">
          <li className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-600 mr-4 mt-1 shrink-0" />
            <address className="text-gray-600 not-italic">
              {contactData.address}
            </address>
          </li>
          <li className="flex items-start">
            <Mail className="w-5 h-5 text-gray-600 mr-4 mt-1 shrink-0" />
            <a
              href={`mailto:${contactData.email}`}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {contactData.email}
            </a>
          </li>
          <li className="flex items-start">
            <Phone className="w-5 h-5 text-gray-600 mr-4 mt-1 shrink-0" />
            <a
              href={`tel:${contactData.phone.replace(/[^0-9+]/g, "")}`}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {contactData.phone}
            </a>
          </li>
          <li className="flex items-start">
            <Printer className="w-5 h-5 text-gray-600 mr-4 mt-1 shrink-0" />
            <a
              href={`tel:${contactData.fax.replace(/[^0-9+]/g, "")}`}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {contactData.fax}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-normal text-gray-600 uppercase tracking-widest mb-8">
          {contactData.aboutTitle}
        </h3>
        <p className="text-gray-600 leading-7 whitespace-pre-line">
          {contactData.aboutText}
        </p>
      </div>
    </div>
  );
}

