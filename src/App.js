import React from "react";
import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMsg";

const initialValues = {
  name: "",
  email: "",
  contact: "",
  address: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

//-------------Befor Yup----------------------
// const validate = values => {
//   const errors = {}

//   if (!values.name) {
//     errors.name = 'Required'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email format'
//   }

//   if (!values.contact) {
//     errors.contact = 'Required'
//   }

//   return errors
// }
//--------------------------------------------------

const nameRegExp = /^[A-Za-z ]*$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .max(10)
    .matches(nameRegExp, "Please enter valid name")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Required"),
  contact: Yup.string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
  address: Yup.string()
    .min(10, "Min 10 char Required")
    .max(50, "Max 50 char allowed")
    .required("Required"),
});

function App() {
  //------------- Before Re-Factoring-------------
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   // validate,
  //   validationSchema,
  // });
  // ---------------------------------------------

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="main">
        <Form className="form">
          <div className="form-elem">
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Name"
            />
            <ErrorMessage component={ErrorMsg} name="name" />
          </div>

          <div className="form-elem">
            <label htmlFor="email">E-mail</label>
            <Field
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email id"
            />
            <ErrorMessage component={ErrorMsg} name="email" />
          </div>

          <div className="form-elem">
            <label htmlFor="contact">Contact</label>
            <Field
              type="text"
              name="contact"
              autoComplete="off"
              placeholder="Contact"
            />
            <ErrorMessage component={ErrorMsg} class="err" name="contact" />
          </div>

          <div className="form-elem address">
            <label htmlFor="address">Address</label>
            <Field
              as="textarea"
              className="add-field"
              name="address"
              autoComplete="off"
              placeHolder="Address"
            >{
              (props)=>{console.log(props)}
            }</Field>
            <ErrorMessage component={ErrorMsg} class="err" name="address" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </Formik>
  );
}

export default App;
