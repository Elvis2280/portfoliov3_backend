import * as yup from 'yup';
const signUpValSchema = yup.object({
  body: yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    nombre: yup.string().required(),
  }),
});

export { signUpValSchema };
