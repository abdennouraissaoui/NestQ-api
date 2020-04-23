import React from 'react';
import { FieldArray, Formik } from "formik"
import {
    ResetButton,
    SubmitButton,
    Form,
    RemoveRowButton,
    AutoComplete,
} from "formik-antd"
import { Button, Typography } from "antd"
import { PlayCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import { array, object, string } from 'yup';

const PortfolioComparisonForm = ({ userPortfolioNames, initialPortfolio, onGo }) => {
    const userPortfolioOptions = userPortfolioNames.map(portfolioName => {
        return { "value": portfolioName }
    })
    const initialValues = () => {
        return {
            compPortfolios: [{ portfolioName: initialPortfolio }],
        }
    }
    const validationSchema = object().shape({
        compPortfolios: array()
            .of(
                object().shape({
                    portfolioName: string()
                        .required('Required')
                        .oneOf(userPortfolioNames, "Cannot find this portfolio"),
                })
            )
            .required("Must have at least one security")
            .min(1, "Must have at least one security")
    });

    const handleSubmit = (values, actions) => {
        const portfolioNames = values.compPortfolios.map(portfolio => {
            return portfolio.portfolioName
        })
        try {
            onGo({ compPortfolios: portfolioNames })
        } catch (e) { }
        actions.setSubmitting(false)
    }

    return (
        <Formik
            onSubmit={(values, actions) => handleSubmit(values, actions)}
            initialValues={initialValues()}
            validationSchema={validationSchema}
            validateOnChange={false}
        >
            {({ values }) => (
                <Form>
                    <Typography.Title level={4} className="tc">Add portfolios</Typography.Title>
                    <FieldArray
                        name="compPortfolios"
                        subscription={{}}
                        render={arrayHelpers => (
                            <div>
                                {values.compPortfolios.map((entry, index) => (
                                    <div key={index} className="flex">
                                        <Form.Item
                                            name={`compPortfolios.${index}.portfolioName`}
                                            hasFeedback={true}
                                            className="w-90"
                                        >
                                            <AutoComplete
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                defaultActiveFirstOption
                                                options={userPortfolioOptions}
                                                name={`compPortfolios.${index}.portfolioName`}
                                                placeholder="Search for a portfolio..."
                                            />

                                        </Form.Item>

                                        {< RemoveRowButton
                                            style={{ border: "none" }}
                                            icon={<DeleteOutlined />}
                                            name="compPortfolios"
                                            index={index}
                                            onClick={() => arrayHelpers.remove(index)}
                                        />}
                                    </div>
                                ))}
                                <Button type="button" onClick={() => arrayHelpers.push({ portfolioName: "" })} size="small"> Add </Button>
                            </div>
                        )}
                    />
                    <footer>
                        <SubmitButton icon={<PlayCircleOutlined />} className="ma2" size="large" type="primary"> Go </SubmitButton>
                        <ResetButton className="ma2" size="large" > Reset </ResetButton>
                    </footer>


                </Form>
            )}

        </Formik>
    )
}

export default PortfolioComparisonForm;