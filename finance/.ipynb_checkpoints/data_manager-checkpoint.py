import pandas as pd
import yfinance as yf


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


def load_prices(tickers, start=None, end=None):
    # TODO: handle exception where optimization period unavailable
    prices = yf.download(tickers,
                         start= start,
                         end=end,
                         interval="1mo",
                         progress=False)['Adj Close'].dropna()
    prices.index = prices.index + pd.tseries.offsets.MonthEnd(1)
    return prices


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