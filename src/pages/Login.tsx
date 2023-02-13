import { Button, Container, Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { Navigate, redirect, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { loginUser } from "../store/slices/authSlice"
import styled from "styled-components"

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

  const { isLogin, user } = useAppSelector((state) => state.persistedReducer)

  const navigate = useNavigate()

  const fieldValidationRegex = /(?=[A-Za-z0-9])/

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = async ({ username, password }) => {
    console.log(username, password)
    //prelogin
    if (!username && !password) return null

    dispatch(loginUser({ username, password }))
    navigate("/dashboard")
  }

  if (isLogin) return <Navigate to="/dashboard" replace />

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
                {...register("username", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: fieldValidationRegex,
                })}
              />
              {errors.username && (
                <p className="p-1 text-[13px] font-light text-orange-500 text-danger">
                  *Please enter a valid username(6-20 latin letters or numbers)
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-5 w-100" controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: fieldValidationRegex,
                })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light text-orange-500 text-danger">
                  *Please enter a valid password(8-20 latin letters or numbers)
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
