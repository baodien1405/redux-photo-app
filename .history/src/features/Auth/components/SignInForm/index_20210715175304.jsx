import InputField from "custom-fields/InputField";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";

// import { PHOTO_CATEGORY_OPTIONS } from "../../../../constants/global";
// import Images from "../../../../constants/images";

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};

SignInForm.defaultProps = {
  onSubmit: null,
};

function SignInForm(props) {
  const { initialValues } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required."),
    password: Yup.string().required("This field is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        // do something here
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="email"
              component={InputField}
              // props inject into InputField
              label="E-mail"
              placeholder="@mail.com"
            />

            <FastField
              name="password"
              component={InputField}
              // props inject into InputField
              label="Password"
              placeholder="Password"
            />

            <FormGroup>
              <Button type="submit" color="primary" block>
                {isSubmitting && <Spinner size="sm" />}
                Login
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
