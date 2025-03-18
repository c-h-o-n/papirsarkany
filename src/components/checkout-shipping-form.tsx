"use client";

import { AnimatePresence, m } from "motion/react";
import { type FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FOXPOST_PACKAGE_MAX_LIMIT,
  FOXPOST_SHIPPING_FEE,
  LOCAL_PICKUP_ADDRESS,
} from "~/lib/constants";
import { parsePhoneNumber } from "~/lib/formatters";
import { getTotalPackageInfo, isFitInMaxLimit } from "~/lib/foxpost";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";
import FormattedPhoneNumberInput from "./formatted-phone-number-input";
import FoxpostMap from "./foxpost-map";
import LazyLoadFramerMotion from "./lazy-load-framer-motion";
import ShippingOptionRadioInput from "./shipping-option-radio-input";

const CheckoutShippingForm: FC = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<OrderForm>();
  const cart = useCartStore((state) => state.cart);

  const [isShowFoxpostMap, setIsShowFoxpostMap] = useState(false);

  const totalPackageSize = useMemo(() => getTotalPackageInfo(cart), [cart]);

  const isFitInFoxpostLimit = isFitInMaxLimit(totalPackageSize);

  const onPersonalPickupOptionClick = () => {
    if (getValues("shippingOption") === "Személyes átvétel") {
      return;
    }

    setValue("shippingPostcode", LOCAL_PICKUP_ADDRESS.shippingPostcode);
    setValue("shippingCity", LOCAL_PICKUP_ADDRESS.shippingCity);
    setValue("shippingAddress", LOCAL_PICKUP_ADDRESS.shippingAddress);

    trigger(["shippingPostcode", "shippingCity", "shippingAddress"]);
  };

  const onFoxpostOptionClick = () => {
    if (getValues("shippingOption") === "Foxpost automatába") {
      return;
    }

    setValue("shippingPostcode", "");
    setValue("shippingCity", "");
    setValue("shippingAddress", "");

    setIsShowFoxpostMap(true);
  };

  const onPostOptionClick = () => {
    if (getValues("shippingOption") === "Postai szállítás") {
      return;
    }

    setValue("shippingPostcode", "");
    setValue("shippingCity", "");
    setValue("shippingAddress", "");
  };

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-sm">
          <h2 className="underline underline-offset-8">Elérhetőség</h2>
          <label className="d-form-control">
            <div className="d-label">
              <span className="d-label-text text-lg">Email</span>
            </div>
            <input
              type="text"
              placeholder={"mail.papirsarkany@gmail.com"}
              className="d-input d-input-bordered"
              {...register("email")}
            />
            <div className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.email?.message}
              </span>
            </div>
          </label>
          <div className="gap-4 sm:grid sm:grid-cols-2">
            <label className="d-form-control">
              <div className="d-label">
                <span className="d-label-text text-lg">Vezetéknév</span>
              </div>
              <input
                type="text"
                className="d-input d-input-bordered"
                {...register("lastName")}
              />
              <div className="d-label">
                <span className="d-label-text-alt text-error">
                  {errors.lastName?.message}
                </span>
              </div>
            </label>
            <label className="d-form-control">
              <div className="d-label">
                <span className="d-label-text text-lg">Keresztnév</span>
              </div>
              <input
                type="text"
                className="d-input d-input-bordered"
                {...register("firstName")}
              />
              <div className="d-label">
                <span className="d-label-text-alt text-error">
                  {errors.firstName?.message}
                </span>
              </div>
            </label>
          </div>
          <label className="d-form-control">
            <div className="d-label">
              <span className="d-label-text text-lg">Telefonszám</span>
            </div>
            <FormattedPhoneNumberInput
              {...register("phoneNumber", {
                setValueAs: (value: string) => parsePhoneNumber(value),
              })}
            />
            <div className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.phoneNumber?.message}
              </span>
            </div>
          </label>
          <h2 className="underline underline-offset-8">Szállítás</h2>
          <ShippingOptionRadioInput
            label={"Személyes átvétel"}
            onClick={onPersonalPickupOptionClick}
            value="Személyes átvétel"
          />
          <ShippingOptionRadioInput
            label={
              <>
                <div className="text-foxpost-red">Foxpost automatába </div>
                {!isFitInFoxpostLimit && (
                  <div className="font-normal text-sm sm:text-lg">
                    {`maximum ${FOXPOST_PACKAGE_MAX_LIMIT.weight}kg és (${FOXPOST_PACKAGE_MAX_LIMIT.x}x${FOXPOST_PACKAGE_MAX_LIMIT.y}x${FOXPOST_PACKAGE_MAX_LIMIT.z}cm-ig)`}
                  </div>
                )}
              </>
            }
            shippingFee={FOXPOST_SHIPPING_FEE}
            onClick={onFoxpostOptionClick}
            value="Foxpost automatába"
            isDisabled={!isFitInFoxpostLimit}
          />
        </div>
        <LazyLoadFramerMotion>
          <AnimatePresence>
            {watch("shippingOption") === "Foxpost automatába" &&
              isShowFoxpostMap && (
                <m.div
                  initial={{
                    scaleY: 0,
                    transformOrigin: "top",
                  }}
                  animate={{
                    scaleY: 1,
                  }}
                  exit={{
                    scaleY: 0,
                    opacity: 0,
                    transitionTimingFunction: "ease-in",
                  }}
                >
                  <FoxpostMap hideMap={() => setIsShowFoxpostMap(false)} />
                </m.div>
              )}
          </AnimatePresence>
        </LazyLoadFramerMotion>
        <div className="mx-auto max-w-screen-sm">
          <ShippingOptionRadioInput
            label="Postai szállítás"
            value="Postai szállítás"
            onClick={onPostOptionClick}
            shippingFee={"szállítási költség"}
          />
          <span className="text-error">{errors.shippingOption?.message}</span>
          {watch("shippingOption") === "Postai szállítás" && (
            <>
              <label className="d-form-control">
                <div className="d-label">
                  <span className="d-label-text text-lg">Irányítószám</span>
                </div>
                <input
                  type="text"
                  className="d-input d-input-bordered"
                  {...register("shippingPostcode")}
                />
                <div className="d-label">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingPostcode?.message}
                  </span>
                </div>
              </label>
              <label className="d-form-control">
                <div className="d-label">
                  <span className="d-label-text text-lg">Város</span>
                </div>
                <input
                  type="text"
                  className="d-input d-input-bordered"
                  {...register("shippingCity")}
                />
                <div className="d-label">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingCity?.message}
                  </span>
                </div>
              </label>
              <label className="d-form-control">
                <div className="d-label">
                  <span className="d-label-text text-lg">Cím</span>
                </div>
                <input
                  type="text"
                  placeholder="Utca, házszám"
                  className="d-input d-input-bordered"
                  {...register("shippingAddress")}
                />
                <div className="d-label">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingAddress?.message}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Emelet, ajtó, egyéb (opcionális)"
                  className="d-input d-input-bordered"
                  {...register("shippingSubaddress")}
                />
                <div className="d-label">
                  <span className="d-label-text-alt text-error">
                    {errors.shippingSubaddress?.message}
                  </span>
                </div>
              </label>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-screen-sm">
        <div className="flex justify-end">
          <button
            type="submit"
            className="d-btn d-btn-primary d-btn-block uppercase sm:w-auto"
          >
            Tovább
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutShippingForm;
