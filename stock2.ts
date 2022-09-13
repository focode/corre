import yahooFinance from 'yahoo-finance2';
import { sampleCorrelation } from 'simple-statistics';

const queryOptions = { period1: '2022-08-22', /* ... */ };

let itStocks1: string[] = ['WIPRO.NS','INFY.NS', 'TCS.NS','MINDTREE.NS','LTI.NS','COFORGE.NS','ZENSARTECH.NS','TECHM.NS','HCLTECH.NS']
let itStocks2: string[] = ['WIPRO.NS','INFY.NS', 'TCS.NS','MINDTREE.NS','LTI.NS','COFORGE.NS','ZENSARTECH.NS','TECHM.NS','HCLTECH.NS']

let fetchData = async function getHistoricalValue(_stock1: string) {
    let resultList: any;
    try {
        resultList = await yahooFinance.historical(_stock1, queryOptions);
    } catch (err) {
        console.log('failed');
    }
    return resultList;
}

export let calculateCorrelation = async function (stocks) {
    let stock1: number[] = [];
    let stock2: number[] = [];
    for (const stock of stocks) {
        // console.log(stock);
        let resultList = await fetchData(stock);
        for (const data of resultList) {
            if(stock == stocks[0]){
                stock1.push(data.close);
            }else{
                stock2.push(data.close);
            }
        }
    }
    stocks.forEach((stock)=>{console.log(stock)});
    console.log(sampleCorrelation(stock1, stock2).toFixed(2));
    
}
let reqStock: string[] = [];
for (const stock1 of itStocks1) {
    for(const stock2 of itStocks2){
        if(stock1 !== stock2){
            reqStock.push(stock1,stock2);
            calculateCorrelation(reqStock);
            reqStock = [];
        }

    }
}
