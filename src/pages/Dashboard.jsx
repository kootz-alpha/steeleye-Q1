import { useState } from "react";

// Data
import mockData from "../assets/data.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [orderList, setOrderList] = useState(mockData.results);

  const handleOrderSelect = (orderId) => {

    console.log("Selected order with id ", orderId);
    const selectedOrder = mockData.results.find((order) => order["&id"] === orderId);

    setSelectedOrderDetails(selectedOrder.executionDetails);
    setSelectedOrderTimeStamps(selectedOrder.timestamps);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    if (e.target.value !== "") {
      const filtered = mockData.results.filter((order) => order["&id"].startsWith(e.target.value));
      setOrderList(filtered);
    } else {
      // If the search text is empty, show all rows (reset to the original data)
      setOrderList(mockData.results);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle="6 orders" /> 
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={handleSearchChange}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List 
          rows={orderList}
          selectedCurrency={currency} 
          onOrderSelect={handleOrderSelect}
        />
      </div>
    </div>
  );
};

export default Dashboard;
