import React from "react";
import SubmitButton from "../buttons/SubmitButton";
import useAuthCall from "../../hooks/useAuthCall";
import { useState } from "react";

const RegisterForm = () => {
  const { register } = useAuthCall();

  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    userType: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(formValues);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="sm:col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
      <form onSubmit={handleSubmit}>
        <div>
          <h4 className=" text-blue-600 text-3xl font-semibold text-center">
          Willkommen bei KellerStore!
          </h4>
          {/* <div>
            <div className="flex items-center gap-x-3 ">
              <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                <input
                  id="privat"
                  name="userType"
                  type="radio"
                  value="privat"
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="privat"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Privat
                </label>
              </div>
              <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                <input
                  id="gewerblich"
                  name="userType"
                  type="radio"
                  value="gewerblich"
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="gewerblich"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Gewerblich
                </label>
              </div>
            </div>
           
            
          </div> */}
          <div>
            <label
              htmlFor="email"
              className=" block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email"
                value={formValues.email}
                onChange={handleChange}
                className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-5">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className=" p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-3">{error}</div>
          )}
          <div className="mt-5 flex justify-center">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
