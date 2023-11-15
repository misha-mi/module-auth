import {useForm} from "react-hook-form";
import "./form-auth.sass"

const FormAuth = () => {

    const {handleSubmit, register} = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <form className="formAuth" onSubmit={handleSubmit(onSubmit)}>
            <input className="formAuth__input" {...register("email")}/>
            <input className="formAuth__input" {...register("password")}/>
            <button className="formAuth__button">Авторизоваться</button>
        </form>
    )
}

export default FormAuth;