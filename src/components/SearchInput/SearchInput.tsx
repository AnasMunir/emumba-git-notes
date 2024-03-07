import "./styles.css";

function SearchInput({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      className='search-input'
      type='text'
      name='searchInput'
      value={searchValue}
      placeholder='Search..'
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

export default SearchInput;
