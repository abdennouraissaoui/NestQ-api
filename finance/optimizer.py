from finance.data_manager import load_prices
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
from pypfopt.hierarchical_risk_parity import HRPOpt


def markowitz(tickers, start=None, end=None):
    prices = load_prices(tickers, start, end)
    mu = expected_returns.mean_historical_return(prices, frequency=12)
    S = risk_models.sample_cov(prices, frequency=12)
    ef = EfficientFrontier(mu, S)
    return ef


def efficient_return(tickers, target_return, start=None, end=None):
    ef = markowitz(tickers, start, end)
    ef.gamma = 1
    return ef.efficient_return(target_return)


def efficient_vol(tickers, target_risk, start=None, end=None):
    ef = markowitz(tickers, start, end)
    ef.gamma = 1
    return ef.efficient_risk(target_risk)


def min_vol(tickers, start=None, end=None):
    ef = markowitz(tickers, start, end)
    return ef.min_volatility()


def max_sharpe(tickers, start=None, end=None):
    ef = markowitz(tickers, start, end)
    ef.gamma = 1
    # TODO: replace the rf with actual values
    return ef.max_sharpe(risk_free_rate=0.015)


def hierarchical_risk_parity(tickers, start=None, end=None):
    hrp = HRPOpt(load_prices(tickers, start, end))
    return hrp.hrp_portfolio()


def equally_weighted(tickers):
    return {ticker: 1 / len(tickers) for ticker in tickers}


def manual_allocation(holdings):
    """
    Divides weights by 100
    """
    return {ticker: float(weight) / 100
            for (ticker, weight) in holdings.items()}


available_optimizers = {
    "Manual": manual_allocation,
    "Equal Allocation": equally_weighted,
    "Maximum Sharpe Ratio": max_sharpe,
    "Efficient Return": efficient_return,
    "Efficient Volatility": efficient_vol,
    "Minimum Volatility": min_vol,
    "Hierarchical Risk Parity": hierarchical_risk_parity
}