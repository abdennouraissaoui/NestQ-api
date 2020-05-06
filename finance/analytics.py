import pandas as pd
import statsmodels.api as sm
import numpy as np

from finance.data_manager import (load_returns,
                                  match_df,
                                  load_ff,
                                  stringify_date_index,
                                  to_antd_tbl,
                                  to_line_chart,
                                  apexcharts_corr_matrix)
# from flask_caching import Cache
from datetime import datetime

# cache = Cache()


def form_portfolio(underlyings_returns, weights, rebalancing_frequency):
    # TODO: incorporate rebalancing frequency
    return (underlyings_returns * weights).sum(axis=1)


def pct_positive_periods(returns):
    return returns[returns > 0].count() / len(returns)


def sharpe_ratio(ann_ret, ann_rf, ann_vol):
    return (ann_ret - ann_rf) / ann_vol


def downside_std_dev(rets, periods_per_year):
    return rets[rets < 0].std() * periods_per_year ** .5


def sortino_ratio(ann_ret, ann_rf, downside_std):
    return (ann_ret - ann_rf) / downside_std


def calmar_ratio(ann_ret, ann_rf, max_dd):
    return (ann_ret - ann_rf) / max_dd


def value_at_risk(rets, q=0.05):
    return rets.quantile(q)


def conditional_value_at_risk(rets, q=0.05):
    cvar_rets = rets[rets <= rets.quantile(q)]
    return (cvar_rets + 1).prod() ** (1 / cvar_rets.count()) - 1


def tail_ratio(rets, q=0.05):
    return rets.quantile(1-q) / abs(rets.quantile(q))


def get_drawdowns(returns):
    """
    Reports the drawdawns from the all time high
    """
    cumil_rets = (returns + 1).cumprod()
    cumil_max = cumil_rets.cummax()
    percent_diff = cumil_rets / cumil_max - 1
    return percent_diff


def get_annualized_return(returns, periods_per_year):
    num_years = len(returns) / periods_per_year
    return ((1 + returns).prod()) ** (1 / num_years) - 1


def get_annualized_vol(returns, periods_per_year):
    return returns.std() * periods_per_year ** .5


def get_reg_summary(X, y):
    """
    Regress each column in y_vars_tbl with x_vars_tbl
    this function returns one table for the coefficients and rsquare,
    as well as a table that contains the t-stats
    """
    X = X.copy()
    X.insert(0, 'Alpha', 1)
    reg_output = pd.DataFrame(columns=X.columns)
    t_stats = pd.DataFrame(columns=X.columns)
    r_sq = []
    for sec in y:
        reg = sm.OLS(y[sec], X).fit()
        reg_output.loc[sec] = reg.params
        t_stats.loc[sec] = reg.tvalues
        r_sq.append(reg.rsquared)
    reg_output['R-squared'] = r_sq
    return reg_output


def get_inv_growth(returns, init_inv=1000):
    from pandas.tseries.offsets import BDay
    gross_returns = returns + 1
    gross_returns.loc[gross_returns.index[0] - BDay()] = init_inv
    gross_returns.sort_index(inplace=True)
    return round(gross_returns.cumprod(), 2)


def get_risk_metrics(returns, rf, periods_per_year):
    ann_ret = get_annualized_return(returns, periods_per_year)
    ann_vol = get_annualized_vol(returns, periods_per_year)
    downside_vol = downside_std_dev(returns, periods_per_year)
    data = {
        "Average Annual Return (%)": ann_ret * 100,
        "Annual Volatility (%)": ann_vol * 100,
        "Sharpe Ratio": sharpe_ratio(ann_ret, rf, ann_vol),
        "Positive Months Ratio (%)": pct_positive_periods(returns) * 100,
        "Monthly 95% VAR (%)": value_at_risk(returns, 0.05) * 100,
        "Monthly 95% CVAR (%)": conditional_value_at_risk(returns, 0.05) * 100,
        "Downside Annual Volatility (%)": downside_vol * 100,
        "Sortino Ratio": sortino_ratio(ann_ret, rf, downside_vol),
        "Calmar Ratio": calmar_ratio(ann_ret, rf, get_drawdowns(returns).min().abs()),
        "Tail Ratio": tail_ratio(returns),
        "Skewness": returns.skew(),
        "Excess Kurtosis": returns.kurtosis()
    }
    return pd.DataFrame(data).round(2).replace([np.inf, -np.inf, np.nan], "-").T


