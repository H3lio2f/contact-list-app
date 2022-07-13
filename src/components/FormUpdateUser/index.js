import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { ButtonContainer } from "../Buttons/save";
import { updateUser } from "./../../utils/persistData";

export default function FormUpdateUser({ user }) {

  const { enqueueSnackbar } = useSnackbar();
  const { setRefresh, refresh, setShowUpdateUser } = useGlobal();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name,
      email: user?.email,
      password: user?.password,
      role: user?.role
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      email: yup
        .string()
        .defined("Este campo é obrigatório")
        .email("Este email não é inválido!"),
        password: yup.string().defined("Este campo é obrigatório"),
    }),
    onSubmit: (
      {
        name,
        email,
        password,
        role
      },
      { setSubmitting }
    ) => {
      updateUser({
        id: user._id,
        name,
        email,
        password,
        role
      }).then(({ data }) => {
          setSubmitting(false);
          setShowUpdateUser(false);
          setRefresh(!refresh);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        }).catch(( {response} ) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          if (response?.status === 422) {
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao actualizar o usuario"
              }`,
              icon: "error",
              confirmButtonColor: "var(--primary)",
            });
          }
        });
    },
  });


  return (
    <Container onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <div className="label-control">
            <label htmlFor="client">Nome*</label>
          </div>
          <input
            className={formik.errors.name ? "client red-border" : "client "}
            id="name"
            type="text"
            placeholder="Digite o nome do cliente"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

        <div className="form-control">
            <div className="label-control">
              <label htmlFor="email">E-mail*</label>
            </div>
            <input
              className={formik.errors.email ? "red-border" : " "}
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="error">{formik.errors.email}</p>
            )}
        </div>
        
        {/* <div className="form-control">
          <div className="label-control">
            <label htmlFor="client">Senha*</label>
          </div>
          <input
            className={formik.errors.password ? "client red-border" : "client "}
            id="password"
            type="text"
            placeholder="Digite o nome do cliente"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div> */}

        <div className="form-control">
          <div className="label-control">
            <label htmlFor="client">Nivel de acesso*</label>
          </div>
          <input
            className={formik.errors.role ? "client red-border" : "client "}
            id="role"
            type="text"
            placeholder="Digite o nome do cliente"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.role && formik.touched.role && (
            <p className="error">{formik.errors.role}</p>
          )}
        </div>

      <div className="form-button-control-divided">
        <div>
        </div>

        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.email && formik.touched.email) ||
            !!(formik.errors.password && formik.touched.password) ||
            !!(formik.errors.user && formik.touched.user)
          }
        >
          <span>
            {" "}
            {formik.isSubmitting ? "A guardar..." : "Guardar alterações"}{" "}
          </span>
          {formik.isSubmitting === true ? (
            <svg
              width="15"
              height="17"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 19.5H0.500835L0.509656 14.2167L4.35444 10.3527L4.70578 9.99956L4.354 9.64689L0.509656 5.79291L0.500834 0.5H11.5V5.80253L7.64689 9.646L7.29245 9.99956L7.64645 10.3536L11.5 14.2071V19.5ZM10.5 14.5V14.2929L10.3536 14.1464L6.35355 10.1464L6 9.79289L5.64645 10.1464L1.64645 14.1464L1.5 14.2929V14.5V18V18.5H2H10H10.5V18V14.5Z"
                fill="white"
                stroke="white"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99989 10.1698L2.52989 6.69982C2.13989 6.30982 1.50989 6.30982 1.11989 6.69982C0.729893 7.08982 0.729893 7.71982 1.11989 8.10982L5.29989 12.2898C5.68989 12.6798 6.31989 12.6798 6.70989 12.2898L17.2899 1.70982C17.6799 1.31982 17.6799 0.689824 17.2899 0.299824C16.8999 -0.0901758 16.2699 -0.0901758 15.8799 0.299824L5.99989 10.1698Z"
                fill="white"
              />
            </svg>
          )}
        </ButtonContainer>
      </div>
    </Container>
  );
}
