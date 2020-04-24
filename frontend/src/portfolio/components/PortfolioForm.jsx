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
import { Button, Alert, Typography, Row } from "antd"
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
        weight: mixed().required("Required")
      })
    ).required("Please enter at least one security"),
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

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 13,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 35,
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

        <Form {...layout}>
          {error && <Alert
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "5px" }}
            className="tl"
          />}
          <Form.Item label="Portfolio Name" name="name" hasFeedback={true} required>
            <Input name="name" placeholder="Ex: 80% Equity and 20% Gold" />
          </Form.Item>
          <Form.Item label="Allocation Type" name="allocation" hasFeedback={true} required>
            <Select name="allocation" placeholder="Ex: Minimum Volatility" showArrow >
              {initialFormData.optimizers.map((optimizer, index) => {
                return (<Select.Option key={index} value={optimizer}> {optimizer} </Select.Option>)
              })}
            </Select>
          </Form.Item>

          {values.allocation === "Efficient Return" &&
            <Form.Item label="Target Return" name="targetReturn" hasFeedback={true} required>
              <InputNumber
                min={0}
                formatter={value => value > 0 ? `${value}%` : ''}
                parser={value => value.replace('%', '')}
                name="targetReturn"
                placeholder="Ex: 8%" />
            </Form.Item>
          }

          {values.allocation === "Efficient Volatility" &&
            <Form.Item label="Target Volatility" name="targetVolatility" hasFeedback={true} required>
              <InputNumber
                min={0}
                formatter={value => value > 0 ? `${value}%` : ''}
                parser={value => value.replace('%', '')}
                name="targetVolatility"
                placeholder="Ex: 7%" />
            </Form.Item>
          }
          <Form.Item label="Rebalancing Frequency" name="rebalancingFrequency" hasFeedback={true} required>

            <Select name="rebalancingFrequency" placeholder="Ex: Monthly" showArrow className="w-90">
              {initialFormData.rebal_freqs.map((frequency, index) => {
                return (<Select.Option key={index} value={frequency}> {frequency} </Select.Option>)
              })}
            </Select>
          </Form.Item>

          {values.allocation !== "Manual" && values.allocation !== "Equal Allocation" &&
            <div>
              <Form.Item label="Optimization Period" name="optimizationStartDate" hasFeedback={true} required>
                <MonthPicker
                  name="optimizationStartDate"
                  placeholder="Start Date"
                />
                <MonthPicker name="optimizationEndDate" placeholder="End Date" />

              </Form.Item>

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
                  <div key={index}>
                    <Row>
                      <Form.Item
                        name={`holdings.${index}.securityName`}
                        hasFeedback={true}
                        required
                        className="w-70"
                      >
                        <AutoComplete
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          options={etfOptions}
                          name={`holdings.${index}.securityName`}
                          placeholder="Search for a U.S or Canadian ETF"
                        />
                      </Form.Item>
                      {values.allocation === "Manual" &&
                        <Form.Item
                          name={`holdings.${index}.weight`}
                          hasFeedback={true}
                        >
                          <InputNumber
                            min={0}
                            formatter={value => value > 0 ? `${value}%` : ''}
                            parser={value => value.replace('%', '')}
                            max={100}
                            name={`holdings.${index}.weight`}
                            placeholder="Weight"
                          />
                        </Form.Item>}
                      {values.holdings.length > 1 && < RemoveRowButton
                        style={{ border: "none" }}
                        icon={<DeleteOutlined />}
                        name="holdings"
                        index={index}
                        onClick={() => arrayHelpers.remove(index)}
                      />}
                    </Row>

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








