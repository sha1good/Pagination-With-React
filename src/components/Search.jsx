import "./search.css";

const Search = ({query,onSearchQuery, handleSubmit}) => {
  return (
    <div className="search">
      <h1 className="searchTitle">Search Form</h1>
      <div className="top">
        <input
          type="text"
          className="input"
          name="title"
          placeholder="Search by title..."
          value={query}
          onChange={(event) => onSearchQuery(event.target.value)}
        />
        <input
          type="text"
          className="input"
          name="category"
          placeholder="Search by category..."
          onChange={(event) => onSearchQuery(event.target.value)}
          value={query}
        />
      </div>
      <div className="bottom">
        <input
          type="text"
          className="input"
          name="brand"
          placeholder="Search by brand..."
          value={query}
          onChange={(event) => onSearchQuery(event.target.value)}
        />
        <button className="submitButton" onClick={(event) => handleSubmit(event)}>Search</button>
      </div>
    </div>
  );
};

export default Search;
