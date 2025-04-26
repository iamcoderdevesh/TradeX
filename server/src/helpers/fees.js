export function calculateFeesByExchange(exchange, entryPrice, exitPrice, quantity) {

    if (exchange.toLowerCase() === "binance") {
        let fees = ((entryPrice * quantity) * 0.02 / 100) + ((exitPrice * quantity) * 0.05 / 100);
        return Number(fees).toFixed(2);
    }
    else {
        return 0;
    }

}