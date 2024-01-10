import { useForm } from "react-hook-form";

// less code
// better validation
// better errors (set, clear, display)
// have control over inputs
// Dont deal with event
// easier inputs
interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode:'onBlur'
  });

  const onValid = (data) => {
    console.log("im valid :", data);
  };
  const onInvalid = (errors) => {
    console.log("error :", errors);
  };

  return (
    <div className="mt-20" onSubmit={handleSubmit(onValid, onInvalid)}>
      <form action="">
        <input
          {...register("username", {
            // required: "username을 입력해주세요(메시지 적기)",
            maxLength: {
              message: "8글자 이하로 설정해주세요",
              value: 8,
            },
          })}
          type="text"
          placeholder="usename"
        />
        <input
          {...register("email", {
            required: "email is required",
            validate: {
              notGamil: (value) =>
                !value.includes("@gmail.com") || "gmail message here",
            },
          })}
          type="email"
          placeholder="email"
          className={`${errors.email ? 'bg-red-500' : ' '} `}
        />
        {errors.email?.message}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
}
