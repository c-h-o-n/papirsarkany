import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import Card from "~/components/card";

test("should match snapshot", () => {
  const { container } = render(<Card>Card children</Card>);

  expect(container).toMatchSnapshot();
});
