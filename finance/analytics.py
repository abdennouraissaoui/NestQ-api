import pandas as pd
import statsmodels.api as sm
from finance.data_manager import load_prices, match_df, load_ff, stringify_date_index, tbl_col_rows
from flask_caching import Cache

cache = Cache()


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
    reg_output['R2'] = r_sq
    return round(reg_output, 2)


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
        "Downside Volatility (%)": downside_vol,
        "Sortino Ratio": sortino_ratio(ann_ret, rf, downside_vol),
        "Calmar Ratio": calmar_ratio(ann_ret, rf, get_drawdowns(returns).min().abs()),
        "Monthly 95% VAR (%)": value_at_risk(returns, 0.05) * 100,
        "Monthly 95% CVAR (%)": conditional_value_at_risk(returns, 0.05) * 100,
        "Tail Ratio": tail_ratio(returns),
        "Skewness": returns.skew(),
        "Excess Kurtosis": returns.kurtosis()
    }
    return pd.DataFrame(data).T.round(2)


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
    return reg_summary


def get_returns(prices, meta_data):
    returns = prices.pct_change().dropna()
    return (returns * meta_data).sum(axis=1)


@cache.memoize(timeout=300)
def create_full_tear_sheet(portfolio, start=None, end=None):
    tickers = list(portfolio.settings["holdings"].keys())
    prices = load_prices(tickers, start, end)
    rets = (prices.pct_change().dropna() + 1).resample("M").prod() - 1
    rets[portfolio.name] = form_portfolio(rets, portfolio.settings['holdings'],
                                          portfolio.settings["rebalancingFrequency"])
    risk_metrics = tbl_col_rows(get_risk_metrics(rets, 0.02, 12))
    ff_exp = tbl_col_rows(get_ff_exposure(rets))
    inv_growth = stringify_date_index(get_inv_growth(rets))
    drawdowns = stringify_date_index(get_drawdowns(rets))
    calendar_rets = tbl_col_rows(get_calendar_returns(rets))
    correlation = tbl_col_rows(round(rets.corr(), 2))
    return {'risk_metrics': risk_metrics,
            'ff_exp': ff_exp,
            'inv_growth': inv_growth.to_dict(),
            'drawdowns': drawdowns.to_dict(),
            'calendar_rets': calendar_rets,
            "correlation": correlation}
