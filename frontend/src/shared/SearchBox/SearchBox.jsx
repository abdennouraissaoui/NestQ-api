import React from "react"
import { FilterOutlined } from '@ant-design/icons';
import { Input } from "antd"
const SearchBox = ({ searchChange, placeholder }) => {
    return (
        <Input type="search"
            onChange={searchChange}
            prefix={<FilterOutlined />}
            placeholder={placeholder}
            size="large"
            style={{ width: "287px", margin: "10px" }}
        />
    )
}
export default SearchBox