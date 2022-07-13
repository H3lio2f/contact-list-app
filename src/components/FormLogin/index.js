import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAuth } from "../../utils/contexts/auth";
import { Container } from "./styles";

export default function FormLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().defined("Este campo é obrigatório"),
      password: yup.string().defined("Este campo é obrigatório"),
    }),
    onSubmit: async (
      { email, password },
      { setSubmitting, resetForm, setErrors }
    ) => {
      try {
        await login({
          email,
          password,
        });
        setSubmitting(false);
        enqueueSnackbar("Seja bem-vindo!", {
          variant: "success",
        });
        router.reload();
      } catch ({ response }) {
        setSubmitting(false);
        Swal.fire({
          text: `${
            response.data.message ? response.data.message : "Erro ao entrar, verifique seus dados"
          }`,
          icon: "error",
          confirmButtonColor: "var(--primary)",
        });
      }
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <div className="wrapper">
        <p className="title">Iniciar sessão</p>
        <strong className="logo">MyContacts</strong>
        <div className="form-control">
          <input
            className={formik.errors.email ? "email red-border" : "email "}
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-control">
          <input
            className={
              formik.errors.password ? "password red-border" : "password "
            }
            type={passwordVisibility ? "text" : "password"}
            name="password"
            placeholder="Palavra-passe"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {passwordVisibility ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M9.99999 4.99992C13.1583 4.99992 15.975 6.77492 17.35 9.58325C15.975 12.3916 13.1583 14.1666 9.99999 14.1666C6.84166 14.1666 4.02499 12.3916 2.64999 9.58325C4.02499 6.77492 6.84166 4.99992 9.99999 4.99992ZM9.99999 3.33325C5.83333 3.33325 2.27499 5.92492 0.833328 9.58325C2.27499 13.2416 5.83333 15.8333 9.99999 15.8333C14.1667 15.8333 17.725 13.2416 19.1667 9.58325C17.725 5.92492 14.1667 3.33325 9.99999 3.33325ZM9.99999 7.49992C11.15 7.49992 12.0833 8.43325 12.0833 9.58325C12.0833 10.7333 11.15 11.6666 9.99999 11.6666C8.84999 11.6666 7.91666 10.7333 7.91666 9.58325C7.91666 8.43325 8.84999 7.49992 9.99999 7.49992ZM9.99999 5.83325C7.93333 5.83325 6.24999 7.51659 6.24999 9.58325C6.24999 11.6499 7.93333 13.3333 9.99999 13.3333C12.0667 13.3333 13.75 11.6499 13.75 9.58325C13.75 7.51659 12.0667 5.83325 9.99999 5.83325Z"
                fill="#636E72"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 10.5417 14.0583 11.05 13.8667 11.525L16.3 13.9583C17.5583 12.9083 18.55 11.55 19.1583 10C17.7167 6.34167 14.1583 3.75 9.99167 3.75C8.825 3.75 7.70834 3.95833 6.675 4.33333L8.475 6.13333C8.95 5.94167 9.45834 5.83333 10 5.83333ZM1.66667 3.55833L3.56667 5.45833L3.95 5.84167C2.56667 6.91667 1.48334 8.35 0.833336 10C2.275 13.6583 5.83334 16.25 10 16.25C11.2917 16.25 12.525 16 13.65 15.55L14 15.9L16.4417 18.3333L17.5 17.275L2.725 2.5L1.66667 3.55833ZM6.275 8.16667L7.56667 9.45834C7.525 9.63334 7.5 9.81667 7.5 10C7.5 11.3833 8.61667 12.5 10 12.5C10.1833 12.5 10.3667 12.475 10.5417 12.4333L11.8333 13.725C11.275 14 10.6583 14.1667 10 14.1667C7.7 14.1667 5.83334 12.3 5.83334 10C5.83334 9.34167 6 8.725 6.275 8.16667ZM9.86667 7.51667L12.4917 10.1417L12.5083 10.0083C12.5083 8.625 11.3917 7.50833 10.0083 7.50833L9.86667 7.51667Z"
                fill="#636E72"
              />
            </svg>
          )}
        </div>
        <div className="form-control">
          <input
            className="btn btn-login"
            type="submit"
            value={formik.isSubmitting ? "Entrando..." : "Iniciar sessão"}
            disabled={
            formik.isSubmitting ||
            !!(formik.errors.email && formik.touched.email) ||
            !!(formik.errors.password && formik.touched.password) 
          }
          />
        </div>
      </div>
    </Container>
  );
}
