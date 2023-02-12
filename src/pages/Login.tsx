import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router"
import styled from "styled-components"
import { useAppDispatch } from "../hooks/useAppDispatch"
// import { setUser } from "../store/slices/authSlice"

interface Inputs {
  username: string
  password: string
}

const Background = styled.div`
  height: 100vh;
`

const LoginContainer = styled(Container)`
  // min-width: 300px;
  width: 100%;
  max-width: 700px;
`

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  @media (max-width: 575px) {
    padding: 10px;
  }
`

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [login, setLogin] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    console.log(username, password)
    //prelogin
    if (username && password) return navigate("/dashboard")
  }
  return (
    <Background className="bg-dark position-relative d-flex align-items-center">
      <LoginContainer>
        <FormWrapper>
          <Form
            className="w-100 d-flex flex-column justify-content-start align-items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Label
              className="w-100 text-center mb-4 text-white h1"
              style={{ fontSize: "3rem" }}
            >
              Login
            </Form.Label>
            <Form.Group className="mb-3 w-100" controlId="formBasicUsername">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="p-1 text-[13px] font-light text-orange-500 text-danger">
                  *Please enter a valid username
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-5 w-100" controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light text-orange-500 text-danger">
                  *Please enter a valid password
                </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </FormWrapper>
      </LoginContainer>
    </Background>
  )
}

export default Login
