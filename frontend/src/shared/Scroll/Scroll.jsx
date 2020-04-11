import React from "react"

const Scroll = ({ children, scrollHeight, className }) => {
    return (
        <div className={className} style={{overflowY:'scroll', border:"1px solid gray", height:scrollHeight}}>
            {children}
        </div>
    )
}

export default Scroll;