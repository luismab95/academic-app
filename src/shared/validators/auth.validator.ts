import * as Yup from 'yup';

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10,15}$/; // Acepta entre 10 y 15 dígitos
  return phoneRegex.test(phone);
};

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo Electrónico no válido.')
    .required('Correo Electrónico es obligatorio.'),
  password: Yup.string().required('Contraseña es obligatorio.'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Contraseña es obligatorio.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben coincidir.')
    .required('Confirmar contraseña es obligatorio.'),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo Electrónico no válido.')
    .required('Correo Electrónico es obligatorio.'),
  password: Yup.string()
    .required('Contraseña es obligatorio.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    ),
  name: Yup.string().required('Nombre es obligatorio.'),
  lastname: Yup.string().required('Apellido es obligatorio.'),
  identification: Yup.string()
    .required('Identificación es obligatorio.')
    .matches(/^\d{10}$/, 'Identificación no válida.'),
});
