import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        size={20}
      />
      <Input
        type="text"
        placeholder="Search by country or capital..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
