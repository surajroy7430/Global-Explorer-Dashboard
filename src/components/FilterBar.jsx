import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterBar = ({ region, onRegionChange, sortBy, onSortChange }) => {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "population", label: "Population" },
    { value: "area", label: "Area" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      <Select value={region} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[180px] h-12 shadow-sm">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] h-12 shadow-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
