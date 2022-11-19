import { Button, Form, Input, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import scss from "./styles.module.scss";

const Login = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/");
      notification.success({
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error,
      });
    }
  };

  const handleClick = () => {
    navigate("/register");
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={scss.center}>
      <h1 className={scss.h1}>Login</h1>
      <div className={scss.styless}>
        <Form
          className={scss.form}
          onFinish={handleSubmit(onSubmit)}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 8 }}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                className={scss.item}
                label="Email"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input type="text" {...field} className={scss.input} />
              </Form.Item>
            )}
          />

          <Controller
            className={scss.item}
            name="passWord"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                className={scss.item}
                label="Mật khẩu"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input type="password" {...field} />
              </Form.Item>
            )}
          />

          <Form.Item wrapperCol={{ offset: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Đăng Nhập
            </Button>
            <a href="" onClick={handleClick}>
              Đăng ký
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
