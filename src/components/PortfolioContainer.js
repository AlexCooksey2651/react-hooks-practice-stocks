import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolioStocks, sellStock }) {
  console.log(portfolioStocks)
  const portfolioStockCards = portfolioStocks.map(stock => {
    return (
      <Stock key={stock.id} stock={stock} handleClick={sellStock}/>
    )
  })
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStockCards}
    </div>
  );
}

export default PortfolioContainer;
