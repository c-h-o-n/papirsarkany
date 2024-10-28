import { render } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';

import Navbar from '~/components/navbar';
import twConfig from '~/lib/tailwind-theme.preval';
import { viMockMatchMedia } from '~/mocks/matchMedia.mock';

const mediaQueries = {
  desktop: `(min-width: ${twConfig.screens.md})`,
};

afterEach(() => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });
});

test(`should render desktop-navbar on screens larger then ${twConfig.screens.md}`, () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: true,
  });

  const { container } = render(<Navbar />);

  expect(container).toMatchSnapshot();
});

test(`should render mobile-navbar on screens smaller then ${twConfig.screens.md}`, () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });
  const { container } = render(<Navbar />);
  expect(container).toMatchSnapshot();
});
