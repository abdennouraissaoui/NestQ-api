import React, { useState, useEffect } from "react"
import PortfolioForm from "../components/PortfolioForm"
import SearchBox from "../../shared/SearchBox/SearchBox"
import PortfoliosList from "../components/PortfolioList"
import { Spin, Alert, Modal, Button } from "antd"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { Row } from "antd"
import { PlusOutlined } from '@ant-design/icons';

const Portfolios = () => {
    const [isPortfolioFormOpen, setIsPortfolioFormOpen] = useState(false)
    const [searchField, setSearchField] = useState("")
    const [loadedPortfolios, setLoadedPortfolios] = useState([]);
    const openPortfolioForm = () => setIsPortfolioFormOpen(true)
    const closePortfolioForm = () => setIsPortfolioFormOpen(false)

    const { isLoading, error, sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                let responseData = await sendRequest("/api/user/portfolios")
                setLoadedPortfolios(responseData.portfolios)
            } catch (error) { }
        }
        fetchPortfolios();
    }, [sendRequest])


    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }


    let filteredPortfolios = loadedPortfolios.filter(portfolio => {
        return portfolio.name.toLowerCase().includes(searchField.toLowerCase())
    }).sort((a, b) => new Date(b.date_created) - new Date(a.date_created))

    const portfolioDeletedHandler = deletedPortfolioName => {
        setLoadedPortfolios(loadedPortfolios.filter(portfolio => {
            return portfolio.name !== deletedPortfolioName
        }))
    }

    const portfolioCreatedHandler = (newPortfolio) => {
        closePortfolioForm()
        setLoadedPortfolios(loadedPortfolios.concat(newPortfolio))
    }

    const portfolioEditedHandler = (updatedPortfolio, initialName) => {
        setLoadedPortfolios(loadedPortfolios.filter(portfolio => {
            return portfolio.name !== initialName
        }).concat(updatedPortfolio))
    }

    return (
        <React.Fragment>
            <Modal
                title="Create a portfolio"
                visible={isPortfolioFormOpen}
                onCancel={closePortfolioForm}
                footer={false}
            >
                {/* <div style={{ margin:"auto", width:"50%", border:"solid gray 1px"}}> */}
                    <PortfolioForm onCreated={portfolioCreatedHandler} closeForm={closePortfolioForm} />
                {/* </div> */}
            </Modal>
            {isLoading && <Spin size="large" />}
            {!isLoading && error &&
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: "5px" }}
                    className="tl"
                />
            }
            {!isLoading && !error && <div style={{ margin: "auto", width: "80%" }}>
                <Row justify="space-between">
                        <Button icon={<PlusOutlined />} size="large" style={{margin:"10px"}} onClick={openPortfolioForm}>Create a new portfolio</Button>
                        <SearchBox placeholder="Filter by portfolio name" searchChange={onSearchChange} />
                </Row>

                <PortfoliosList
                    portfolios={filteredPortfolios}
                    portfolioNames={loadedPortfolios.map(port => {
                        return port.name
                    })}
                    openPortForm={openPortfolioForm}
                    closeForm={closePortfolioForm}
                    onEdited={portfolioEditedHandler}
                    onDeletePortfolio={portfolioDeletedHandler}
                />
            </div>}

        </React.Fragment>

    )
}

export default Portfolios
