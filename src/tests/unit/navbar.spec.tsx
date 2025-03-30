import { render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Navbar from "~/components/navbar";
import { viMockMatchMedia } from "~/mocks/matchMedia.mock";

const mediaQueries = {
  desktop: `(min-width: "var(--breakpoint-md)")`,
};

afterEach(() => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });
});

test("should render desktop-navbar on screens larger then md breakpoint", () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: true,
  });

  const { container } = render(<Navbar />);

  expect(container).toMatchSnapshot();
});

test("should render mobile-navbar on screens smaller then md breakpoint", () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });
  const { container } = render(<Navbar />);
  expect(container).toMatchSnapshot();
});
