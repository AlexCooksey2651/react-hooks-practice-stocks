import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
  const [sortedBy, setSortedBy] = useState("")
  const [filteredBy, setFilteredBy] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(response => response.json())
      .then(stocks => setStocks(stocks))
  }, [])

  useEffect(() => {
    if (sortedBy === "Alphabetically") {
      sortByName()
    } else if (sortedBy === "Price") {
      sortByPrice()
    }
  }, [sortedBy])

  useEffect(() => {
    if (filteredBy === "Tech") {
      const techStocks = showTech()
      setStocks(techStocks)
    } else if (filteredBy === "Sportswear") {
      const sportswearStocks = showSportswear()
      setStocks(sportswearStocks)
    } else if (filteredBy === "Finance") {
      const financeStocks = showFinance()
      setStocks(financeStocks)
    } 
  }, [filteredBy])

  function handleAddStockToPortfolio(newStock) {
    if (!portfolioStocks.includes(newStock)) {
      setPortfolioStocks([...portfolioStocks, newStock])
    } else {
      alert('You already own that stock!')
    }
  }

  function handleRemoveStockFromPortfolio(soldStock) {
    const unsoldStocks = portfolioStocks.filter(stock => {
      return stock.id !== soldStock.id
    }) 
    setPortfolioStocks(unsoldStocks)
  }

  function sortStocks(event) {
    setSortedBy(event.target.value)
  }
  
  function sortByName() {
    const sortedByName = [...stocks].sort((a,b) => {
      let stockA = a.name.toLowerCase()
      let stockB = b.name.toLowerCase()
      if (stockA < stockB) {
        return -1
      } if (stockA > stockB) {
        return 1
      }
      return 0
    })
    setStocks(sortedByName)
  }

  function sortByPrice() {
    const sortedByPrice = [...stocks].sort((a,b) => {
      let priceA = parseInt(a.price)
      let priceB = parseInt(b.price)
      if (priceA < priceB) {
        return -1
      } else if (priceA > priceB) {
        return 1
      }
      return 0
    })
    setStocks(sortedByPrice)
  }

  function handleFilter(event) {
    setFilteredBy(event.target.value)
  }

  function showTech() {
    const techStocks = stocks.filter(stock => stock.type === "Tech")
    return techStocks
  }

  function showSportswear() {
    const sportswearStocks = stocks.filter(stock => stock.type === "Sportswear")
    return sportswearStocks
  }

  function showFinance() {
    const financeStocks = stocks.filter(stock => stock.type === "Finance")
    return financeStocks
  }



  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortedBy={sortedBy} handleFilter={handleFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} buyStock={handleAddStockToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} sellStock={handleRemoveStockFromPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
