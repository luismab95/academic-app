import * as Yup from 'yup';

export const ValidateCertificateSchema = Yup.object().shape({
  code: Yup.string()
    .required('Código de verificación es obligatorio.')
    .max(16, 'Código de verificación no válido.')
    .min(16, 'Código de verificación no válido.'),
});
