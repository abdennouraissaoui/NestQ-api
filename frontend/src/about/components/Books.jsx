import React from "react"
import { Card, Tooltip } from "antd"
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import "./Books.css"
const { Meta } = Card;
const booksRead = require("./booksRead.json")

 
const Books = () => {
    const booksData = booksRead.map((book, index) => {
        return (
            <a href={book.link} className="menu-item" key={index} >
                <Tooltip title={book.name} >
                    <Card
                        
                        hoverable
                        style={{ width: 200, margin:"15px" }}
                        cover={<img alt={book.name} src={book.image} />}
                    >
                        <Meta title={book.name} description="www.goodreads.com" />
                    </Card>
                </Tooltip>
            </a>
        )
    })

    return (
        <div style={{width:"100%"}}>
            <ScrollMenu
                      arrowLeft={<LeftOutlined style={{fontSize:"20px"}}/>}
                      arrowRight={<RightOutlined style={{fontSize:"20px"}} />}
                data={booksData}
                wheel={false}
            >

            </ScrollMenu>
        </div>


    )
}

export default Books;