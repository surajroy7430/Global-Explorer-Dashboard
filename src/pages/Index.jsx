import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useFavorites } from "@/hooks/useFavorites";
import { Globe, Heart } from "lucide-react";
import axios from "axios";

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3,area,subregion"
        );
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let result = [...countries];

    // Filter by tab (all or favorites)
    if (activeTab === "favorites") {
      result = result.filter((country) => favorites.includes(country.cca3));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (country) =>
          country.name.common.toLowerCase().includes(query) ||
          country.capital?.[0]?.toLowerCase().includes(query)
      );
    }

    // Filter by region
    if (region !== "All") {
      result = result.filter((country) => country.region === region);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortBy === "population") {
        return b.population - a.population;
      } else if (sortBy === "area") {
        return (b.area || 0) - (a.area || 0);
      }
      return 0;
    });

    setFilteredCountries(result);
    setCurrentPage(1);
  }, [countries, searchQuery, region, sortBy, favorites, activeTab]);

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCountries = filteredCountries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="all" className="gap-2">
              <Globe size={18} />
              All Countries
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart size={18} />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <FilterBar
                region={region}
                onRegionChange={setRegion}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Results Count */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {startIndex + 1}-
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filteredCountries.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {filteredCountries.length}
                </span>{" "}
                countries
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Country Grid */}
            {filteredCountries.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {activeTab === "favorites"
                    ? "No favorites yet. Start exploring and save your favorite countries!"
                    : "No countries found. Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedCountries.map((country) => (
                    <CountryCard
                      key={country.cca3}
                      country={country}
                      isFavorite={isFavorite(country.cca3)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination>
                      <PaginationContent className="flex-wrap gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            }
                          />
                        </PaginationItem>

                        {/* First page */}
                        {currentPage > 3 && (
                          <>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handlePageChange(1)}
                                isActive={currentPage === 1}
                                className="cursor-pointer"
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            {currentPage > 4 && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                          </>
                        )}

                        {/* Page numbers around current */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((page) => {
                            if (totalPages <= 7) return true;
                            if (page === 1 || page === totalPages) return false;
                            return Math.abs(page - currentPage) <= 1;
                          })
                          .map((page) => (
                            <PaginationItem
                              key={page}
                              className="hidden sm:inline-block"
                            >
                              <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                        {/* Mobile: show only current page */}
                        <PaginationItem className="sm:hidden">
                          <PaginationLink isActive className="cursor-default">
                            {currentPage}
                          </PaginationLink>
                        </PaginationItem>

                        {/* Last page */}
                        {currentPage < totalPages - 2 && (
                          <>
                            {currentPage < totalPages - 3 && (
                              <PaginationItem className="hidden sm:inline-block">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                            <PaginationItem className="hidden sm:inline-block">
                              <PaginationLink
                                onClick={() => handlePageChange(totalPages)}
                                isActive={currentPage === totalPages}
                                className="cursor-pointer"
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
