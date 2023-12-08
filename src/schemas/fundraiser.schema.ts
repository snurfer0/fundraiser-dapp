import { object, string, number, InferType } from 'yup';
import { isEthereumAddress } from 'src/helpers/validate.ethereum.address';

export const fundraiserSchema = object({
  name: string().max(20).required('Please enter a name').default(''),
  url: string()
    .url('Invalid URL, must start with https://')
    .required('Please enter a website')
    .default(''),
  description: string()
    .min(300)
    .max(1000)
    .required('Please enter a short description')
    .default(''),
  imageURL: string()
    .url('Invalid URL, make sure it starts with')
    .required('Please enter an image/banner url or upload an image')
    .default(''),
  goal: number()
    .min(1)
    .required('Please enter fundraising goal amount')
    .default(1000),
  beneficiary: string()
    .test({
      test(value, ctx) {
        try {
          if (!value) {
            return ctx.createError({
              message: 'Please enter beneficiary wallet address',
            });
          }
          const isValid = isEthereumAddress(value);
          if (!isValid) throw new Error('Invalid wallet address');
          return true;
        } catch (error) {
          if (error instanceof Error) {
            return ctx.createError({ message: error.message });
          }
          return ctx.createError({ message: 'Invalid wallet address' });
        }
      },
    })
    .required('Please enter beneficiary wallet address')
    .default(''),
});

export type FundraiserValues = InferType<typeof fundraiserSchema>;
