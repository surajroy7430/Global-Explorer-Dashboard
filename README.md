# Global Explorer Dashboard

An interactive web application for exploring countries, their weather, and local news from around the world.

## Features

### Country Explorer
- Browse and search through 250+ countries
- Filter by region (Africa, Americas, Asia, Europe, Oceania)
- Sort by name, population, or area
- Paginated results with 12 countries per page
- Responsive grid layout

### Favorites
- Mark countries as favorites
- View all favorites in a dedicated tab
- Favorites persist in local storage

### Country Details
- Comprehensive country information including:
  - Flag and official name
  - Capital city
  - Languages and currencies
  - Population and area
  - Subregion and neighboring countries
- Current weather for the capital city
- Latest news headlines from the country

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

## APIs Used

### REST Countries API
- **Endpoint**: `https://restcountries.com/v3.1/all`
- **Purpose**: Fetch country data including names, flags, capitals, population, and more
- **Documentation**: https://restcountries.com/

### Open Weather API 
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Purpose**: Fetch weather data with cityname
- **Future API**: https://openweathermap.org/api

### News API
- **Endpoint**: `https://newsapi.org/v2/top-headlines`
- **Purpose**: Fetch news data with country code
- **Future API**: https://newsapi.org/

## Installation

1. Clone the repository
```bash
git clone https://github.com/surajroy7430/Global-Explorer-Dashboard.git
cd Global-Explorer-Dashboard
```

2. Install dependencies
```bash
bun install
```

3. Start the development server
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── CountryCard.jsx  # Country card component
│   ├── SearchBar.jsx    # Search input component
│   ├── FilterBar.jsx    # Filter and sort controls
│   ├── WeatherWidget.jsx # Weather display
│   ├── NewsCard.jsx     # News card component
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── pages/
│   ├── Index.jsx        # Home page with country list
│   ├── CountryDetails.jsx # Country details page
│   └── NotFound.jsx     # 404 page
├── hooks/
│   └── useFavorites.js  # Favorites management hook
├── App.tsx              # Main app component with routing
└── main.tsx            # Entry point
```

## Usage

### Browse Countries
- View all countries on the home page
- Use the search bar to find countries by name or capital
- Apply filters to narrow down by region
- Sort countries by name, population, or area

### View Country Details
- Click on any country card to view detailed information
- See current weather for the capital city
- Read the latest news headlines from that country

### Manage Favorites
- Click the heart icon on any country card to add/remove favorites
- Switch to the "Favorites" tab to view your saved countries
- Favorites are saved automatically in your browser
