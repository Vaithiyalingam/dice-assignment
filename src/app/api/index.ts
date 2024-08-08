export const fetchRepos = async (query: string, sort?: string) => {
    let url = `https://api.github.com/search/repositories?q=${query}`;
    
    if (sort) {
      url += `&sort=${sort}`;
    }
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
  
    const data = await response.json();
    return data.items;
  }