import { object, string, number, InferType } from 'yup';
import { isEthereumAddress } from 'src/helpers/validate.ethereum.address';

export const donationSchema = object({
  ethAmount: number()
    .moreThan(0)
    .required('Please ether the amount in ETH')
    .default(0),
  fundraiserAddress: string()
    .test({
      test(value, ctx) {
        try {
          if (!value) {
            return ctx.createError({
              message: 'Something went wrong. Please try again later.',
            });
          }
          const isValid = isEthereumAddress(value);
          if (!isValid) {
            throw new Error('Something went wrong. Please try again later.');
          }
          return true;
        } catch (error) {
          if (error instanceof Error) {
            return ctx.createError({ message: error.message });
          }
          return ctx.createError({
            message: 'Something went wrong. Please try again later.',
          });
        }
      },
    })
    .required('Something went wrong. Please try again later.')
    .default(null),
});

export type DonationValues = InferType<typeof donationSchema>;
