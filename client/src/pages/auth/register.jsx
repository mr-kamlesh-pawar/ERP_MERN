import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);

    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
          if (data.payload.success === true) {
            toast({
              title: data?.payload?.message,
              variant: "success",
            });
            navigate("/auth/login");
          } else{
            toast({
              title: data?.payload?.message,
              variant: "error",
            });

          }

    });
  }

  return (
    <div className=" mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">Already have an account</p>
        <Link
          to="/auth/login"
          className="font-medium  text-primary hover:underline ml-2"
        >
          Login
        </Link>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={"SignUp"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
