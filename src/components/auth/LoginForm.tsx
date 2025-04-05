"use client";
import SocialIcons from "@/Common/SocialIcons";
import { Href } from "@/utils/Constant";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "Test@gmail.com",
    password: "Test@123",
  });
  const { email, password } = formValues;
  const router = useRouter();
  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const formSubmitHandle = (event: FormEvent) => {
    event.preventDefault();
    if (email === "Test@gmail.com" && password === "Test@123") {
      Cookies.set("token", JSON.stringify(true));
      router.push("/dashboard");
      toast.success("login successful");
    } else {
      alert("wrong email");
    }
  };

  return (
    <form className="theme-form" onSubmit={formSubmitHandle}>
      <h4>Sign in to account</h4>
      <p>Enter your email &amp; password to login</p>
      <div className="form-group">
        <label className="col-form-label form-label-title ">
          Email Address
        </label>
        <input
          type="email"
          required
          placeholder="Test@gmail.com"
          value={email}
          name="email"
          className="form-control"
          onChange={handleUserValue}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label form-label-title ">Password</label>
        <div className="form-input position-relative">
          <input
            type={showPassWord ? "text" : "password"}
            placeholder="*********"
            onChange={handleUserValue}
            value={password}
            name="password"
            className="form-control"
          />
          <div className="show-hide">
            <span
              onClick={() => setShowPassWord(!showPassWord)}
              className={!showPassWord ? "show" : ""}
            />
          </div>
        </div>
      </div>
      <div className="form-group mb-0">
        <div className="checkbox p-0">
          <input id="checkbox1" type="checkbox" />
          <label className="text-muted" htmlFor="checkbox1">
            Remember password
          </label>
        </div>
        <a className="link" href={Href}>
          Forgot password?
        </a>
        <div className="text-end mt-3">
          <button className="btn btn-primary btn-block w-100" type="submit">
            Sign in
          </button>
        </div>
      </div>
      <h6 className="text-muted mt-4 or">Or Sign in with</h6>
      <SocialIcons />
      <p className="mt-4 mb-0 text-center">
        Don't have account?
        <Link className="ms-2" href="/register">
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
