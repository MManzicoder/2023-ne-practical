import { useEffect, useState } from "react";
import { API_LIMIT, API_URL, sendRequest } from "../utils/Api";
import { formatDate, formatTime } from "../utils/Utilities";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";
import ModalContainer from "../components/forms/ModalContainer";
import NewEmployeeLaptop from "../components/forms/NewEmployeeLaptop";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });
  //get user in localstorage
  const user = JSON.parse(localStorage.getItem("profile"));

  const closeModal = async (shouldNotFetch = true) => {
    setmodalShown({ shown: false, component: null });
    if (!shouldNotFetch) {
      setLoading(true);
      await fetchPurchasedDataTable(0);
      setLoading(false);
    }
  };

  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchPurchasedDataTable(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchPurchasedDataTable(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchPurchasedDataTable = async (page) => {
    let response = await sendRequest(
      API_URL + `/purchased/?page=${page}&limit=${API_LIMIT}`,
      "GET"
    );
    console.log(response);
    setData(response?.data?.data?.content);
    setCurrentPage(response?.data?.currentPage);
    setPages(response?.data?.totalPages);
    return response;
  };

  const transformData = (data) => {
    return data.map((item, i) => {
      return {
        no: i + 1,
        name: item?.user.firstName,
        date: item?.date,
        productId: item?.productCode.code,
        productName: item?.productCode.name,
        quantity: item?.quantity,
        price: item?.price,
        total: item.total,
      };
    });
  };

  const tableHeaders = [
    "No",
    "Customer Name",
    "Date",
    "Product ID",
    "Product Name",
    "Quantity",
    "Unit Price",
    "Total Price",
  ];

  return (
    <>
      <h2>Purchase History</h2>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
    </>
  );
};
