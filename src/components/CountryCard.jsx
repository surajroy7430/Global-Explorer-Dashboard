import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  return (
    <Card className="overflow-hidden card-hover animate-fade-in group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          size="icon"
          variant={isFavorite ? "default" : "secondary"}
          className="absolute top-3 right-3 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(country.cca3);
          }}
        >
          <Heart className={isFavorite ? "fill-current" : ""} size={18} />
        </Button>
      </div>
      <CardContent className="p-5">
        <Link to={`/country/${country.cca3}`}>
          <h3 className="text-xl font-bold mb-2 text-foreground hover:text-primary transition-colors">
            {country.name.common}
          </h3>
        </Link>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <span>
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {country.region}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
