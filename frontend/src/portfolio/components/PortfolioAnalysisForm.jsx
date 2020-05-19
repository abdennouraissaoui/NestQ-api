import React from "react";
import { Formik } from "formik";
import {
  ResetButton,
  SubmitButton,
  Form,
  DatePicker
} from "formik-antd";
import { Card, Typography } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { object,  } from "yup";
const { MonthPicker } = DatePicker;

const PortfolioAnalysisForm = ({
  onGo,
  analysisStartDate,
  analysisEndDate,
}) => {
  const initialValues = () => {
    return {
      analysisStartDate: new Date(analysisStartDate),
      analysisEndDate: new Date(analysisEndDate),
    };
  };
  const validationSchema = object().shape({

  });

  const handleSubmit = (values, actions) => {
    const start = values.analysisStartDate;
    const end = values.analysisEndDate;
    try {
      onGo({ start, end });
    } catch (e) {}
    actions.setSubmitting(false);
  };

  return (
    <Card
      style={{ marginTop: 0 }}
      type="inner"
      title={
        <Typography.Title level={4} className="tc">
          Report Settings
        </Typography.Title>
      }
    >
      <Formik
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        initialValues={initialValues()}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {({ values }) => (
          <Form>
            <Form.Item name="analysisStartDate" label="Report Period">
              <MonthPicker
                size="small"
                name="analysisStartDate"
                placeholder="Start Date"
              />
              <MonthPicker
                size="small"
                name="analysisEndDate"
                placeholder="End Date"
              />
            </Form.Item>
            <footer>
              <SubmitButton
                icon={<PlayCircleOutlined />}
                className="ma2"
                size="large"
                type="primary"
              >
                Go
              </SubmitButton>
              <ResetButton className="ma2" size="large">
                Reset
              </ResetButton>
            </footer>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PortfolioAnalysisForm;
