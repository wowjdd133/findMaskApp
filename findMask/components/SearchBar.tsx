import React from 'react';
import { SearchBar } from 'react-native-elements';

interface SearchProps {
  onChangeText: any;
  placeholder: string;
  value: string;
}

const Search = (props:SearchProps) => {
  return(
    <SearchBar
      {...props}
      autoCorrect={false} 
    />
  )
}

export default Search;