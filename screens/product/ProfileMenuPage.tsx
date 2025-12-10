// import React, { useState } from "react";

// const ProfileMenuPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"profile" | "menu">("profile");
//   const [showAccountMenu, setShowAccountMenu] = useState(false);
//   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

//   const toggleMenu = (menuTitle: string) => {
//     setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
//   };

//   // Profile Tab Content
//   const ProfileContent: React.FC = () => (
//     <div className="p-4">
//       {/* Welcome Section */}
//       <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-3">
//         <div className="flex items-center">
//           <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mr-3">
//             <div className="w-7 h-7 bg-pink-300 rounded-full"></div>
//           </div>
//           <div className="flex-1">
//             <h2 className="text-xl font-bold text-gray-800 mb-1">Hi Lolu</h2>
//             <p className="text-sm text-gray-600">
//               Add Child details to have personalized shopping experience. →
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Club Banner */}
//       <div className="bg-yellow-100 rounded-xl p-4 flex justify-between items-center mb-5">
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-blue-600 rounded-full mr-3"></div>
//           <span className="text-lg text-gray-800">
//             Join <span className="font-bold">Club</span> Now!
//           </span>
//         </div>
//         <button className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800">
//           Buy at ₹ 78/Month →
//         </button>
//       </div>

//       {/* Shopping Section */}
//       <h3 className="text-2xl font-bold text-gray-800 mb-4">Shopping</h3>
//       <div className="grid grid-cols-2 gap-3 mb-6">
//         {[
//           { icon: "👤", title: "Account", action: () => setShowAccountMenu(true) },
//           { icon: "📦", title: "Order History" },
//           { icon: "🚚", title: "Track order" },
//           { icon: "💰", title: "Cash Refund" },
//         ].map((item, index) => (
//           <button
//             key={index}
//             onClick={item.action}
//             className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center hover:bg-gray-100 transition"
//           >
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 text-2xl">
//               {item.icon}
//             </div>
//             <span className="text-gray-800 text-sm">{item.title}</span>
//           </button>
//         ))}
//       </div>

//       {/* Recently Viewed Products */}
//       <div className="mt-6">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">
//           Your Recently Viewed Products
//         </h3>

//         <div className="flex gap-3 overflow-x-auto pb-2">
//           {[
//             { offer: "20% OFF", price: "₹299", oldPrice: "374", name: "Kids T-Shirt", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&h=200&fit=crop" },
//             { offer: "48% OFF", price: "₹156", oldPrice: "300", name: "Baby Shoes", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200&h=200&fit=crop" },
//             { offer: "25% OFF", price: "₹225", oldPrice: "300", name: "Toy Set", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop" }
//           ].map((product, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 w-44 bg-white border border-gray-200 rounded-xl overflow-hidden"
//             >
//               <div className="relative h-44 bg-gray-100">
//                 <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
//                 <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
//                   {product.offer}
//                 </div>
//               </div>
//               <div className="p-3">
//                 <p className="text-sm text-gray-700 mb-1 truncate">{product.name}</p>
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="text-lg font-bold text-gray-800">{product.price}</span>
//                   <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
//                 </div>
//                 <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Parenting Section */}
//       <div className="mt-8 mb-6">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">Parenting</h3>

//         <div className="grid grid-cols-2 gap-3 mb-4">
//           {[
//             { icon: "🏠", title: "My Feed", bg: "bg-pink-50" },
//             { icon: "💉", title: "Vaccine & Growth", bg: "bg-pink-50" },
//             { icon: "🏆", title: "Contests", bg: "bg-pink-50" },
//             { icon: "💬", title: "Expert Q&A", bg: "bg-pink-50" },
//           ].map((item, index) => (
//             <button
//               key={index}
//               className={`${item.bg} border border-gray-200 rounded-xl p-4 flex items-center hover:bg-pink-100 transition`}
//             >
//               <div className="w-12 h-12 flex items-center justify-center text-3xl mr-3">
//                 {item.icon}
//               </div>
//               <span className="text-gray-800 text-base font-medium text-left">{item.title}</span>
//             </button>
//           ))}
//         </div>

