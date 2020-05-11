import React from "react"
import save_vs_invest from "../images/save_vs_invest.PNG"
import risk_reward from "../images/risk_reward.PNG"
const paragraphStyle = {
    fontSize: "15px"
}
const questionList = [
    {
        "question": "How much can I earn by putting my money in a savings account?",
        "description": "On average, 1.5% with no risk",
        "answer":
            <div>
                <p style={paragraphStyle}>
                    When you put money in a savings account, you are guaranteed to earn whatever interest rate the bank offers. That is, if the bank offers 1.5% per year, then that’s exactly what you’ll get.
                    <br />
                    <br />
                    You can find out which banks offer the best rates <a href="https://www.highinterestsavings.ca/chart/"> here</a> if you’re in Canada or  <a href="https://www.bankrate.com/banking/savings/rates/"> here </a>  if you’re in the United States.
                </p>
            </div>
    },
    {
        "question": "How much can I earn by investing my money?",
        "description": "On average, 10% with ups and downs",
        "answer":
            <div>
                <p style={paragraphStyle}>
                    You can expect to earn approximately 10% per year. You might ask, how can that be so much higher than a savings account? Well, the catch here is that you are taking on risk and can lose money!
                    <br />
                    <br />
                    There are good and bad years, but if you are long term focused, history says that despite all the ups and downs you will earn on average 10% per year.

                </p>
            </div>
    },
    {
        "question": "What is the difference between saving and investing?",
        "description": "The risk of losing money",
        "answer":
            <div>
                <p style={paragraphStyle}>
                    When it comes to both saving and investing, you set aside money today and expect it to grow into a larger amount in the future. The main difference between investing and saving is the risk of losing money.
                    <br />
                    <br />
                    The chart below illustrates just that. By investing in stocks, there’s a risk of losing money, hence the ups and downs. By putting your money in a savings account however, you do not risk losing money, hence the straight line.
                </p>
                <br />
                <img src={save_vs_invest} alt="Saving vs. Investing"></img>
                <p>
                    <br />
                    Notice that despite the ups and downs of investing, the return on your money ended up being a lot higher
                </p>
            </div>
    },
    {
        "question": "Higher Risk = Higher Reward. What is meant by this?",
        "description": "The market compensates risk-takers more",
        "answer": <div>
            <p>
                There’s a very famous saying in finance: high risk = high reward. That is, the more risk you take, the more return you expect to earn.
                <br />
                This is intuitive – It would be silly to invest in something risky and not expect a high return in exchange!
            </p>
            <br />
            <img src={risk_reward} alt="Risk and Reward Tradeoff"></img>
        </div>
    },
    {
        "question": "When should I start investing? ",
        "description": "As soon as you have paid off high interest rate debt",
        "answer": <div>
            <p>
                Once you have paid off your high interest debt (such as credit card) and built your emergency fund, you should start investing immediately. Your future you will thank you.
                <br /><br />
                Also, don’t wait for the “market to tank”. Nobody knows for sure when that will happen and if it will even happen anytime soon.

            </p>
        </div>
    },
    {
        "question": "What are some ways I can invest my money?",
        "description": "Stocks, Mutual Funds, ETFs etc",
        "answer": <div>
            <p>
                There are plenty of ways you can invest your money, the most common being: stocks, mutual funds or exchange traded funds
            </p>
        </div>
    },
    {
        "question": "What is a stock?",
        "description": "Owning a small percentage of a company",
        "answer": <div>
            <p>
                Did you know that the company Tesla is worth over $145 billion dollars? If you believed me there, you might wonder who holds all that wealth.
                <br /><br />
                Tesla is owned by those who hold its stock, that’s plenty of people! You too can own a fraction by buying its stock.
                <br /><br />
                However, unless you have the resources of a large institution and are an expert in finance and accounting, I do not suggest picking stocks on your own

            </p>
        </div>
    },
    {
        "question": "What is a Mutual Fund?",
        "description": "You have someone pick stocks for you for a fee",
        "answer": <div>
            <p>
                As I mentioned above, it is important that you understand accounting and finance if you want to be (possibly) successful in picking stocks.
                <br /><br />
                This is why mutual funds were created: you let an investment professional pick stocks and other financial products for you. What’s the catch? Well, they charge you a lot of money for their service. Despite that, I believe you are better off investing in a mutual fund than picking stocks on your own.
                <br /><br />
                Keep in mind that although there are lots of great mutual funds out there, most of them fail to do better than a simple and common Exchange Traded Funds (ETF) such as the <i> Vanguard S&P 500</i> which holds the biggest 500 companies in the United States.
            </p>
        </div>
    },
    {
        "question": "What is an Exchange Traded Fund (ETF)?",
        "description": "An all-in-one package of stocks and other financial products",
        "answer": <div>
            <p>
                An ETF can be thought of as an all-in-one collection of stocks and/or other financial products.
                <br /><br />
                Suppose you believe the U.S economy will continue to be strong. You know that some stocks will perform poorly but the majority will do well. Since you’re not exactly sure which stocks to buy, you decided to buy them all, one by one.
                <br />
                Well, that’s not practical at all – it’ll take you forever to buy every single one and the fees for this approach are ridiculously high.
                <br /><br />
                The other approach you can take is to simply buy an ETF, for example <i> Vanguard S&P 500</i>. With that, you can achieve the above with next to 0 fees and as little as a few mouse clicks!

            </p>
        </div>
    },
    {
        "question": "What is a portfolio?",
        "description": "The financial products you decided to invest in",
        "answer": <div>
            <p>
                A portfolio is simply the collection of financial products you hold in your account – That is: stocks, ETFs, mutual funds etc
            </p>
        </div>
    },
    {
        "question": "What is the simplest and a safe way to invest?",
        "description": "Warren Buffett suggests index ETFs",
        "answer": <div>
            <p>
                If you are in young and very long term focused, you can take Warren Buffet’s advice: “Consistently buy an S&P 500 low-cost ETF”. S&P 500 ETF contains the biggest 500 companies in the United States, such as Apple, Amazon, Walmart etc.
            <br /><br />
            You can also buy ETFs that contain the biggest stocks in Canada, or perhaps Europe – whatever you believe in!
            </p>
        </div>
    },
    {
        "question": "What’s a more exciting way to invest?",
        "description": "Explore other financial products",
        "answer": <div>
            <p>
                If you are feeling more adventurous, consider looking at the sample portfolios that come with your account – I posted a wide variety there. If you like one of them, you can create a similar portfolio in your investment account. You can always tailor them a little more to fit your risk/return characteristics.
            <br /><br />
            For more, <a href="https://etfdb.com/etfs/">ETFdb</a> is a great resource for finding ETFs and <a href=" https://www.investopedia.com/">Investopedia</a> will be useful to understanding the different financial products available.

            </p>
        </div>
    },
    {
        "question": "How I built my own portfolio",
        "description": "I was inspired by Ray Dalio's approach",
        "answer": <div>
            <p>
                I treat each ETF I invest in as a bet. Each bet must adhere to the following criteria:
                <ul>
                    <li>
                        Historically, it made positive returns
                    </li>
                    <li>
                        Has a maximum correlation of 0.6 to my other ETFs
                    </li>
                    <li>
                        Answers yes to my question: will this sector/industry/commodity be more or less relevant in the next 5 years?
                    </li>
                </ul>
                The above criteria leaves me with 9 bets. Since they’re all uncorrelated and made great returns in the past, what’s the likelihood that they all turn out to be bad bets?
                Unless something terrible happens – perish the thought – I think that’s next to 0. Perhaps one, two or three bets will be bad but I am somewhat confident that the rest will do just fine!
            </p>
        </div>
    },
    {
        "question": "How can I start investing in Exchange Traded Funds? ",
        "description": "Open an investment account at an online broker",
        "answer": <div>
            <p>
                It’s simple, all one must do is open an investment account. Here are examples of online brokers where you can open an investment account: Questrade, Qtrade Investor, TD Direct Investing, Intereactive Brokers and BMO InvestorLine.
                <br /><br />
                I personally live in Canada and use Questrade for its simplicity of use, superb customer service and most importantly, super low fees.
            </p>
        </div>
    },
    {
        "question": "I selected my ETFs, what’s next? ",
        "description": "Build your portfolio on NestQ and analyze it",
        "answer": <div>
            <p>
                On NestQ’s portfolios page, click on Create New Portfolio and fill up the form. Once you’ve created your portfolio, analyze it and compare it to other portfolios.
            </p>
        </div>
    },
    {
        "question": "Portfolio Form: What is Allocation Type?",
        "description": "What percentage of your money should go to each ETF",
        "answer": <div>
            <p>
                Allocation type refers to what percentage each ETF should represent on your portfolio. You can enter the percentages (weights) manually or let one of the optimization techniques available do that for you.
            </p>
        </div>
    },
    {
        "question": "Portfolio Form: Which Optimization Technique should I choose?",
        "description": "Depends on your investing objective",
        "answer": <div>
            <p>
                Below I explain what each optimizer aims to achieve, you can choose the one that fits your needs:
            </p>
            <ul>
                <li>
                    <b>Maximum Sharpe Ratio:</b> Maximize the return per unit of risk (Ratio of return to risk)
                </li>
                <li>
                    <b>Efficient Return:</b> Achieve a certain level of return with the lowest amount of risk possible
                </li>
                <li>
                    <b>Efficient Volatility: </b>Achieve the highest level of return possible for a given amount of risk
                </li>
                <li>
                    <b>Minimum Volatility: </b>Achieve the highest level of return possible for the least amount of risk possible
                </li>
                <li>
                    <b>Hierarchical Risk Parity:</b> Another method for building a portfolio with the least amount of risk. This method is shown to be more robust than Minimum Volatility
                </li>
            </ul>
            <p>Note: The optimization techniques above assume that history repeats itself</p>
        </div >
    },
    {
        "question": "Portfolio Form: What is a L2-Regularizer?",
        "description": "Prevents the neglect of one or more of the ETFs selected",
        "answer": <div>
            <p>
                A L2-Regularizer prevents the optimizer, if possible, from concentrating the allocation to few ETFs and neglecting the others. I suggest activating this feature for a more robust and diversified portfolio.
            </p>
        </div>
    },
    {
        "question": "Portfolio Form: What is Optimization Period?",
        "description": "The period for which you want the optimizer to base its allocation decision. Leave blank to use all available data",
        "answer": <div>
            <p>
                We’ve all heard of those that say, “Had I invested in Bitcoin, I would be rich by now”. Does that mean that history will repeat itself again and that Bitcoin will experience the same boom again?
                <br /><br />
                The optimizers provided work in a similar way. They look back at the historical performance of ETFs and allocate weights in way that achieves your goal. However, there is no guarantee you will achieve the same results if you start investing today.
                <br /><br />
                Here’s what you can do about this: optimize a portfolio for a period of your choice, then test it in a different period.
                <br />
                For example, optimize your portfolio for period A, say 2006 to 2015, and analyze in period B, say 2016 to 2020 and assess whether it achieves its objective. If it does, there’s a higher probability that this objective will be achieved again if you start investing today. But once again, no guarantee!

            </p>
        </div>
    },
    {
        "question": "Portfolio Form: What is Rebalancing Frequency?",
        "description": "Maintaining the original weights after the market moves",
        "answer": <div>
            <p>
                As the value of each ETF changes, their weightings in the portfolio changes accordingly. Rebalancing is the process of buying and selling your ETFs in order to maintain the original set of weights.
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Compounded growth of a $1,000 investment",
        "description": "An investment's account balance over time",
        "answer": <div>
            <p>
                Had you invested $1,000 in the period in question, this chart shows the hypothetical the balance of your investment(s) over time
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Drawdowns",
        "description": "An investment's % loss before recovering to its all-time high",
        "answer": <div>
            <p>
                A chart that illustrates the percentage loss in an investment before it recovers back to its all-time high
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Annual returns",
        "description": "Return per calendar year",
        "answer": <div>
            <p>
                A table that contains the percentage return per year of an investment
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Monte Carlo simulation ",
        "description": "A simulation of how the portfolio will perform in the future",
        "answer": <div>
            <p>
                A simulation of how your investment would perform in the future. The 5th percentile would be a bad case scenario and the 95th percentile represents the good case scenario.
                <br /><br />
                Note: This is but a simulation and the actual performance could differ significantly

            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Attribution (Advanced)",
        "description": "Sources of returns to a portfolio",
        "answer": <div>
            <p>
                When making investments, you are taking risks. Attribution is one you can identify the risks you are taking. The table presented is a regression of your investments’ returns on the Fama-French factors. Here’s what the values mean:
            </p>
            <ul>
                <li>
                    Market Risk: if all stocks, on average, move up by 1%, by which multiple of 1% does my portfolio move? For example, if the multiple is 2, it means when stocks went up by 1%, your portfolio on average moved up by 2%
                </li>
                <li>
                    Size Risk: Smaller capitalization stocks are generally more risky. If positive and high, the investment is holding smaller cap stocks
                </li>
                <li>
                    Value Risk: Growth stocks are generally more risky than value stocks. If positive, the investment is holding value stocks
                </li>
                <li>
                    Alpha: How much additional return you make per month without taking any of the risks listed above => the higher the better
                </li>
                <li>
                    R-Square: How much of the variation in the returns of my portfolios is explained by taking the risks above
                </li>
            </ul>
        </div>
    },
    {
        "question": "Analysis and Comparison: Average Annual Return",
        "description": "(Higher = better) Measures an investment's long-term performance",
        "answer": <div>
            <p>
                The historical return on an investment per year. 
                <br/>
                For reference, the average savings account returns approximately 1.5% per year
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Annual Volatility",
        "description": "(lower = better) Measures an investment's risk",
        "answer": <div>
            <p>
                Unlike savings accounts who have predictable and consistent returns, returns from ETFs vary a lot. 
                <br/><br/>
                The annual volatility can be thought of as a way to measure the consistency of the returns. Therefore, the higher it is the riskier and more unpredictable the investment is. For reference, a savings account has a volatility of 0
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Sharpe Ratio",
        "description": "(Higher = better) Measures the return per unit of risk",
        "answer": <div>
            <p>
                Can be thought of as a way to measure the quality of an investment’s return. It is the ratio of the average annual return to the annual volatility. 
                <br/>
                Note: If the Sharpe is negative, it means that the average savings account performed better
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Positive Months Ratio",
        "description": "(Higher = better) Likelihood of an investment to have a positive return in month",
        "answer": <div>
            <p>
                The % of the months where the portfolio had positive returns
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Monthly 95% VAR",
        "description": "(Higher = better) Worst return you can expect in month, with a 95% confidence",
        "answer": <div>
            <p>
                The worst return an investment can experience in a month (with a 95% confidence level)
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Monthly 95% CVAR",
        "description": "(Higher = better) Return per month in a very bad market",
        "answer": <div>
            <p>
                How much a portfolio is expected to return in a month during very bad and rare markets which occur only 5% of the time
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Downside Annual Volatility:",
        "description": "(Lower = better) Measures an investment's risk",
        "answer": <div>
            <p>
                Unlike Annual Volatility, Downside Annual Volatility measures how unpredictable/inconsistent/widespread the returns are only when they are negative
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Sortino Ratio",
        "description": "(Higher = better) Measures the return per unit of downside risk",
        "answer": <div>
            <p>
                Another way to measure the quality of an investment’s returns. It differs from the Sharpe ratio in that it uses downside volatility as a measure of risk instead of the Annual Volatility
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Calmar Ratio",
        "description": "(Higher = better) Another measure of risk-adjusted performance",
        "answer": <div>
            <p>
                Another way to measure the quality of an investment’s returns. It is the ratio of the average return and the maximum drawdown (largest loss) experienced by the portfolio
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Tail Ratio",
        "description": "(Higher = better) Ratio of the investment’s best returns to its worst returns",
        "answer": <div>
            <p>
                The positive ratio of the investment’s best returns to its worst returns.
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Kurtosis",
        "description": "(Lower = better) Likelihood of extreme returns",
        "answer": <div>
            <p>
                Represents the likelihood of extreme returns – good or bad – to happen
            </p>
        </div>
    },

    {
        "question": "Analysis and Comparison: Correlation Analysis",
        "description": "(The closer to 0 the better) Understand the relationship between the different investments",
        "answer": <div>
            <p>
                A way to measure how similar (correlated) your portfolio’s holdings are. A correlation of 1 means that they’re perfectly correlated and move in the same direction. A correlation of -1 also indicates perfect correlation but in the opposite direction. I prefer my ETFs to have a correlation between 0.60 and -0.60 at most
            </p>
        </div>
    },
    {
        "question": "Analysis and Comparison: Principal Component Analysis",
        "description": "(The more balanced the better) Sources of risk to a portfolio",
        "answer":
            <div>
                <p>
                    Each principal component (PC) can be thought of as a risk the portfolio is exposed to.
                <br /><br />
                Interpretation: if the corresponding value for PC1 is 40%, you can say that 40% of the variation of returns in your portfolio is due to risk #1.
                <br /><br />
                In my personal portfolio, 68% of the variation of returns stem from the biggest 3 risks – not too bad but can be better
            </p>
            </div>
    },
]

export default questionList