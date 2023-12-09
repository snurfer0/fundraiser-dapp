'use client';

import { Formik, FormikHelpers } from 'formik';
import React, { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useWalletContext } from 'src/contexts/wallet.context';
import { ButtonType } from 'src/enums/button.type.enum';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { InputType } from 'src/enums/input.type.enum';
import { shortenEthereumAddress } from 'src/helpers/short.address';
import { DonationValues, donationSchema } from 'src/schemas/donation.schema';
import { Button, Input, Range } from '../atoms';

interface Props {
  fundraiserAddress: string;
  onSubmit: (values: DonationValues) => Promise<void>;
}

const DonationForm: React.FC<Props> = ({ fundraiserAddress, onSubmit }) => {
  const { balance } = useWalletContext();
  const handleFormSubmit = async (
    values: DonationValues,
    { setSubmitting }: FormikHelpers<DonationValues>,
  ) => {
    try {
      const validatedValues = donationSchema.cast(values);
      await onSubmit(validatedValues);
      setSubmitting(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={donationSchema.cast({ fundraiserAddress })}
      validationSchema={donationSchema}
    >
      {({ values, isSubmitting, isValid, setValues, handleSubmit }) => (
        <form
          className="w-full max-w-4xl mx-auto p-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="">
            <div>
              <Input
                disabled
                name="url"
                type={InputType.text}
                label="Fundraiser address"
                value={shortenEthereumAddress(values.fundraiserAddress, 12, 11)}
              />
            </div>
            <h4 className="w-full flex justify-center mt-3 text-xl text-bold">
              {values.ethAmount} Eth
            </h4>
            <div className="mt-5">
              <Range
                name="ethAmount"
                label="Eth Amount"
                value={values.ethAmount}
                min={0}
                max={balance}
                disabled={isSubmitting}
                step={0.01}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, ethAmount: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="w-full mt-10 flex justify-center">
            <Button
              className="w-[30%]"
              loading={isSubmitting}
              type={ButtonType.submit}
              variant={ButtonVariant.Primary}
              disabled={!isValid || isSubmitting}
            >
              Send
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DonationForm;
