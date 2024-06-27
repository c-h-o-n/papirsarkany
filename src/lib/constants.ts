import { FoxpostPackageInfoCategoryConstraints } from './foxpost-package-size';

export const MISSING_IMG_URL = '/missing-image.svg';

export const NO_NAME = 'hiányzó név';

export const LOCAL_PICKUP_ADDRESS = {
  shippingPostcode: '2094',
  shippingCity: 'Nagykovácsi',
  shippingAddress: 'Kazal utca 6.',
} as const;

export const FOXPOST_PACKAGE_CONSTRAINST =
  [
    { x: 5, y: 33, z: 53, weight: 5, category: 'XS' },
    { x: 11.5, y: 36, z: 61, weight: 15, category: 'S' },
    { x: 19.5, y: 36, z: 61, weight: 25, category: 'M' },
    { x: 37.5, y: 36, z: 61, weight: 25, category: 'L' },
    { x: 60, y: 36, z: 61, weight: 25, category: 'XL' },
  ] as const satisfies readonly FoxpostPackageInfoCategoryConstraints[];

export const FOXPOST_PACKAGE_HANDLING_FEES = [
  {
    range: [5, 10000],
    fee: 150,
    feeType: 'flat',
  },
  {
    range: [10001, 300000],
    fee: 1.2,
    feeType: 'percentage',
  },
] as const;
