import React from "react"
import { FilterOutlined } from '@ant-design/icons';
import { Input } from "antd"
const SearchBox = ({ searchChange, placeholder, className }) => {
    return (
        <Input type="search"
            className={className}
            onChange={searchChange}
            prefix={<FilterOutlined />}
            placeholder={placeholder}
            size="large"
            style={{ width: "287px", margin: "10px" }}
        />
    )
}
export default SearchBox