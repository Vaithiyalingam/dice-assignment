import { FC } from "react";

interface ISearchComponent {
  setQuery: (val: string) => void;
  setSort: (val: string) => void;
  query: string;
  sort: string;
}

export const SearchComponent: FC<ISearchComponent> = ({
  setQuery,
  setSort,
  query,
  sort,
}) => {
  return (
    <div className="w-full flex items-center">
      <input
        className="border border-gray-600 w-full p-2 focus:ring-0 focus:outline-none rounded-md"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for GitHub Repositories"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-600 p-2 focus:ring-0 focus:outline-none rounded-md ml-2"
      >
        <option value="">Select Sort Option</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Recently Updated</option>
      </select>
    </div>
  );
};
