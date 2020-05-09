import React, { useState } from "react"
import { Typography } from "antd"
import Question from "../components/Question"
import questionsList from "./questionList.js"
import SearchBox from "../../shared/SearchBox/SearchBox"


const Learn = () => {
    const [searchField, setSearchField] = useState("")
    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    let filteredQuestions = questionsList.filter(question => {
        return question.question.toLowerCase().includes(searchField.toLowerCase())
    })

    return (
        <React.Fragment>
            <Typography.Title className="tc" style={{color:"#54575a"}}>
                Your questions answered simply
            </Typography.Title>
            <div className="center">
                <SearchBox placeholder="Search for a question" searchChange={onSearchChange} />

            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                {
                    filteredQuestions.map((question, index) => {
                        return <Question
                            key={index}
                            question={question.question}
                            answer={question.answer}
                            description={question.description}
                        />
                    })
                }
            </div>
        </React.Fragment>

    )
}

export default Learn;
