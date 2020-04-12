import React, { useState, useContext, useEffect } from 'react';
import DataFormatter from "../../shared/utils/DataFormatter"
import { FieldArray, Formik } from "formik"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
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
import { Button, Alert, Modal } from "antd"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/Context/AuthContext"
import { string, object, array } from 'yup';
const tickers = require("./tickers.json")
const { MonthPicker } = DatePicker
const { toDictOfHoldings } = DataFormatter
const validationSchema = object().shape({
  name: string().required('Portfolio name is required'),
  holdings: array().of(
    object()).required("Must have at least one security").min(1)
})


const dateNYearsAgo = (N) => {
  var date = new Date();
  date.setFullYear(date.getFullYear() - N);
  return date
}

const initialValues = (props) => {
  return {
    name: props.name || "",
    allocation: props.allocation || "",
    holdings: props.holdings || [{ ticker: "", weight: "" }],
    closeForm: props.closeForm,
    optimizationStartDate: props.optimizationStartDate || dateNYearsAgo(3),
    optimizationEndDate: props.optimizationEndDate || new Date(),
    rebalancingFrequency: props.rebalancingFrequency || ""
  }
}



const PortfolioForm = (props) => {
  const initialName = props.name
  const [isOpenSecurityEntry, setIsOpenSecurityEntry] = useState(false)
  const [initialFormData, setInitialFormData] = useState({
    optimizers: [],
    rebal_freqs: []
  })

  const openSecurityEntryForm = () => setIsOpenSecurityEntry(true)
  const closeSecurityEntryForm = () => setIsOpenSecurityEntry(false)
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
        `/api/portfolio/${initialName || portfolioMeta.name}`,
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
          <Form.Item
            name="name"
            hasFeedback={true}
          >
            <Input name="name" placeholder="Portfolio name" />
          </Form.Item>
          <Select name="allocation" placeholder="Allocation" showArrow className="w-90">
            <Select.Option value="Manual"> Manual </Select.Option>
            {initialFormData.optimizers.map((optimizer, index) => {
              return (<Select.Option key={index} value={optimizer}> {optimizer} </Select.Option>)
            })}
          </Select>
          <Select name="rebalancingFrequency" placeholder="Rebalancing Frequency" showArrow className="w-90">
            {initialFormData.rebal_freqs.map((frequency, index) => {
              return (<Select.Option key={index} value={frequency}> {frequency} </Select.Option>)
            })}
          </Select>
          {values.allocation !== "Manual" &&
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
          <Button icon={<PlusOutlined />} type="dashed" onClick={openSecurityEntryForm}>
            Add Securities
        </Button>
          <Modal
            title="Security Entry Form"
            visible={isOpenSecurityEntry}
            onOk={closeSecurityEntryForm}
            onCancel={closeSecurityEntryForm}
          >
            <FieldArray
              name="holdings"
              validateOnChange={false}
              subscription={{}}
              render={arrayHelpers => (
                <div>
                  {values.holdings.map((entry, index) => (
                    <div key={index} className="flex">
                      <Form.Item
                        name={`holdings.${index}.ticker`}
                        hasFeedback={true}
                        className="w-60"
                      >
                        {/* <Input style={{ marginTop: "0px" }} className="ticker w-60" name={`holdings.${index}.ticker`} placeholder="Search for securities" /> */}
                        <AutoComplete
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          options={tickers}
                          style={{ marginTop: "0px" }}
                          className="ticker w-60"
                          name={`holdings.${index}.ticker`}
                          placeholder="Search for securities"
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
                            formatter={value => value.length > 0 ? `${value}%` : ''}
                            parser={value => value.replace('%', '')}
                            max={100} style={{ border: "none" }}
                            name={`holdings.${index}.weight`}
                            placeholder="Weight (%)"
                            className="weight w-35" />

                        </Form.Item>}
                      {< RemoveRowButton
                        style={{ border: "none" }}
                        icon={<DeleteOutlined />}
                        name="holdings"
                        index={index}
                        onClick={() => arrayHelpers.remove(index)}
                      />}
                    </div>
                  ))}
                  <Button type="button" onClick={() => arrayHelpers.push({ ticker: "", weight: "" })} size="small"> Add </Button>

                </div>
              )}
            />
          </Modal>

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








