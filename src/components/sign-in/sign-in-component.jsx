import { useState } from "react";
import {
  auth,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input-component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const enterAsGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password).then(() => {
        resetFormFieds();
      });
    } catch (error) {
      alert("Erro no Cadastro");
      resetFormFieds();
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
      <h2>Já tenho uma conta</h2>
      <span>Entre com seu Email e Senha</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Entrar</Button>
          <Button type="button" buttonType="google" onClick={enterAsGoogleUser}>
            Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
