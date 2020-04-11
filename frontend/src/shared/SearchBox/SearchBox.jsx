import React from "react"
import { FilterOutlined } from '@ant-design/icons';
import { Input } from "antd"
const SearchBox = ({ searchChange, placeholder }) => {
    return (
        <div className="pa2 w5">
            <Input type="search"
                onChange={searchChange}
                prefix={<FilterOutlined />}
                placeholder={placeholder} 
                size="large"
                style={{width:"287px", margin:"10px"}}
                />
        </div>
    )
}
export default SearchBox