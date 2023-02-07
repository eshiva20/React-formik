import "./App.css";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  contact: "",
};

const onSubmit = (values) => {
  console.log("values", values);
};

const validate = (values) => {
  let error = {};
  if (!values.name) {
    error.name = "Name required";
  }
  else if(values.name.length<3 ||   values.name.length>10 ){
    error.name="length should be between 3-10"
  }

  if (!values.email) {
    error.email = "Email required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    error.email = "Invalid email format";
  }

  if (!values.contact) {
    error.contact = "contact required";
  } else if (isNaN(values.contact)) {
    error.contact = "Enter Number Only";
    console.log(values.contact.length)
  }else if(values.contact.length != 10){
    error.contact = "Enter correct contact Number";
  }
  return error;
};

function App() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // console.log("formik values",formik.values)
  // console.log("errors", formik.errors);

  console.log("visited", formik.touched)

  return (
    <div className="main">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-elem">
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            className="name"
            name="name"
            type="text"
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.name && formik.errors.name ? (
            <h1 style={{ color: "red", fontSize: "15px" }}>
              {formik.errors.name}
            </h1>
          ) : null}
        </div>
        <div className="form-elem">
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            className="email"
            name="email"
            type="email"
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email &&formik.errors.email ? (
            <h1 style={{ color: "red", fontSize: "15px" }}>
              {formik.errors.email}
            </h1>
          ) : null}
        </div>
        <div className="form-elem">
          <label htmlFor="contact">Contact</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.contact}
            className="contact"
            name="contact"
            type="contact"
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact && formik.errors.contact ? (
            <h1 style={{ color: "red", fontSize: "15px" }}>
              {formik.errors.contact}
            </h1>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
