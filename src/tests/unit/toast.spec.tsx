import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Toast from "~/components/toast";
import type { Toast as ToastProps } from "~/lib/types";

test("Error Toast should match snapshot", () => {
  const errorToast: ToastProps = {
    id: "error-toast-test",
    type: "error",
    message: "Something terribly went wrong!",
  };

  const { container } = render(<Toast toast={errorToast} />);

  expect(container).toMatchSnapshot();
});

test("Success Toast should match snapshot", () => {
  const successToast: ToastProps = {
    id: "success-toast-test",
    type: "success",
    message: "Congrats! You are awesome!",
  };

  const { container } = render(<Toast toast={successToast} />);

  expect(container).toMatchSnapshot();
});