//         <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition">
//           <span className="text-gray-800 text-lg font-semibold">Parenting Activities</span>
//           <span className="text-2xl">▼</span>
//         </button>
//       </div>
//     </div>
//   );

//   // Menu Tab Content
//   const MenuContent: React.FC = () => (
//     <div className="p-4">
//       <div className="grid grid-cols-3 gap-3">
//         {menuItems.map((item, index) => (
//           <button
//             key={index}
//             className="flex flex-col items-center hover:opacity-80 transition"
//           >
//             <div
//               className={`w-full aspect-square rounded-xl flex items-center justify-center mb-2 text-3xl ${item.bg}`}
//             >
//               {item.custom ? item.custom : item.icon}
//             </div>
//             <span className="text-sm text-gray-800 font-medium text-center">
//               {item.label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen">
//       {/* My Account Menu Overlay */}
//       {showAccountMenu && (
//         <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//           {/* Fixed Header */}
//           <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
//             <div className="flex items-center justify-between p-4">
//               <button 
//                 onClick={() => setShowAccountMenu(false)}
//                 className="text-2xl text-gray-600"
//               >
//                 ←
//               </button>
//               <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
//               <div className="w-8"></div>
//             </div>
//           </div>

//           {/* Account Menu Items */}
//           <div className="pb-6">
//             {[
//               { 
//                 title: "Cash In My Account", 
//                 hasExpand: true,
//                 subMenus: ["Cash Refund", "Cash Coupons", "Club Cash"]
//               },
//               { title: "Cashback Codes", hasExpand: false },
//               { title: "My Refunds", hasExpand: false },
//               { 
//                 title: "My Orders", 
//                 hasExpand: true,
//                 subMenus: ["Order History", "Track Order"]
//               },
//               { 
//                 title: "My Profile", 
//                 hasExpand: true,
//                 subMenus: ["Contact Details", "Personal Details", "Child Details"]
//               },
//               { title: "Address Book", hasExpand: false },
//               { title: "My payment details", hasExpand: false },
//               { 
//                 title: "Intelli Education Subscription", 
//                 hasExpand: true,
//                 subMenus: ["Intelibaby Subscription", "Intelikit Subscription"]
//               },
//               { title: "Gift Certificate", hasExpand: false },
//               { title: "My Reviews", hasExpand: false },
//               { title: "Invites and Credits", hasExpand: false },
//               { title: "Notify Me", hasExpand: false },
//               { title: "My Shortlist", hasExpand: false },
//               { title: "My Recently Viewed", hasExpand: false },
//             ].map((item, index) => (
//               <div key={index}>
//                 <button
//                   onClick={() => item.hasExpand && toggleMenu(item.title)}
//                   className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <span className="text-lg text-gray-700">{item.title}</span>
//                   {item.hasExpand && (
//                     <span className="text-2xl text-gray-400">
//                       {expandedMenu === item.title ? "−" : "+"}
//                     </span>
//                   )}
//                 </button>

//                 {/* Sub Menus */}
//                 {item.hasExpand && expandedMenu === item.title && item.subMenus && (
//                   <div className="bg-gray-50">
//                     {item.subMenus.map((subMenu, subIndex) => (
//                       <button
//                         key={subIndex}
//                         className="w-full px-12 py-4 text-left text-base text-gray-600 hover:bg-gray-100 transition border-b border-gray-100"
//                       >
//                         {subMenu}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Logout Button */}
//             <div className="px-4 mt-6">
//               <button className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition">
//                 LOGOUT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header Tabs */}
//       <div className="sticky top-0 bg-white z-10 p-4 flex gap-2 shadow-sm">
//         <button
//           onClick={() => setActiveTab("profile")}
//           className={`flex-1 py-3 px-5 rounded-full border-2 border-orange-500 font-semibold transition ${
//             activeTab === "profile"
//               ? "bg-orange-500 text-white"
//               : "bg-white text-gray-800"
//           }`}
//         >
//           👤 PROFILE
//         </button>

