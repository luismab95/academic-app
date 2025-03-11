import * as Yup from 'yup';

export const EditUserSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es obligatorio.'),
  lastname: Yup.string().required('Apellidos es obligatorio.'),
  email: Yup.string()
    .email('Correo electrónico inválido.')
    .required('Correo electrónico es obligatorio.'),
  identification: Yup.string()
    .required('Identificación es obligatorio.')
    .matches(/^\d{10}$/, 'Identificación no válida.'),
  phone: Yup.string()
    .matches(/^\d{10,15}$/, 'Número de celular no válido.')
    .required('Número de celular es obligatorio.'),
});
