import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import Footer from "~/components/footer";

test("should match snapshot", () => {
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