//         <button
//           onClick={() => setActiveTab("menu")}
//           className={`flex-1 py-3 px-5 rounded-full border-2 border-orange-500 font-semibold transition ${
//             activeTab === "menu"
//               ? "bg-orange-500 text-white"
//               : "bg-white text-gray-800"
//           }`}
//         >
//           ☰ MENU
//         </button>
//       </div>

//       {/* Content */}
//       <div className="overflow-y-auto">
//         {activeTab === "profile" ? <ProfileContent /> : <MenuContent />}
//       </div>
//     </div>
//   );
// };

// // Menu items list with types
// interface MenuItem {
//   icon?: string;
//   label: string;
//   bg: string;
//   custom?: React.ReactNode;
// }

// const menuItems: MenuItem[] = [
//   { icon: "👕", label: "Shop By Category", bg: "bg-pink-100" },
//   {
//     label: "Boutiques",
//     bg: "bg-black",
//     custom: (
//       <div className="flex flex-col items-center justify-center p-3">
//         <span className="text-orange-400 text-lg font-bold">firstcry</span>
//         <span className="text-blue-400 text-sm">.com</span>
//         <div className="w-16 h-px bg-white my-1"></div>
//         <span className="text-white text-sm tracking-wider">BOUTIQUES</span>
//       </div>
//     ),
//   },
//   { icon: "👨‍👩‍👧", label: "Parenting", bg: "bg-pink-100" },
//   { icon: "🏪", label: "Club", bg: "bg-pink-100" },
//   { icon: "%", label: "Offer Zone", bg: "bg-yellow-300" },
//   { icon: "🎁", label: "Gifts & Cards", bg: "bg-purple-200" },
//   {
//     label: "Intelli Education",
//     bg: "bg-yellow-50",
//     custom: (
//       <div className="flex flex-col items-center justify-center p-2">
//         <span className="text-blue-500 text-lg font-bold">intelli</span>
//         <span className="text-green-500 text-sm">education</span>
//       </div>
//     ),
//   },
//   { icon: "🎒", label: "Preschools", bg: "bg-blue-100" },
//   { icon: "🏬", label: "FirstCry Stores", bg: "bg-orange-100" },
//   { icon: "🛍️", label: "Sell with Us", bg: "bg-purple-200" },
//   { icon: "🎮", label: "PlayBees", bg: "bg-yellow-300" },
//   { icon: "🤝", label: "Customer Service", bg: "bg-blue-100" },
// ];

// export default ProfileMenuPage;








import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

const ProfileMenuPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "menu">("profile");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [showClubCashPage, setShowClubCashPage] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Profile Tab Content
  const ProfileContent: React.FC = () => (
    <ScrollView style={styles.profileContent}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeCard}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner} />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Hi Lolu</Text>
            <Text style={styles.welcomeSubtitle}>
              Add Child details to have personalized shopping experience. →
            </Text>
          </View>
        </View>
      </View>

      {/* Club Banner */}
      <View style={styles.clubBanner}>
        <View style={styles.clubBannerLeft}>
          <View style={styles.clubIcon} />
          <Text style={styles.clubBannerText}>
            Join <Text style={styles.clubBannerTextBold}>Club</Text> Now!
          </Text>
        </View>
        <TouchableOpacity style={styles.clubButton}>
          <Text style={styles.clubButtonText}>Buy at ₹ 78/Month →</Text>
        </TouchableOpacity>
      </View>

      {/* Shopping Section */}
      <Text style={styles.sectionTitle}>Shopping</Text>
      <View style={styles.shoppingGrid}>
        {[
          { icon: "👤", title: "Account", action: () => setShowAccountMenu(true) },
          { icon: "📦", title: "Order History" },
          { icon: "🚚", title: "Track order" },
          { icon: "💰", title: "Cash Refund" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.shoppingCard}
            onPress={item.action}
          >
            <View style={styles.shoppingIconContainer}>
              <Text style={styles.shoppingIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.shoppingTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recently Viewed Products */}
      <View style={styles.recentlyViewedSection}>
        <Text style={styles.sectionTitle}>Your Recently Viewed Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { offer: "20% OFF", price: "₹299", oldPrice: "374", name: "Kids T-Shirt" },
            { offer: "48% OFF", price: "₹156", oldPrice: "300", name: "Baby Shoes" },
            { offer: "25% OFF", price: "₹225", oldPrice: "300", name: "Toy Set" },
          ].map((product, index) => (
            <View key={index} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <View style={styles.productImage} />
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>{product.offer}</Text>
                </View>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Parenting Section */}
      <View style={styles.parentingSection}>
        <Text style={styles.sectionTitle}>Parenting</Text>
        <View style={styles.parentingGrid}>
          {[
            { icon: "🏠", title: "My Feed" },
            { icon: "💉", title: "Vaccine & Growth" },
            { icon: "🏆", title: "Contests" },
            { icon: "💬", title: "Expert Q&A" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.parentingCard}>
              <Text style={styles.parentingIcon}>{item.icon}</Text>
              <Text style={styles.parentingTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.parentingActivitiesButton}>
          <Text style={styles.parentingActivitiesText}>Parenting Activities</Text>
          <Text style={styles.parentingActivitiesIcon}>▼</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Menu Tab Content
  const MenuContent: React.FC = () => (
    <ScrollView style={styles.menuContent}>
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: item.bg }]}>
              {item.custom ? item.custom : <Text style={styles.menuIcon}>{item.icon}</Text>}
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Club Cash Page */}
      {showClubCashPage && (
        <View style={styles.fullScreenOverlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowClubCashPage(false)}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Club Cash</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView style={styles.clubCashContent}>
            {/* Current Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceCardContent}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.balanceAmount}>₹ 0</Text>
                <TouchableOpacity style={styles.shopNowButton}>
                  <Text style={styles.shopNowButtonText}>SHOP NOW</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Join Club Section */}
            <View style={styles.joinClubCard}>
              <View style={styles.joinClubHeader}>
                <View style={styles.clubIconSmall} />
                <Text style={styles.joinClubHeaderText}>
                  Join Club & Earn Club Cash Benefit On Products
                </Text>
              </View>
              <View style={styles.plansContainer}>
                {/* 3 Months Plan */}
                <View style={styles.planCard}>
                  <Text style={styles.planTitle}>3 Months</Text>
                  <Text style={styles.planPrice}>₹ 267.33</Text>
                  <Text style={styles.planOldPrice}>₹ 399</Text>
                  <Text style={styles.planDiscount}>33% OFF</Text>
                  <TouchableOpacity style={styles.addNowButton}>
                    <Text style={styles.addNowButtonText}>ADD NOW</Text>
                  </TouchableOpacity>
                </View>
                {/* 12 Months Plan */}
                <View style={styles.planCard}>
                  <Text style={styles.planTitle}>12 Months</Text>
                  <Text style={styles.planPrice}>₹ 941.97</Text>
                  <Text style={styles.planOldPrice}>₹ 1599</Text>
                  <Text style={styles.planDiscount}>41.09% OFF</Text>
                  <TouchableOpacity style={styles.addNowButton}>
                    <Text style={styles.addNowButtonText}>ADD NOW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Grass decoration */}
            <View style={styles.grassDecoration} />

            {/* How To Earn Club Cash */}
            <View style={styles.howToEarnSection}>
              <Text style={styles.sectionTitle}>How To Earn Club Cash ?</Text>
              <View style={styles.earnDescription}>
                <View style={styles.earnIconCircle}>
                  <View style={styles.earnIconSquare}>
                    <Text style={styles.earnIconText}>C</Text>
                  </View>
                </View>
                <Text style={styles.earnDescriptionText}>
                  Join Club membership & earn club cash on purchase of eligible products.
                </Text>
              </View>

              <View style={styles.planDetailsCard}>
                <Text style={styles.planDetailsTitle}>
                  ▶ 3 Months Plan & 6 Months Plan :
                </Text>
                <Text style={styles.planDetailsText}>
                  Customers receive Club Cash as per the Club cash allocation logic of Firstcry.com
                </Text>
              </View>

              <View style={styles.planDetailsCard}>
                <Text style={styles.planDetailsTitle}>▶ 12 Months Plan:</Text>
                <Text style={styles.planDetailsText}>
                  Customers receive 2 X of 3 Months Club Cash.
                </Text>
              </View>
            </View>

            {/* How shop & earn Works */}
            <View style={styles.howShopWorksSection}>
              <Text style={styles.sectionTitle}>How shop & earn Works?</Text>
              {[
                { icon: "📱", text: "Join Club" },
                { icon: "❤️", text: "Select your favourite products on Firstcry." },
                { icon: "💰", text: "Club Cash to be earned is mentioned against each eligible product" },
                { icon: "🎯", text: "Earn Club Cash on your purchase" },
                { icon: "📦", text: "Once product is successfully delivered, earned Club Cash would show in your account" },
                { icon: "💳", text: "Accumulate a minimum of ₹ 100 Club Cash" },
                { icon: "💸", text: "Pay for your order with the Club Cash earned" },
              ].map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <View style={styles.stepIconCircle}>
                    <Text style={styles.stepIcon}>{step.icon}</Text>
                  </View>
                  <Text style={styles.stepText}>{step.text}</Text>
                  {index < 6 && <View style={styles.stepConnector} />}
                </View>
              ))}
            </View>

            {/* FAQs */}
            <View style={styles.faqSection}>
              <Text style={styles.sectionTitle}>Frequently asked questions</Text>
              {[
                {
                  question: "What is the Club Cash Program on products?",
                  answer: "Club Cash is a reward program for Club members where you earn cash benefits on eligible product purchases.",
                },
                {
                  question: "How do I earn Club Cash on products?",
                  answer: "Go to Firstcry.com, become a Club member, and search for your favourite products. You will see the Club Cash available against the eligible products. On purchasing the product, the club cash for the product will be automatically added to your account within 48 hours of being successfully delivered to you.",
                },
                {
                  question: "How is my Club Cash Calculated on products?",
                  answer: "Club Cash is calculated based on the product's eligibility and your membership plan.",
                },
                {
                  question: "How do I redeem my Club Cash?",
                  answer: "You can redeem your Club Cash at checkout when making a purchase on eligible products.",
                },
                {
                  question: "What happens if I return/cancel my order?",
                  answer: "If you return or cancel your order, the Club Cash earned on that order will be deducted from your account.",
                },
                {
                  question: "Will my Club Cash expire if I don't use it?",
                  answer: "Club Cash has a validity period. Please check your account for specific expiry dates.",
                },
                {
                  question: "Can I redeem Club cash earned on the FirstCry website at the FirstCry Stores and vice-versa?",
                  answer: "Yes, you can redeem Club Cash earned on the website at FirstCry stores and vice-versa.",
                },
                {
                  question: "Can I Earn club cash if I am not a club member?",
                  answer: "No, Club Cash benefits are exclusive to Club members only. Join Club to start earning.",
                },
              ].map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => toggleFAQ(index)}
                  >
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <Text style={styles.faqIcon}>{expandedFAQ === index ? "∧" : "∨"}</Text>
                  </TouchableOpacity>
                  {expandedFAQ === index && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* My Account Menu Overlay */}
      {showAccountMenu && (
        <View style={styles.fullScreenOverlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowAccountMenu(false)}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Account</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView style={styles.accountMenuContent}>
            {[
              {
                title: "Cash In My Account",
                hasExpand: true,
                subMenus: ["Club Cash", "Cash Refund", "Cash Coupons"],
              },
              { title: "Cashback Codes", hasExpand: false },
              { title: "My Refunds", hasExpand: false },
              {
                title: "My Orders",
                hasExpand: true,
                subMenus: ["Order History", "Track Order"],
              },
              {
                title: "My Profile",
                hasExpand: true,
                subMenus: ["Contact Details", "Personal Details", "Child Details"],
              },
              { title: "Address Book", hasExpand: false },
              { title: "My payment details", hasExpand: false },
              {
                title: "Intelli Education Subscription",
                hasExpand: true,
                subMenus: ["Intelibaby Subscription", "Intelikit Subscription"],
              },
              { title: "Gift Certificate", hasExpand: false },
              { title: "My Reviews", hasExpand: false, route: "MyReviews" },
              { title: "Invites and Credits", hasExpand: false },
              { title: "Notify Me", hasExpand: false },
              { title: "My Shortlist", hasExpand: false },
              { title: "My Recently Viewed", hasExpand: false },
            ].map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.accountMenuItem}
                  onPress={() => {
                    if (item.hasExpand) {
                      toggleMenu(item.title);
                    } else if ((item as any).route) {
                      (navigation as any).push((item as any).route);
                    }
                  }}
                >
                  <Text style={styles.accountMenuItemText}>{item.title}</Text>
                  {item.hasExpand && (
                    <Text style={styles.accountMenuItemIcon}>
                      {expandedMenu === item.title ? "−" : "+"}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Sub Menus */}
                {item.hasExpand && expandedMenu === item.title && item.subMenus && (
                  <View style={styles.subMenuContainer}>
                    {item.subMenus.map((subMenu, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        style={styles.subMenuItem}
                        onPress={() => {
                          if (subMenu === "Club Cash" || subMenu === "Cash Refund" || subMenu === "Cash Coupons") {
                            setShowClubCashPage(true);
                            setShowAccountMenu(false);
                          }
                        }}
                      >
                        <Text style={styles.subMenuItemText}>{subMenu}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}

            {/* Logout Button */}
            <View style={styles.logoutContainer}>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Header Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.tabActive]}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={[styles.tabText, activeTab === "profile" && styles.tabTextActive]}>
            👤 PROFILE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "menu" && styles.tabActive]}
          onPress={() => setActiveTab("menu")}
        >
          <Text style={[styles.tabText, activeTab === "menu" && styles.tabTextActive]}>
            ☰ MENU
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "profile" ? <ProfileContent /> : <MenuContent />}
    </SafeAreaView>
  );
};

