from finance.data_manager import load_prices


def markowitz(tickers, start=None, end=None):
    from pypfopt.efficient_frontier import EfficientFrontier
    from pypfopt import risk_models
    from pypfopt import expected_returns
    prices = load_prices(tickers, start, end)
    mu = expected_returns.mean_historical_return(prices)
    S = risk_models.sample_cov(prices)
    ef = EfficientFrontier(mu, S, gamma=1)
    # TODO: replace the rf with actual values
    return ef.max_sharpe(risk_free_rate=0.015)


def hierarchical_risk_parity(tickers, start=None, end=None):
    from pypfopt.hierarchical_risk_parity import HRPOpt
    hrp = HRPOpt(load_prices(tickers, start, end))
    return hrp.hrp_portfolio()


available_optimizers = {
    "Markowitz": markowitz,
    "Hierarchical Risk Parity": hierarchical_risk_parity
}