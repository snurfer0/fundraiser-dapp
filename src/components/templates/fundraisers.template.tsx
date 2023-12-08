'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { defaultPagination } from 'src/constants';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import useFundraiser from 'src/hooks/use.fundraiser';
import useFundraiserFactory from 'src/hooks/use.fundraiser.factory';
import { Button, Grid, Loading } from '../atoms';
import { Modal } from '../molecules';
import { DonationForm, FundraiserCard } from '../organisms';

const FundraisersTemplate: React.FC = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDialogElement>(null);

  const { donate } = useFundraiser();
  const { fetchFundraisers } = useFundraiserFactory();

  const [selectedFundraiser, setSelectedFundraiser] = useState<string | null>(
    null
  );

  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fundraisers'],
    queryFn: ({ pageParam = 0 }) =>
      fetchFundraisers({ offset: pageParam, limit: defaultPagination.limit }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage?.nextOffset,
  });

  const closeModal = () => {
    setSelectedFundraiser(null);
  };

  const openModal = () => {
    const modalElement = modalRef.current;
    if (modalElement && modalElement.showModal) {
      modalElement.showModal();
    }
  };

  const { mutateAsync: donateMutation } = useMutation({
    mutationFn: donate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fundraisers'] });
      closeModal();
    },
  });

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          await fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, data]);

  if (error) {
    return (
      <div className="text-center mt-20">
        <p>Sorry, there was an error loading the fundraisers.</p>
        <Button
          onClick={refetch}
          className="mt-4 px-4 py-2"
          variant={ButtonVariant.Accent}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Modal
        id="fundraiser-modal"
        title="Donate"
        ref={modalRef}
        onClose={closeModal}
      >
        {selectedFundraiser && (
          <DonationForm
            fundraiserAddress={selectedFundraiser}
            onSubmit={async ({ fundraiserAddress, ethAmount }) => {
              await donateMutation({ fundraiserAddress, ethAmount });
            }}
          />
        )}
      </Modal>
      <div className="mt-20 select-none px-4 md:px-8">
        <h1 className="text-center text-3xl md:text-5xl font-bold my-4">
          Our fundraisers
        </h1>
        <div className="w-full flex justify-center mt-20">
          {data && (
            <Grid>
              {data.pages.flatMap((page, pageIndex, array) =>
                page?.data.map((fundraiser, itemIndex) => {
                  const isLastRowFirstItem =
                    pageIndex === array.length - 1 && itemIndex === 0;
                  return (
                    <FundraiserCard
                      key={fundraiser.address}
                      ref={isLastRowFirstItem ? observerTarget : null}
                      fundraiser={fundraiser}
                      openDonationForm={() => {
                        setSelectedFundraiser(fundraiser.address);
                        openModal();
                      }}
                    />
                  );
                })
              )}
            </Grid>
          )}
        </div>
      </div>
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default FundraisersTemplate;
