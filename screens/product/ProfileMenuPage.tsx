import React, { useState } from "react";

const ProfileMenuPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "menu">("profile");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
  };

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
          { icon: "👤", title: "Account", action: () => setShowAccountMenu(true) },
          { icon: "📦", title: "Order History" },
          { icon: "🚚", title: "Track order" },
          { icon: "💰", title: "Cash Refund" },
        ].map((item, index) => (
          <button
            key={index}
            onClick={item.action}
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
          {[
            { offer: "20% OFF", price: "₹299", oldPrice: "374", name: "Kids T-Shirt", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&h=200&fit=crop" },
            { offer: "48% OFF", price: "₹156", oldPrice: "300", name: "Baby Shoes", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200&h=200&fit=crop" },
            { offer: "25% OFF", price: "₹225", oldPrice: "300", name: "Toy Set", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop" }
          ].map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-44 bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="relative h-44 bg-gray-100">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.offer}
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700 mb-1 truncate">{product.name}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parenting Section */}
      <div className="mt-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Parenting</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: "🏠", title: "My Feed", bg: "bg-pink-50" },
            { icon: "💉", title: "Vaccine & Growth", bg: "bg-pink-50" },
            { icon: "🏆", title: "Contests", bg: "bg-pink-50" },
            { icon: "💬", title: "Expert Q&A", bg: "bg-pink-50" },
          ].map((item, index) => (
            <button
              key={index}
              className={`${item.bg} border border-gray-200 rounded-xl p-4 flex items-center hover:bg-pink-100 transition`}
            >
              <div className="w-12 h-12 flex items-center justify-center text-3xl mr-3">
                {item.icon}
              </div>
              <span className="text-gray-800 text-base font-medium text-left">{item.title}</span>
            </button>
          ))}
        </div>

        <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition">
          <span className="text-gray-800 text-lg font-semibold">Parenting Activities</span>
          <span className="text-2xl">▼</span>
        </button>
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
      {/* My Account Menu Overlay */}
      {showAccountMenu && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Fixed Header */}
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <button 
                onClick={() => setShowAccountMenu(false)}
                className="text-2xl text-gray-600"
              >
                ←
              </button>
              <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
              <div className="w-8"></div>
            </div>
          </div>

          {/* Account Menu Items */}
          <div className="pb-6">
            {[
              { 
                title: "Cash In My Account", 
                hasExpand: true,
                subMenus: ["Cash Refund", "Cash Coupons", "Club Cash"]
              },
              { title: "Cashback Codes", hasExpand: false },
              { title: "My Refunds", hasExpand: false },
              { 
                title: "My Orders", 
                hasExpand: true,
                subMenus: ["Order History", "Track Order"]
              },
              { 
                title: "My Profile", 
                hasExpand: true,
                subMenus: ["Contact Details", "Personal Details", "Child Details"]
              },
              { title: "Address Book", hasExpand: false },
              { title: "My payment details", hasExpand: false },
              { 
                title: "Intelli Education Subscription", 
                hasExpand: true,
                subMenus: ["Intelibaby Subscription", "Intelikit Subscription"]
              },
              { title: "Gift Certificate", hasExpand: false },
              { title: "My Reviews", hasExpand: false },
              { title: "Invites and Credits", hasExpand: false },
              { title: "Notify Me", hasExpand: false },
              { title: "My Shortlist", hasExpand: false },
              { title: "My Recently Viewed", hasExpand: false },
            ].map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => item.hasExpand && toggleMenu(item.title)}
                  className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <span className="text-lg text-gray-700">{item.title}</span>
                  {item.hasExpand && (
                    <span className="text-2xl text-gray-400">
                      {expandedMenu === item.title ? "−" : "+"}
                    </span>
                  )}
                </button>

                {/* Sub Menus */}
                {item.hasExpand && expandedMenu === item.title && item.subMenus && (
                  <div className="bg-gray-50">
                    {item.subMenus.map((subMenu, subIndex) => (
                      <button
                        key={subIndex}
                        className="w-full px-12 py-4 text-left text-base text-gray-600 hover:bg-gray-100 transition border-b border-gray-100"
                      >
                        {subMenu}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Logout Button */}
            <div className="px-4 mt-6">
              <button className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Tabs */}
      <div className="sticky top-0 bg-white z-10 p-4 flex gap-2 shadow-sm">
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