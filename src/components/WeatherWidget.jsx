import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

const WeatherWidget = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between items-center w-full">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="text-primary" />
          Current Weather in {weather.name}
        </CardTitle>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="h-16 w-16 drop-shadow-lg animate-pulse"
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Thermometer className="text-primary mb-2" size={24} />
            <span className="text-2xl font-bold">
              {Math.round(weather.main.temp)}°C
            </span>
            <span className="text-sm text-muted-foreground">Temperature</span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Cloud className="text-primary mb-2" size={24} />
            <span className="text-lg font-semibold">
              {weather.weather[0].main}
            </span>
            <span className="text-sm text-muted-foreground capitalize">
              {weather.weather[0].description}
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Droplets className="text-primary mb-2" size={24} />
            <span className="text-2xl font-bold">{weather.main.humidity}%</span>
            <span className="text-sm text-muted-foreground">Humidity</span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Wind className="text-primary mb-2" size={24} />
            <span className="text-2xl font-bold">{weather.wind.speed} m/s</span>
            <span className="text-sm text-muted-foreground">Wind Speed</span>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Feels like {Math.round(weather.main.feels_like)}°C
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
