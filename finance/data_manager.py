import pandas as pd
import yfinance as yf
from misc.name_w_ticker_map import NAME_TICKER_MAP
from datetime import datetime

def load_ff(frequency="M"):
    import urllib.request
    import zipfile
    from os import path
    from datetime import datetime
    cur_date = datetime.now().strftime("%Y-%m")
    if not path.exists('FF_{}.zip'.format(cur_date)):
        link = "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_5_Factors_2x3_daily_CSV.zip"
        urllib.request.urlretrieve(link, "FF_{}.zip".format(cur_date))
    compressed_file = zipfile.ZipFile("FF_{}.zip".format(cur_date))
    csv_file = compressed_file.open('F-F_Research_Data_5_Factors_2x3_daily.CSV')
    FF = pd.read_csv(csv_file, skiprows=2, index_col=0)
    FF.index = pd.to_datetime(FF.index, format='%Y%m%d')
    FF /= 100
    if frequency:
        FF = (FF + 1).resample(frequency).prod() - 1
    return FF


def load_prices(securities_names, start=None, end=None):
    tickers = [NAME_TICKER_MAP[security_name] for security_name in securities_names]
    prices = yf.download(tickers,
                         interval="1mo",
                         progress=False)['Adj Close'].dropna()
    if not isinstance(prices, pd.DataFrame):
        returns = pd.DataFrame(prices)
        returns.columns = securities_names
    else:
        prices.rename({ticker: name for ticker, name in zip(tickers, securities_names)}, axis=1, inplace=True)
    return prices.loc[start:end]


def load_returns(securities_names, start=None, end=None):

    tickers = [NAME_TICKER_MAP[security_name] for security_name in securities_names]
    prices = yf.download(tickers,
                         interval="1mo",
                         progress=False)['Adj Close'].dropna()

    returns = (prices.pct_change().dropna() + 1).resample("M").prod() - 1
    if not end:
        end = datetime.today() + pd.tseries.offsets.MonthEnd(-1)
    returns = returns.loc[start:end]
    if not isinstance(returns, pd.DataFrame):
        returns = pd.DataFrame(returns)
        returns.columns = securities_names
    else:
        returns.rename({ticker: name for ticker, name in zip(tickers, securities_names)}, axis=1, inplace=True)
    return returns


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


def to_antd_tbl(df):
    column_list = [column for column in ["Index"] + list(df.columns)]
    columns = [{"title":column, "dataIndex":column, "key":"column"}
               for column in column_list]
    columns[0]['title'] = ""
    rows_list = df.values.tolist()
    rows_list = [[df.index[i]] + rows_list[i] for i in range(len(rows_list))]

    data_source = []
    for j, row in enumerate(rows_list):
        row_info = {"key": j}
        for i, column in enumerate(column_list):
            row_info[column] = row[i]
        data_source.append(row_info)

    return {"columns": columns, "rows":data_source}


def _get_list_difference(left_list, right_list):
    """
    returns a list of elements that are in the left list but not the right one
    """
    not_in_right_list = []
    for element in left_list:
        if element not in right_list:
            not_in_right_list.append(element)

    return not_in_right_list

def _add_to_index(df, indices_to_add, values):
    """
    creates new rows in df with names indices_to_add and values values
    """
    for index in indices_to_add:
        df.loc[index] = values
    df.sort_index(inplace=True)

def _merge_with_next_row(df, row_index_names):
    for row_index_name in row_index_names:
        row_index = df.index.get_loc(row_index_name)

        df.iloc[row_index + 1] = df.iloc[row_index] + df.iloc[row_index + 1]
        df.drop(row_index_name, inplace=True)

def match_df(df1, df2):
    """
    match DF1 to DF2 based on index
    if row X exists in df2 but not df1, add X row to df1 with value 0
    if row X exists in df1 but not df2, add the values of row X to the next row and remove row X
    """
    matched_df = df1[df2.index[0]:df2.index[-1]].copy()
    rows_to_add = _get_list_difference(df2.index, matched_df.index)
    rows_to_remove = _get_list_difference(matched_df.index, df2.index)
    _add_to_index(matched_df, rows_to_add, 0)
    _merge_with_next_row(matched_df, rows_to_remove)
    return matched_df


def stringify_date_index(df):
    df.index = df.index.strftime('%Y-%m-%d')
    return df


def to_table_orient(data):
    data = data.to_dict(orient="index")
    for key, value in data.items():
        value["Index"] = key
    return list(data.values())


def apexcharts_corr_matrix(corr_matrix):
    apexchart_corr_matrix = []
    for name, row in corr_matrix.items():
        row_data = []
        row_name = name
        for name, correlation in row[::-1].items():
            row_data.append({"x": name, "y": correlation})
        apexchart_corr_matrix.append({"name": row_name, "data": row_data})

    return apexchart_corr_matrix

def random_colors(n:int) -> list:
    """
    Generates n random HEX colors
    """
    import random
    r = lambda: random.randint(0,255)
    colors = []
    i = 0
    while i < n:
        colors.append('#%02X%02X%02X' % (r(),r(),r()))
        i +=1
    return colors


def get_colors(n):
    colors = [
     '#06ACB0',  # teal
     '#FF672E',  # orange
     '#676766',  # gray dark
     '#006C52',  # dark green
     '#D8262C',  # dark red
     '#A22676',  # purple
     '#000000',  # Black
     '#592924',  # brown
     '#FFAB80',  # orange light
     '#A5A8AA',  # gray light
     '#FFCE50',  # light yellow
     '#A5D5D7',  # light teal
     '#FFE8B5',  # light yellow
     '#A6DF93',  # light green
     '#FF9B99',  # light pink
     '#CFB2D3',  # light purple
     '#C5EBC8',  # light green
     '#FEFFBB',  # bright yellow
    ]
    if n > len(colors):
        colors += random_colors(n-len(colors))
    return colors[:n]


def to_line_chart(df, line_weights=None, lw_min=1, lw_max= 4):
    settings = {line: {"color":color} for line, color in zip(df.columns, get_colors(len(df.columns)))}
    for line in settings.keys():
        settings[line]["width"] = lw_min + (lw_max - lw_min) * line_weights[line] if line_weights else 2
    return {"linesSettings" : settings,
           "dataPoints": to_table_orient(df)}