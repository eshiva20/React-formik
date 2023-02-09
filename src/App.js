import React from "react";
import "./App.css";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMsg";

const initialValues = {
  name: "",
  email: "",
  contact: ["", ""],
  address: "",
  about: "",
  social: {
    facebook: "",
    instagram: "",
  },
  skills: [""],
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
  address: Yup.string()
    .min(10, "Min 10 char Required")
    .max(50, "Max 50 char allowed")
    .required("Required"),
  about: Yup.string()
    .min(10, "min 10 chars required")
    .max(50)
    .required("required"),
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
            <ErrorMessage name="email">
              {(props) => <h1 className="red">{props}</h1>}
            </ErrorMessage>
          </div>

          <div className="form-elem">
            <label htmlFor="primary">Primary Contact</label>
            <Field
              type="text"
              name="contact[0]"
              autoComplete="off"
              placeholder="Primary Contact"
            />
            <ErrorMessage component={ErrorMsg} class="err" name="primary" />
          </div>

          <div className="form-elem">
            <label htmlFor="secondary">Secondary Contact</label>
            <Field
              type="text"
              name="contact[1]"
              autoComplete="off"
              placeholder="Secondary Contact"
            />
            <ErrorMessage component={ErrorMsg} class="err" name="secondary" />
          </div>

          <div className="form-elem address">
            <label htmlFor="address">Address</label>
            <Field
              as="textarea"
              className="add-field"
              name="address"
              autoComplete="off"
              placeholder="Address"
            />
            <ErrorMessage class="err" name="address">
              {(errMsg) => <h1 className="red">{errMsg}</h1>}
            </ErrorMessage>
          </div>

          <div className="form-elem">
            <label htmlFor="about">About YourSelf</label>
            <FastField name="about">
              {(props) => {
                const { field, meta } = props;
                console.log("about rendered");
                return (
                  <div>
                    <input
                      placeholder="Describe Yourself"
                      name="about"
                      type="textarea"
                      {...field}
                    />
                    {meta.touched && meta.error ? (
                      <h1 className="red">{meta.error}</h1>
                    ) : null}
                  </div>
                );
              }}
            </FastField>
          </div>

          <div className="form-elem">
            <label htmlFor="facebook">Facebook url</label>
            <Field type="text" name="social.facebook" />
          </div>

          <div className="form-elem">
            <label htmlFor="intagram">instagram url</label>
            <Field type="text" name="social.instagram" />
          </div>

          <div className="form-elem">
            <label htmlFor="skills">Skills</label>
            <FieldArray name="skills">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { skills } = values;
                return (
                  <div>
                    {skills.map((elem, index) => (
                      <div key={index}>
                        <Field
                          name={`skills[${index}]`}
                          style={{ width: "350px", display: "inline" }}
                        />
                        {index > 0 && (
                          <button
                            style={{ padding: "3px 10px", fontSize: "30px" }}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            -
                          </button>
                        )}
                        <button
                          style={{ padding: "3px 10px", fontSize: "30px" }}
                          type="button"
                          onClick={() => push(" ")}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </Formik>
  );
}

export default App;
