import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import WeatherWidget from "@/components/WeatherWidget";
import NewsCard from "@/components/NewsCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Languages,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { getCountryCode } from "../utils/getCountryCode";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch country data
        const countryResponse = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,population,cca3,area,subregion,languages,currencies,borders,latlng`
        );
        const countryData = countryResponse.data;
        setCountry(countryData);

        if (countryData) {
          const weatherResponse = await axios.get(`
            https://api.openweathermap.org/data/2.5/weather?q=${
              countryData.capital?.[0]
            }&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);

          setWeather(weatherResponse.data);

          const newsResponse = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${getCountryCode(
              countryData.cca3
            )}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
          );
          setNews(newsResponse.data.articles);
        }
      } catch (err) {
        setError("Failed to fetch country details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  if (loading) return <LoadingSpinner message="Loading country details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!country) return <ErrorMessage message="Country not found" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2" size={18} />
            Back to Explorer
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Country Info */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 h-48 flex-shrink-0">
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">
                    {country.name.common}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">
                    {country.name.official}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{country.region}</Badge>
                    {country.subregion && (
                      <Badge variant="outline">{country.subregion}</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Capital</p>
                      <p className="text-muted-foreground">
                        {country.capital?.[0] || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Population</p>
                      <p className="text-muted-foreground">
                        {country.population.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Area</p>
                      <p className="text-muted-foreground">
                        {country.area.toLocaleString()} km²
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Languages className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Languages</p>
                      <p className="text-muted-foreground">
                        {country.languages
                          ? Object.values(country.languages).join(", ")
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Currencies</p>
                      <p className="text-muted-foreground">
                        {country.currencies
                          ? Object.values(country.currencies)
                              .map((c) => `${c.name} (${c.symbol})`)
                              .join(", ")
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {country.borders && country.borders.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <p className="font-semibold mb-3">Bordering Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {country.borders.map((border) => (
                        <Link key={border} to={`/country/${border}`}>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {border}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weather Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">Weather Information</h2>
          <WeatherWidget weather={weather} />
        </div>

        {/* News Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length === 0 ? (
              <ErrorMessage title="Not Found" message="No news data available" />
            ) : (
              news
                .slice(0, 3)
                .map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
