'use client';

import { m } from 'framer-motion';
import { FC } from 'react';

import LazyLoadFramerMotion from './lazy-load-framer-motion';

type GoogleMapsRating = {
  rating: number;
};

const THRESHOLD = 3;

const GoogleMapsRating: FC<GoogleMapsRating> = ({ rating }) => {
  const ratingRatio = (rating / 5) * 100;
  const normalizedInsetPath = `inset(${THRESHOLD + (100 - ratingRatio)}% 0 0 0)`;

  return (
    <LazyLoadFramerMotion>
      <m.div initial="initial" whileHover="hover" className="mx-auto w-fit">
        <m.svg
          className="mx-auto h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={{
            initial: { scale: 1, rotate: 0 },
            hover: { scale: [1, 1.05, 1], rotate: [0, -6, 6, -6, 0] },
          }}
        >
          <g clipPath="url(#clip0_901_3111)">
            <m.path
              initial={{
                clipPath: `inset(100% 0 0 0)`,
              }}
              animate={{
                clipPath: normalizedInsetPath,
                animationDelay: '300ms',
                transition: {
                  type: 'spring',
                  duration: 1.1,
                  bounce: 0.5,
                },
              }}
              d="M23.7627 20.1418C23.7627 20.1418 25.5627 27.4428 26.0827 29.4318C26.5727 31.3018 25.0727 31.2518 24.1527 30.6128C23.1227 29.8918 16.0027 24.8018 16.0027 24.8018C16.0027 24.8018 8.82267 29.9318 7.83267 30.6218C6.98267 31.2118 5.40267 31.3418 6.04267 29.4528C6.50267 27.8628 8.75267 20.1418 8.75267 20.1418C8.75267 20.1418 2.18267 15.3318 1.48267 14.7918C0.782673 14.2618 0.752673 12.7618 2.01267 12.6528C3.26267 12.5518 11.3427 11.8628 11.3427 11.8628C11.3427 11.8628 14.4727 3.19282 14.8927 2.04182C15.3027 0.671824 16.6627 0.641824 17.2127 2.02182C17.6627 3.14182 21.1727 11.8628 21.1727 11.8628C21.1727 11.8628 28.8027 12.5418 29.9527 12.6418C31.2127 12.7218 31.3127 14.2828 30.4927 14.9128C29.6827 15.5518 23.7627 20.1418 23.7627 20.1418Z"
              fill="#FFC44D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.2162 2.02159C17.6662 3.14259 21.1742 11.8636 21.1742 11.8636C21.1742 11.8636 28.8062 12.5426 29.9552 12.6386C31.2142 12.7186 31.3132 14.2796 30.4962 14.9146C29.6812 15.5466 23.7612 20.1406 23.7612 20.1406C23.7612 20.1406 25.5602 27.4376 26.0832 29.4256C26.5732 31.2986 25.0702 31.2486 24.1562 30.6096C23.1212 29.8886 16.0012 24.7966 16.0012 24.7966C16.0012 24.7966 8.8252 29.9276 7.8372 30.6176C6.9872 31.2086 5.4002 31.3376 6.0402 29.4536C6.5052 27.8636 8.7552 20.1406 8.7552 20.1406C8.7552 20.1406 2.1792 15.3286 1.4812 14.7916C0.7792 14.2556 0.7572 12.7596 2.0092 12.6526C3.2632 12.5466 11.3432 11.8636 11.3432 11.8636C11.3432 11.8636 14.4752 3.18959 14.8962 2.04259C15.3042 0.671592 16.6632 0.640592 17.2162 2.02159Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_901_3111">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </m.svg>

        <h1 className="mt-4 font-bold">{rating} / 5</h1>
        <h3 className="mt-2 font-semibold">Google Maps értékelésünk</h3>
      </m.div>
    </LazyLoadFramerMotion>
  );
};

export default GoogleMapsRating;