def get_calendar_returns(returns):
    calendar_returns = (returns + 1).resample("Y").prod() - 1
    calendar_returns.index = calendar_returns.index.year.to_list()[:-1] + ['YTD']
    return round(calendar_returns * 100, 2)


def get_ff_exposure(returns):
    ff = load_ff()
    returns = returns[:ff.index[-1]]
    ff = match_df(ff, returns)
    ex_ret = returns.subtract(ff['RF'], axis=0)
    ff.drop('RF', axis=1, inplace=True)
    reg_summary = get_reg_summary(ff, ex_ret)
    reg_summary["Alpha"] *= 100
    reg_summary.rename({"Alpha": "Alpha (%)"}, axis=1, inplace=True)
    return round(reg_summary, 2)


def get_pca(returns):
    from sklearn.decomposition import PCA
    pca = PCA()
    standardized_rets = (returns - returns.mean(axis=0)) / returns.std(axis=0)
    pca.fit(standardized_rets)
    return {"PC{}".format(i + 1): pct_explained * 100
            for i, pct_explained in enumerate(list(pca.explained_variance_ratio_))}


def get_returns(prices, meta_data):
    returns = prices.pct_change().dropna()
    return (returns * meta_data).sum(axis=1)


def create_tearsheet(rets, weights=None):
    risk_metrics = to_antd_tbl(get_risk_metrics(rets, 0.02, 12))
    ff_exp = to_antd_tbl(get_ff_exposure(rets))
    inv_growth = to_line_chart(stringify_date_index(get_inv_growth(rets)), weights)
    drawdowns = to_line_chart(stringify_date_index(get_drawdowns(rets)*100), weights)
    calendar_rets = to_antd_tbl(get_calendar_returns(rets))
    correlation = apexcharts_corr_matrix(round(rets.corr(), 2))
    return {'risk_metrics': risk_metrics,
            'ff_exp': ff_exp,
            'inv_growth': inv_growth,
            'drawdowns': drawdowns,
            'calendar_rets': calendar_rets,
            "correlation": correlation,
            "analysis_range": {"start": rets.index[0].replace(day=1).strftime("%Y-%m-%d"),
                               "end": rets.index[-1].strftime("%Y-%m-%d")}}


def port_monte_carlo(mean, std, init_price=1000, num_periods=24, num_sim=150):
    simulation_df = pd.DataFrame()
    for x in range(num_sim):
        period_count = 0
        price_series = [init_price]
        for y in range(num_periods):
            if period_count == num_periods:
                break
            price = price_series[period_count] * (1 + np.random.normal(mean, std))
            price_series.append(price)
            period_count += 1
        simulation_df[x] = price_series

    percentiles = [.05, .1, .25, .5, .75, .9, .95]
    simulation_df = simulation_df.T.describe(percentiles=percentiles)
    simulation_df = simulation_df.loc[[str(int(percentile * 100)) + "%" for percentile in percentiles]]
    simulation_df.index = [str(int(percentile * 100)) + "th Percentile" for percentile in percentiles]
    simulation_df.columns = [datetime.today() + pd.DateOffset(months=i) for i in simulation_df.columns]
    return simulation_df.T


# @cache.memoize(timeout=300)
def create_portfolio_tearsheet(portfolio, start=None, end=None):
    securities_names = list(portfolio.settings["holdings"].keys())
    rets = load_returns(securities_names, start, end)

    rets[portfolio.name] = form_portfolio(rets, portfolio.settings['holdings'],
                                          portfolio.settings["rebalancingFrequency"])

    weights = dict(portfolio.settings["holdings"], **{portfolio.name: 1})
    tearsheet = create_tearsheet(rets, weights)
    tearsheet['PCA'] = get_pca(rets.drop(portfolio.name, axis=1))
    mean = rets[portfolio.name].mean()
    std = rets[portfolio.name].std()
    tearsheet["port_simulation"] = to_line_chart(stringify_date_index(port_monte_carlo(mean, std)))
    return tearsheet


def create_comparison_tearsheet(portfolios, start=None, end=None):
    securities_names = []
    for portfolio in portfolios:
        securities_names += list(portfolio.settings["holdings"].keys())

    rets = load_returns(list(set(securities_names)), start, end)
    ports_rets = pd.DataFrame()
    for portfolio in portfolios:
        port_rets = form_portfolio(rets[portfolio.settings['holdings'].keys()],
                                   portfolio.settings['holdings'],
                                   portfolio.settings["rebalancingFrequency"])
        ports_rets[portfolio.name] = port_rets

    return create_tearsheet(ports_rets)
