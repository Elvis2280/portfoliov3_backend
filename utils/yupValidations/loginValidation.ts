import * as yup from 'yup';
const tryLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  }),
});

export { tryLoginSchema };
