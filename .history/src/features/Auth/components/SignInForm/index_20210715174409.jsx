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
  const { initialValues, isAddMode } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required."),

    categoryId: Yup.number().required("This field is required.").nullable(),

    photo: Yup.string().when("categoryId", {
      is: 1,
      then: Yup.string().required("This field is required."),
      otherwise: Yup.string().notRequired(),
    }),
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
              name="title"
              component={InputField}
              // props inject into InputField
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="title"
              component={InputField}
              // props inject into InputField
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FormGroup>
              <Button type="submit" color="primary" size="medium">
                {isSubmitting && <Spinner size="lg" />}
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
