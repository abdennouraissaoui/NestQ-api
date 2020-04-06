import pandas as pd
import statsmodels.api as sm
from finance.data_manager import load_prices, match_df, load_ff, stringify_date_index


def form_portfolio(underlyings_returns, weights, rebalancing_frequency):
    # TODO: incorporate rebalancing frequency
    return (underlyings_returns * weights).sum(axis=1)


def get_pct_positive(returns):
    """
    Returns the percentage of the positive numbers
    """
    return returns[returns > 0].count() / len(returns)


def get_drawdowns(returns):
    """
    Reports the drawdawns from the all time high
    """
    cumil_rets = (returns + 1).cumprod()
    cumil_max = cumil_rets.cummax()
    percent_diff = cumil_rets / cumil_max
    return percent_diff * 100


def get_annualized_return(returns, periods_per_year):
    num_years = len(returns) / periods_per_year
    return ((1 + returns).prod()) ** (1 / num_years) - 1


def get_annualized_vol(returns, periods_per_year):
    return returns.std() * periods_per_year ** .5


def get_sharpe_ratio(returns, rf, periods_per_year):
    annualized_ret = get_annualized_return(returns, periods_per_year)
    annualized_vol = get_annualized_vol(returns, periods_per_year)
    return (annualized_ret - rf) / annualized_vol


def get_adj_sharpe_ratio(returns, rf, periods_per_year):
    sharpe_ratio = get_sharpe_ratio(returns, rf, periods_per_year)
    skew = returns.skew()
    kurtosis = returns.kurtosis()
    return sharpe_ratio * (1 + (skew / 6) * sharpe_ratio - ((kurtosis) / 24) * (sharpe_ratio ** 2))


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


def tbl_col_rows(df):
    """Given a data frame column, this function provides a
    dictionary with two keys: rows and columns.
    Rows will be a list of lists. Each list represents a row
    Columns will be a list of strings
    """
    columns = [""] + list(df.columns)
    rows = df.values.tolist()
    rows = [[df.index[i]] + rows[i] for i in range(len(rows))]
    return {"columns": columns, "rows": rows}


def get_risk_metrics(returns, rf, periods_per_year):
    annualized_return = get_annualized_return(returns, periods_per_year)
    annualized_vol = get_annualized_vol(returns, periods_per_year)
    sharpe_ratio = get_sharpe_ratio(returns, rf, periods_per_year)
    skew = returns.skew()
    kurtosis = returns.kurtosis()
    adj_sharpe = get_adj_sharpe_ratio(returns, rf, periods_per_year)
    hit_rate = get_pct_positive(returns)
    labels = ['Average Annual Return',
              'Volatility',
              'Sharpe Ratio',
              'Skewness',
              'Kurtosis',
              'Adjusted Sharpe Ratio',
              '% of positive periods']
    data = [annualized_return * 100, annualized_vol * 100, sharpe_ratio, skew, kurtosis, adj_sharpe, hit_rate * 100]
    return round(pd.DataFrame(data, labels), 2)


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