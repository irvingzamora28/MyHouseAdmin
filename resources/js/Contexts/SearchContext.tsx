import React from 'react';

interface SearchContextProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextProps>({
    searchQuery: '',
    setSearchQuery: () => {},
});
