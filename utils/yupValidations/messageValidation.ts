import * as yup from 'yup';
const messageSchema = yup.object({
  body: yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    message: yup.string().required(),
  }),
});

export { messageSchema };
