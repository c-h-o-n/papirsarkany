import {
  FOXPOST_PACKAGE_CONSTRAINST,
  FOXPOST_PACKAGE_HANDLING_FEES,
} from './constants';
import { CartItem } from './types';

export type PackageInfoCategory = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type PackageInfo = {
  x: number;
  y: number;
  z: number;
  /**
   * weight in grams
   */
  weight: number;
};

export type FoxpostPackageInfoCategoryConstraints = PackageInfo & {
  category: PackageInfoCategory;
};

export const packageMaxLimit =
  FOXPOST_PACKAGE_CONSTRAINST[FOXPOST_PACKAGE_CONSTRAINST.length - 1];

export function isFitInMaxLimit(packageInfo: PackageInfo): boolean {
  const { x: cx, y: cy, z: cz } = packageMaxLimit;
  return (
    packageInfo.weight <= 25 * 1000 &&
    packageInfo.x <= cx &&
    packageInfo.y <= cy &&
    packageInfo.z <= cz
  );
}

export function getFoxpostPackageSizeCategory(
  packageInfo: PackageInfo,
): PackageInfoCategory | false {
  if (!isFitInMaxLimit(packageInfo)) {
    return false;
  }

  return (
    FOXPOST_PACKAGE_CONSTRAINST.find((constraint) => {
      const { x: cx, y: cy, z: cz } = constraint;
      return (
        packageInfo.weight <= constraint.weight &&
        packageInfo.x <= cx &&
        packageInfo.y <= cy &&
        packageInfo.z <= cz
      );
    })?.category || 'M'
  );
}

export function getTotalPackageInfo(cart: CartItem[]): PackageInfo {
  return cart.reduce(
    (total, current) => {
      return {
        x: total.x + current.packageInfo.x * current.quantity,
        y: total.y + current.packageInfo.y * current.quantity,
        z: total.z + current.packageInfo.z * current.quantity,
        weight: total.weight + current.packageInfo.weight * current.quantity,
      };
    },
    { x: 0, y: 0, z: 0, weight: 0 },
  );
}

export function getHandlingFee(amount: number) {
  const feeInfo = FOXPOST_PACKAGE_HANDLING_FEES.find(
    (fee) => amount >= fee.priceRange[0] && amount <= fee.priceRange[1],
  );

  if (feeInfo) {
    return feeInfo.feeType === 'flat'
      ? feeInfo.fee
      : (feeInfo.fee / 100) * amount;
  }

  return null;
}
