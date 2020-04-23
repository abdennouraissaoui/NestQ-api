import React, { useState, useContext, useEffect } from 'react';
import DataFormatter from "../../shared/utils/DataFormatter"
import { FieldArray, Formik } from "formik"
import { DeleteOutlined } from "@ant-design/icons"
import {
  Input,
  DatePicker,
  ResetButton,
  SubmitButton,
  Select,
  Form,
  RemoveRowButton,
  InputNumber,
  AutoComplete
} from "formik-antd"
import { Button, Alert, Typography } from "antd"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/Context/AuthContext"
import { string, object, array, mixed, number } from 'yup';
const etfOptions = require("./etf_options.json")
const etfList = etfOptions.map(etf => {
  return etf.value
})
const { MonthPicker } = DatePicker
const { toDictOfHoldings } = DataFormatter

const validationSchema = object().shape({
  name: string().required('Portfolio name is required'),
  allocation: mixed().required("Please choose an allocation method"),
  holdings: mixed().when("allocation", {
    is: "Manual", then: array().of(
      object().shape({
        securityName: string()
          .required('Required')
          .oneOf(etfList, "Cannot find this security"),
        weight: mixed().required("Please enter a weight")
      })
    ).min(2, "Please insert at least two securities"),
    otherwise: array().of(
      object().shape({
        securityName: string()
          .required('Required')
          .oneOf(etfList, "Cannot find this security"),
      })
    )
  }),
  rebalancingFrequency: mixed().required("Please choose a portfolio rebalancing frequency"),
  targetVolatility: mixed().when("allocation", { is: "Efficient Volatility", then: number("Must be a number").required("Please enter the desired level of volatility") }),
  targetReturn: mixed().when("allocation", { is: "Efficient Return", then: number("Must be a number").required("Please enter the desired level of return") })
});


const dateNYearsAgo = (N) => {
  var date = new Date();
  date.setFullYear(date.getFullYear() - N);
  return date
}

const initialValues = (props) => {
  return {
    name: props.name || "",
    allocation: props.allocation || "",
    holdings: props.holdings || [{ securityName: "", weight: "" }],
    closeForm: props.closeForm,
    optimizationStartDate: props.optimizationStartDate || dateNYearsAgo(3),
    optimizationEndDate: props.optimizationEndDate || new Date(),
    rebalancingFrequency: props.rebalancingFrequency || "",
    targetVolatility: props.targetVolatility || "",
    targetReturn: props.targetReturn || ""
  }
}



const PortfolioForm = (props) => {
  const initialName = props.name
  const [initialFormData, setInitialFormData] = useState({
    optimizers: [],
    rebal_freqs: []
  })


  const { error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext)


  useEffect(() => {
    const fetchFormInitialData = async () => {
      try {
        let responseData = await sendRequest("/api/portfolio-construction-options")
        const optimizers = responseData.optimizers
        const rebal_freqs = responseData.rebal_freqs
        setInitialFormData({ optimizers, rebal_freqs })
      } catch (e) {
        window.alert(e)
      }
    }
    fetchFormInitialData();
  }, [sendRequest])

  const handleSubmit = async (values, initialName) => {
    const portfolioMeta = JSON.parse(JSON.stringify(values))
    portfolioMeta.holdings = toDictOfHoldings(values.holdings)
    try {
      const responseData = await sendRequest(
        `/api/portfolio/${initialName ? encodeURI(initialName) : encodeURI(portfolioMeta.name)}`,
        initialName ? "PUT" : 'POST',
        JSON.stringify(portfolioMeta),
        {
          'Content-Type': 'application/json',
          'Authorization': auth.accessToken
        }
      )
      if (initialName) {
        props.closeForm()
        props.onEdited(responseData, initialName)
      } else {
        props.onCreated(responseData)
      }
    } catch (e) { }
  }

  return (
    <Formik
      onSubmit={(values) => handleSubmit(values, initialName)}
      initialValues={initialValues(props)}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {({ values, resetForm }) => (

        <Form>
          {error && <Alert
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "5px" }}
            className="tl"
          />}
          <Form.Item name="name" hasFeedback={true}>
            <Input name="name" placeholder="Portfolio name" />
          </Form.Item>
          <Select name="allocation" placeholder="Allocation" showArrow className="w-90">
            {initialFormData.optimizers.map((optimizer, index) => {
              return (<Select.Option key={index} value={optimizer}> {optimizer} </Select.Option>)
            })}
          </Select>

          {values.allocation === "Efficient Return" &&
            <InputNumber
              min={0}
              formatter={value => value > 0 ? `${value}%` : ''}
              parser={value => value.replace('%', '')}
              name="targetReturn"
              placeholder="Target Return" />
          }

          {values.allocation === "Efficient Volatility" &&
            <InputNumber
              min={0}
              formatter={value => value > 0 ? `${value}%` : ''}
              parser={value => value.replace('%', '')}
              name="targetVolatility"
              placeholder="Target Volatility" />
          }

          <Select name="rebalancingFrequency" placeholder="Rebalancing Frequency" showArrow className="w-90">

            {initialFormData.rebal_freqs.map((frequency, index) => {
              return (<Select.Option key={index} value={frequency}> {frequency} </Select.Option>)
            })}
          </Select>

          {values.allocation !== "Manual" && values.allocation !== "Equal Allocation" &&
            <div>
              <p>Optimization Period:</p>
              <MonthPicker
                name="optimizationStartDate"
                placeholder="Start Date"
              />
              <MonthPicker name="optimizationEndDate" placeholder="End Date" />
            </div>
          }

          <hr />
          <Typography.Text strong>
            Portfolio Holdings:
            </Typography.Text >
          <FieldArray
            name="holdings"
            validateOnChange={false}
            subscription={{}}
            render={arrayHelpers => (
              <div>
                {values.holdings.map((entry, index) => (
                  <div key={index} className="flex">
                    <Form.Item
                      name={`holdings.${index}.securityName`}
                      hasFeedback={true}
                      className="w-60"
                    >
                      <AutoComplete
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        options={etfOptions}
                        style={{ marginTop: "0px" }}
                        className="w-60"
                        name={`holdings.${index}.securityName`}
                        placeholder="Search for a U.S or Canadian ETF"
                      />

                    </Form.Item>
                    {values.allocation === "Manual" &&
                      <Form.Item
                        name={`holdings.${index}.weight`}
                        hasFeedback={true}
                        className="w-35"
                      >
                        <InputNumber
                          min={0}
                          formatter={value => value > 0 ? `${value}%` : ''}
                          parser={value => value.replace('%', '')}
                          max={100} style={{ border: "none" }}
                          name={`holdings.${index}.weight`}
                          placeholder="Weight (%)"
                          className="weight w-35" />

                      </Form.Item>}
                    {values.holdings.length > 1 && < RemoveRowButton
                      style={{ border: "none" }}
                      icon={<DeleteOutlined />}
                      name="holdings"
                      index={index}
                      onClick={() => arrayHelpers.remove(index)}
                    />}
                  </div>
                ))}
                <Button type="button" onClick={() => arrayHelpers.push({ securityName: "", weight: "" })} size="small"> Add </Button>
              </div>
            )}
          />
          <footer>
            <SubmitButton className="ma2" size="large" type="primary"> Submit </SubmitButton>
            <ResetButton className="ma2" size="large" > Reset </ResetButton>
            <Button className="ma2" danger size="large" onClick={() => { props.closeForm(); resetForm(initialFormData) }} > Cancel </Button>
          </footer>
        </Form>
      )}
    </Formik>
  )
}

export default PortfolioForm;








