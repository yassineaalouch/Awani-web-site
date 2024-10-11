export default function ContactCard({ email, phone, companyName, address }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
          
          <div className="mt-4">
            <p className="text-gray-700 text-md">
              <strong>Email:</strong> {email || "Not available"}
            </p>
            <p className="text-gray-700 text-md mt-2">
              <strong>Phone:</strong> {phone || "Not available"}
            </p>
            <p className="text-gray-700 text-md mt-2">
              <strong>Company Name:</strong> {companyName || "Not available"}
            </p>
            <p className="text-gray-700 text-md mt-2">
              <strong>Address:</strong> {address || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
