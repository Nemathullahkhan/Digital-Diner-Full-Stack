import { useEffect, useState } from "react";
import { menuItemsData } from "../hooks/fetchData";
import MenuItemCard from "../components/Card";
import SearchBar from "../components/SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Loader } from "../utils/Loader";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]); // Store original data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Appetizers",
    "Main Courses",
    "Desserts",
    "Drinks",
    "Breads",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await menuItemsData();
        setMenuItems(data);
        setOriginalItems(data); // Save original data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle search by filtering items client-side
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setMenuItems(originalItems); // Reset to original data
      setSelectedCategory("All"); // Reset category filter
      return;
    }

    const lowerTerm = searchTerm.toLowerCase();
    const filtered = originalItems.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerTerm) ||
        item.category.toLowerCase().includes(lowerTerm)
    );
    setMenuItems(filtered);
    setSelectedCategory("All"); // Reset category to show all matches
  };

  // Filter by selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[88vh] bg-gradient-to-b from-zinc-100/90 to-zinc-200 text-zinc-800 ">
        <Loader/>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-800 text-zinc-300">
        <div className="text-red-500 text-xl mb-4">
          Error loading menu: {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100/90 to-zinc-200 p-4 text-zinc-300">
      <div className="max-w-[1200px] mx-auto ">
        <img
          src="https://tb-static.uber.com/prod/image-proc/processed_images/cfb96070db5bd2a4b8e7fba4bbad4ccf/ae1667b5f6a332a433cb52c8b860239e.jpeg"
          alt="Menu Banner"
          className="w-full h-32 object-cover md:h-40 lg:h-48 rounded-xl"
        />
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8"></div>

        <div className="mb-2 flex justify-between">
          <div>
            <h2 className="text-4xl tracking-tight font-medium text-black">
              Menu
            </h2>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-6 flex mx-2 gap-4 items-center border-b border-gray-300">
          <div className="flex gap-x-1 items-center">
            <GiHamburgerMenu className="text-black text-lg" />
            <h2 className="text-md font-medium text-black">Filter</h2>
          </div>
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium text-black transition-colors pb-1 ${
                  selectedCategory === category
                    ? "border-b-2 border-black"
                    : "hover:text-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <MenuItemCard key={item._id} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-black">No menu items found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
