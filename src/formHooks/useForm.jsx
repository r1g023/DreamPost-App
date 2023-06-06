import React, { useState, useRef, useEffect } from "react";
import * as yup from "yup";

export default function useForm(initialValue) {
  const [value, setValue] = useState(initialValue);

  //errors for form validation
  const [errors, setErrors] = useState(value);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //Form validation error for inputs
  let formSchema = yup.object().shape({
    username: yup
      .string()
      .required("please enter username")
      .min(3, "minimum of 3 characters needed to login"),
    // password should give out error if it's incorrect
    password: yup.string().required("please enter password"),
  });

  useEffect(() => {
    formSchema.isValid(value).then((valid) => {
      setButtonDisabled(!valid);
    });
    // add local storage to value.title and value.post
  }, [value, formSchema]);

  // get

  //validate for errors if inputs are not filled out completely based on yup
  function validateChanges(e) {
    //get by input name
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        //if no errors, do nothing
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        // console.log("errors on yup validation---->", err.errors);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  }

  function handleChanges(e) {
    e.persist();
    validateChanges(e);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }
  return [value, setValue, errors, buttonDisabled, handleChanges];
}
