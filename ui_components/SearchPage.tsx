"use client";
import { useState, useEffect, useRef } from "react";
import { Repository } from "../types/types";
import { SearchComponent } from "./SearchComponent";
import { SearchResults } from "./SearchResults";
import { fetchRepos } from "@/app/api";
import debounce from "lodash.debounce";

const debouncedSearch = debounce(
  async (
    query: string,
    sort: string,
    onSuccess: (data: Repository[]) => void,
    onError: (error: string) => void
  ) => {
    if (!query) {
      onSuccess([]);
      return;
    }
    try {
      const data = await fetchRepos(query, sort || undefined);
      onSuccess(data);
    } catch (e: any) {
      onError(e.message);
    }
  },
  500
);

export const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isSearchCompleted, setIsSearchCompleted] = useState<boolean>(false);

  const isMounted = useRef(true);

  useEffect(() => {
    const handleSearch = () => {
      setLoading(true);
      setError(null);
      setIsSearchCompleted(false);
      debouncedSearch(
        query,
        sort,
        (data) => {
          if (isMounted.current) {
            setRepos(data);
            setIsSearchCompleted(true);
            setLoading(false);
          }
        },
        (err) => {
          if (isMounted.current) {
            setError(err);
            setIsSearchCompleted(true);
            setLoading(false);
          }
        }
      );
    };

    handleSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, sort]);

  const shouldShowNoResults =
    !loading && !error && isSearchCompleted && repos.length === 0 && query;

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center">
        <SearchComponent
          setQuery={setQuery}
          setSort={setSort}
          query={query}
          sort={sort}
        />
      </div>
      <div className="w-full mt-5 flex flex-col items-center">
        {loading && <p className="text-gray-500 text-xl mt-10">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {shouldShowNoResults && (
          <p className="text-gray-500 text-xl mt-10">No Results Found</p>
        )}
        {!loading && !error && repos.length > 0 && (
          <SearchResults repos={repos} />
        )}
      </div>
    </div>
  );
};
