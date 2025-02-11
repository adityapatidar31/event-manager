import { Input } from "@/components/ui/input";
import { useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();

  // const debounced = useDebouncedCallback((query) => {
  //   if (query.length < 3) {
  //     navigate("?", { replace: true });
  //   } else {
  //     navigate(`?search=${query}`, { replace: true });
  //   }
  // }, 1000);

  return (
    <Input
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        // debounced(e.target.value);
      }}
      placeholder="Search Tour"
    />
  );
}
