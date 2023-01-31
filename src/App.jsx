import { useEffect, useState } from "react";
import "./App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Search from "./components/Search";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerpage, setPostsPerpage] = useState(10);
  const [query, setQuery] = useState("");

  

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products?.length / postsPerpage &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const handlePrevButtonClick = (selectedPage, direction) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / postsPerpage &&
      selectedPage !== page &&
      direction === "left"
    ) {
      console.log("in the prev");

      setPage(selectedPage === 1 ? products.length / 10 : (prev) => prev - 1);
    }
  };
  const handleNextButtonClick = (selectedPage, direction) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / postsPerpage &&
      selectedPage !== page &&
      direction === "right"
    ) {
      console.log("in the next");
      setPage(
        selectedPage === products.length / 10 ? page : (prev) => prev + 1
      );
    }
  };

  const onSearchQuery = (query) => {
    setQuery(query);
  };

  const keys = ["title", "category", "brand"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = products.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase() === query.toLowerCase())
    );

    setProducts(response);
    setPostsPerpage(response.length);
    setQuery("")
  };

  console.log(query);
  console.log(products);
  return (
    <div>
      <Search onSearchQuery={onSearchQuery} handleSubmit={handleSubmit} query={query} />
      { products && products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products && products?.length > 0 && (
        <div className="wrapper">
          <div className="pagination">
            <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
          { products?.length > 0 && [...Array(products?.length / postsPerpage)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < products?.length / 10 ? "" : "pagination__disable"
              }
            >
              ▶
            </span>
          </div>
          <div className="buttons">
            <button
              className={`button ${page > 1 ? "active" : "unactive"}`}
              onClick={() => handlePrevButtonClick(page - 1, "left")}
            >
              <ArrowBackIcon className="icon__left" />
              <span>Order</span>
            </button>
            <button
              className={`button ${
                page < products.length / 10 ? "active" : "unactive"
              }`}
              onClick={() => handleNextButtonClick(page + 1, "right")}
            >
              <ArrowForwardIcon className="icon__right" />
              <span>Newer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
