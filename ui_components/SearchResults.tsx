import { FC } from "react";
import { Repository } from "../types/types";
import Image from "next/image";

interface ISearchResults {
  repos: Repository[];
}

export const SearchResults: FC<ISearchResults> = ({ repos }) => {
  return (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="repo-card border border-gray-600 rounded-xl p-4 mb-4 flex flex-col h-60 w-[350px]"
          >
            <Image
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mb-4"
            />
            <h3 className="text-lg font-bold">
              {repo.name.length > 25
                ? `${repo.name.substring(0, 25)}...`
                : repo.name}
            </h3>
            <p className="text-sm flex-grow overflow-hidden">
              {repo.description
                ? repo.description.length > 80
                  ? `${repo.description.substring(0, 80)}...`
                  : repo.description
                : "No description provided."}
            </p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Language: {repo.language || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
