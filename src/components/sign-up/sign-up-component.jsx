import { useState } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input-component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não combinam");
      return;
    }
    try {
        await createAuthUserWithEmailAndPassword(
          email,
          password
        );
      if (auth.currentUser) {
        await createUserDocFromAuth(auth.currentUser, { displayName }).then(
          () => {
            resetFormFieds();
          }
        );
      }
    } catch (error) {
      alert("Erro no Cadastro");
      console.log(error);
    }
  };

  const resetFormFieds = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Não tenho uma conta</h2>
      <span>Cadastre-se com seu Email e Senha</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nome"
          inputOptions={{
            required: true,
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Senha"
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="Confirmar senha"
          inputOptions={{
            required: true,
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />
        <Button type="submit">Cadastrar-se</Button>
      </form>
    </div>
  );
};

export default SignUp;