// Menu items data
const menuItems = [
  { icon: "👕", label: "Shop By Category", bg: "#FFC0CB" },
  {
    label: "Boutiques",
    bg: "#000",
    custom: (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#FFA500", fontSize: 16, fontWeight: "bold" }}>firstcry</Text>
        <Text style={{ color: "#64B5F6", fontSize: 12 }}>.com</Text>
        <View style={{ width: 40, height: 1, backgroundColor: "#fff", marginVertical: 4 }} />
        <Text style={{ color: "#fff", fontSize: 10, letterSpacing: 2 }}>BOUTIQUES</Text>
      </View>
    ),
  },
  { icon: "👨‍👩‍👧", label: "Parenting", bg: "#FFC0CB" },
  { icon: "🏪", label: "Club", bg: "#FFC0CB" },
  { icon: "%", label: "Offer Zone", bg: "#FFEB3B" },
  { icon: "🎁", label: "Gifts & Cards", bg: "#E1BEE7" },
  {
    label: "Intelli Education",
    bg: "#FFFDE7",
    custom: (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#2196F3", fontSize: 16, fontWeight: "bold" }}>intelli</Text>
        <Text style={{ color: "#4CAF50", fontSize: 12 }}>education</Text>
      </View>
    ),
  },
  { icon: "🎒", label: "Preschools", bg: "#BBDEFB" },
  { icon: "🏬", label: "FirstCry Stores", bg: "#FFE0B2" },
  { icon: "🛍️", label: "Sell with Us", bg: "#E1BEE7" },
  { icon: "🎮", label: "PlayBees", bg: "#FFEB3B" },
  { icon: "🤝", label: "Customer Service", bg: "#BBDEFB" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullScreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  backButton: {
    fontSize: 28,
    color: "#666",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  headerSpacer: {
    width: 32,
  },
  tabsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF6B35",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#FF6B35",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
  },
  profileContent: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 12,
  },
  welcomeCard: {
    backgroundColor: "#FFF3E0",
    borderWidth: 1,
    borderColor: "#FFE0B2",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F8BBD0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F06292",
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  clubBanner: {
    backgroundColor: "#FFF9C4",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  clubBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  clubIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1976D2",
    marginRight: 12,
  },
  clubBannerText: {
    fontSize: 16,
    color: "#333",
  },
  clubBannerTextBold: {
    fontWeight: "bold",
  },
  clubButton: {
    backgroundColor: "#0D47A1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clubButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  shoppingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  shoppingCard: {
    width: "48%",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  shoppingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  shoppingIcon: {
    fontSize: 24,
  },
  shoppingTitle: {
    fontSize: 14,
    color: "#333",
  },
  recentlyViewedSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  productCard: {
    width: 176,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },
  productImageContainer: {
    height: 176,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E0E0E0",
  },
  offerBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productDetails: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productOldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  parentingSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  parentingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  parentingCard: {
    width: "48%",
    backgroundColor: "#FCE4EC",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  parentingIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  parentingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  parentingActivitiesButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  parentingActivitiesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  parentingActivitiesIcon: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
    padding: 16,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  menuItem: {
    width: "31%",
    alignItems: "center",
    marginBottom: 16,
  },
  menuIconContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 32,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  accountMenuContent: {
    flex: 1,
  },
  accountMenuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  accountMenuItemText: {
    fontSize: 16,
    color: "#333",
  },
  accountMenuItemIcon: {
    fontSize: 20,
    color: "#666",
  },
  subMenuContainer: {
    backgroundColor: "#F9F9F9",
    paddingLeft: 32,
  },
  subMenuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  subMenuItemText: {
    fontSize: 14,
    color: "#666",
  },
  logoutContainer: {
    padding: 24,
  },
  logoutButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  clubCashContent: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: "#2196F3",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  balanceCardContent: {
    padding: 24,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowButtonText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "bold",
  },
  joinClubCard: {
    backgroundColor: "#FFF9C4",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  joinClubHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  clubIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1976D2",
    marginRight: 12,
  },
  joinClubHeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  plansContainer: {
    flexDirection: "row",
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  planOldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  planDiscount: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 12,
  },
  addNowButton: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addNowButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  grassDecoration: {
    height: 24,
    backgroundColor: "#4CAF50",
    marginVertical: 16,
  },
  howToEarnSection: {
    padding: 16,
  },
  earnDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  earnIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  earnIconSquare: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
  },
  earnIconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  earnDescriptionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  planDetailsCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  planDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  planDetailsText: {
    fontSize: 14,
    color: "#666",
  },
  howShopWorksSection: {
    padding: 16,
  },
  stepContainer: {
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  stepIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepIcon: {
    fontSize: 24,
  },
  stepText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  stepConnector: {
    position: "absolute",
    bottom: -16,
    width: 2,
    height: 16,
    backgroundColor: "#BDBDBD",
  },
  faqSection: {
    padding: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    paddingRight: 16,
  },
  faqIcon: {
    fontSize: 20,
    color: "#666",
  },
  faqAnswer: {
    paddingBottom: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default ProfileMenuPage;