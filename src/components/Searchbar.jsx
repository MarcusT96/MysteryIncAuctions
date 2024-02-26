export default function SearchBar() {
  return (
    <div>
      <input
        className="auction-search"
        type="text"
        id="search"
        placeholder="Type to search"
        data-change="search"
      />
    </div>
  );
}