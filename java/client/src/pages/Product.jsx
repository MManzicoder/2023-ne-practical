import { useEffect, useState } from "react";
import { API_LIMIT, API_URL, sendRequest } from "../utils/Api";
import { formatDate, formatTime } from "../utils/Utilities";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";
import ModalContainer from "../components/forms/ModalContainer";
import NewEmployeeLaptop from "../components/forms/NewEmployeeLaptop";
import ProductCard from "../components/ProductCard";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { errorToast } from "../utils/Toast";

export const Product = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(API_URL + `/products/`, "GET");
    console.log(response.data.data.content);
    setData(response.data.data.content);
    return response;
  };
  const handleCheckout = async () => {
    setLoading(true);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      errorToast("Cart is empty");
      return;
    }
    const result = await sendRequest(
      API_URL + `/purchased/checkout`,
      "POST",
      cart
    );
    if (result.data.success) {
      setLoading(true);
      successToast("Successfully Purchased products");
    } else {
      setLoading(true);
      errorToast(response?.data?.message || "Error occurred while purchasing");
    }
  };

  return (
    <>
      <h2>All available products</h2>
      <div className="flex items-center justify-around w-60">
        <div className="cart mt-12" style={{ position: "relative", top: -25 }}>
          <AiOutlineShoppingCart color="blue" size={30} />
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -3,
              zIndex: 2000,
              color: "red",
            }}
          >
            {JSON.parse(localStorage.getItem("cart"))?.length || 0}
          </span>
        </div>
        <div className="checkout px-4">
          <button className="text-white p-3" onClick={handleCheckout}>
            {loading ? "CHECKING .." : "CHECKOUT"}
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center mt-10 flex-row flex-wrap">
        {data?.length > 0 ? (
          data.map((item) => <ProductCard product={item} />)
        ) : (
          <h2>No products available</h2>
        )}
      </div>
    </>
  );
};
