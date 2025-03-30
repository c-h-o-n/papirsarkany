import { expect, test } from "vitest";
import {
  getFoxpostPackageSize,
  getTotalPackageInfo,
  isFitInMaxLimit,
} from "~/lib/foxpost";
import type { PackageInfo } from "~/lib/types";
import { kiteMock } from "~/mocks/product.mock";

test("isFitInMaxLimit should return as expected", () => {
  const largestPackageFit: PackageInfo = {
    x: 60,
    y: 36,
    z: 61,
    weight: 25000,
  };

  const overWeightPackage: PackageInfo = {
    x: 1,
    y: 2,
    z: 3,
    weight: 25500,
  };

  const overSizedPackage: PackageInfo = {
    x: 61,
    y: 36,
    z: 61,
    weight: 25000,
  };

  expect(isFitInMaxLimit(largestPackageFit)).toBe(true);
  expect(isFitInMaxLimit(overWeightPackage)).toBe(false);
  expect(isFitInMaxLimit(overSizedPackage)).toBe(false);
});

test("getFoxpostPackageSize should match package constraints", () => {
  const packageFitsXS: PackageInfo = {
    x: 1,
    y: 33,
    z: 53,
    weight: 5000,
  };

  const packageFitsXL: PackageInfo = {
    x: 60,
    y: 36,
    z: 61,
    weight: 25000,
  };

  const overWeightPackage: PackageInfo = {
    x: 61,
    y: 36,
    z: 61,
    weight: 25001,
  };

  expect(getFoxpostPackageSize(packageFitsXS)).toBe("XS");
  expect(getFoxpostPackageSize(packageFitsXL)).toBe("XL");
  expect(getFoxpostPackageSize(overWeightPackage)).toBe(false);
});

test("getTotalPackageInfo should return aggregated package info", () => {
  const cart = [{ ...kiteMock, quantity: 3 }];

  expect(getTotalPackageInfo(cart)).toEqual({
    x: 3,
    y: 3,
    z: 3,
    weight: 3,
  });
});
