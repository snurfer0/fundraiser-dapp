'use client';

import { Formik, FormikHelpers } from 'formik';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { ButtonType } from 'src/enums/button.type.enum';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { InputType } from 'src/enums/input.type.enum';
import {
  FundraiserValues,
  fundraiserSchema,
} from 'src/schemas/fundraiser.schema';
import { Button, FileInput, Input, Label, Radio, TextArea } from '../atoms';

interface Props {
  onSubmit: (values: FundraiserValues) => Promise<void>;
}

const FundraiserForm: React.FC<Props> = ({ onSubmit }) => {
  const [isFileUpload, setIsFileUpload] = useState(false);

  const handleFormSubmit = async (
    values: FundraiserValues,
    { setSubmitting }: FormikHelpers<FundraiserValues>
  ) => {
    try {
      const validatedValues = fundraiserSchema.cast(values);
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
      initialValues={fundraiserSchema.cast({})}
      validationSchema={fundraiserSchema}
    >
      {({ values, isSubmitting, isValid, setValues, handleSubmit, errors }) => (
        <form
          className="w-full max-w-4xl mx-auto p-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className="text-4xl text-center font-semibold my-6 select-none">
            Start a fundraiser
          </h1>
          <div className="flex flex-wrap -mx-1 mb-4">
            <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
              <Input
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name}
                disabled={isSubmitting}
                type={InputType.text}
                value={values.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, name: e.target.value })
                }
              />
            </div>
            <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
              <Input
                name="url"
                label="Website Url"
                placeholder="Website Url"
                error={errors.url}
                value={values.url}
                disabled={isSubmitting}
                type={InputType.text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, url: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-1 mb-4">
            <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
              <Input
                type={InputType.number}
                name="goal"
                placeholder="100"
                label="Goal (ETH)"
                error={errors.goal}
                disabled={isSubmitting}
                value={values.goal}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, goal: Number(e.target.value) })
                }
              />
            </div>
            <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
              <Input
                name="beneficiary"
                label="Beneficiary"
                placeholder="Wallet Address"
                type={InputType.text}
                error={errors.beneficiary}
                disabled={isSubmitting}
                value={values.beneficiary}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, beneficiary: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-1 mb-4">
            {isFileUpload ? (
              <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
                <FileInput
                  name="imageURL"
                  label="Image Url"
                  placeholder="Image Url"
                  error={errors.imageURL}
                  disabled={isSubmitting}
                  value={values.imageURL}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({ ...values, imageURL: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
                <Input
                  name="imageURL"
                  label="Image Url"
                  placeholder="Image Url"
                  error={errors.imageURL}
                  type={InputType.text}
                  value={values.imageURL}
                  disabled={isSubmitting}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({ ...values, imageURL: e.target.value })
                  }
                />
              </div>
            )}
            <div className="px-1 w-11/12 sm:w-1/2 mb-4 sm:mb-0 mx-auto">
              <div className="px-2 w-full lg:w-auto mb-4 lg:mb-0">
                <Label
                  topLeft="Upload Type"
                  className="block text-center lg:text-left"
                >
                  <div className="flex flex-col lg:flex-row justify-center lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4 mt-2">
                    <Radio
                      name="urlUpload"
                      label="Url Upload"
                      checked={!isFileUpload}
                      disabled={isSubmitting}
                      onChange={() => setIsFileUpload(false)}
                    />
                    <Radio
                      disabled
                      name="fileUpload"
                      label="File Upload"
                      checked={isFileUpload}
                      onChange={() => setIsFileUpload(true)}
                    />
                  </div>
                </Label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <TextArea
              name="description"
              label="Description"
              placeholder="Description"
              value={values.description}
              error={errors.description}
              disabled={isSubmitting}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="w-full mt-10 flex justify-center">
            <Button
              className="w-[30%]"
              loading={isSubmitting}
              type={ButtonType.submit}
              variant={ButtonVariant.Primary}
              disabled={!isValid || isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FundraiserForm;
