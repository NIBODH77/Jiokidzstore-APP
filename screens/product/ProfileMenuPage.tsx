import React, { useState } from "react";

const ProfileMenuPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "menu">("profile");

  // Profile Tab Content
  const ProfileContent: React.FC = () => (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-3">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mr-3">
            <div className="w-7 h-7 bg-pink-300 rounded-full"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Hi Lolu</h2>
            <p className="text-sm text-gray-600">
              Add Child details to have personalized shopping experience. →
            </p>
          </div>
        </div>
      </div>

      {/* Club Banner */}
      <div className="bg-yellow-100 rounded-xl p-4 flex justify-between items-center mb-5">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full mr-3"></div>
          <span className="text-lg text-gray-800">
            Join <span className="font-bold">Club</span> Now!
          </span>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800">
          Buy at ₹ 78/Month →
        </button>
      </div>

      {/* Shopping Section */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Shopping</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: "👤", title: "Account" },
          { icon: "📦", title: "Order History" },
          { icon: "🚚", title: "Track order" },
          { icon: "💰", title: "Cash Refund" },
        ].map((item, index) => (
          <button
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center hover:bg-gray-100 transition"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 text-2xl">
              {item.icon}
            </div>
            <span className="text-gray-800 text-sm">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Recently Viewed Products */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Your Recently Viewed Products
        </h3>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {["20% OFF", "48% OFF", "25% OFF"].map((offer, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-48 bg-gray-100 rounded-xl relative"
            >
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                {offer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Menu Tab Content
  const MenuContent: React.FC = () => (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center hover:opacity-80 transition"
          >
            <div
              className={`w-full aspect-square rounded-xl flex items-center justify-center mb-2 text-3xl ${item.bg}`}
            >
              {item.custom ? item.custom : item.icon}
            </div>
            <span className="text-sm text-gray-800 font-medium text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header Tabs */}
      <div className="p-4 flex gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-3 px-5 rounded-full border-2 border-orange-500 font-semibold transition ${
            activeTab === "profile"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          👤 PROFILE
        </button>

        <button
          onClick={() => setActiveTab("menu")}
          className={`flex-1 py-3 px-5 rounded-full border-2 border-orange-500 font-semibold transition ${
            activeTab === "menu"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          ☰ MENU
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto">
        {activeTab === "profile" ? <ProfileContent /> : <MenuContent />}
      </div>
    </div>
  );
};

// Menu items list with types
interface MenuItem {
  icon?: string;
  label: string;
  bg: string;
  custom?: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { icon: "👕", label: "Shop By Category", bg: "bg-pink-100" },
  {
    label: "Boutiques",
    bg: "bg-black",
    custom: (
      <div className="flex flex-col items-center justify-center p-3">
        <span className="text-orange-400 text-lg font-bold">firstcry</span>
        <span className="text-blue-400 text-sm">.com</span>
        <div className="w-16 h-px bg-white my-1"></div>
        <span className="text-white text-sm tracking-wider">BOUTIQUES</span>
      </div>
    ),
  },
  { icon: "👨‍👩‍👧", label: "Parenting", bg: "bg-pink-100" },
  { icon: "🏪", label: "Club", bg: "bg-pink-100" },
  { icon: "%", label: "Offer Zone", bg: "bg-yellow-300" },
  { icon: "🎁", label: "Gifts & Cards", bg: "bg-purple-200" },
  {
    label: "Intelli Education",
    bg: "bg-yellow-50",
    custom: (
      <div className="flex flex-col items-center justify-center p-2">
        <span className="text-blue-500 text-lg font-bold">intelli</span>
        <span className="text-green-500 text-sm">education</span>
      </div>
    ),
  },
  { icon: "🎒", label: "Preschools", bg: "bg-blue-100" },
  { icon: "🏬", label: "FirstCry Stores", bg: "bg-orange-100" },
  { icon: "🛍️", label: "Sell with Us", bg: "bg-purple-200" },
  { icon: "🎮", label: "PlayBees", bg: "bg-yellow-300" },
  { icon: "🤝", label: "Customer Service", bg: "bg-blue-100" },
];

export default ProfileMenuPage;
