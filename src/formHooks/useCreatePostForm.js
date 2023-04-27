// import react
import React, { useState, useEffect } from "react";
import * as yup from "yup";

export default function useCreatePostForm(initialValue) {
  const [value, setValue] = useState(initialValue);

  //errors for form validation
  const [errors, setErrors] = useState(value);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // form validation error for inputs for post and title
  let formSchema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter a title for your post.")
      .min(3, "Your title is too short."),
    post: yup
      .string()
      .required("Please enter a post.")
      .min(5, "Your post is too short."),
  });

  useEffect(() => {
    formSchema.isValid(value).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [value, formSchema]);

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
        console.log("errors on yup validation---->", err.errors);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  }

  // handle changes for posts  input fields
  function handlePostChanges(e) {
    console.log(
      "e target handlePostChanges------>",
      e.target.name,
      e.target.value
    );
    e.persist();
    validateChanges(e);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  return [value, setValue, errors, buttonDisabled, handlePostChanges];
}
