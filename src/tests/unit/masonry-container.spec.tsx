import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import MasonryContainer from '~/components/masonry-container';

test('should render in masonry layout', () => {
  const { container } = render(
    <MasonryContainer>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </MasonryContainer>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <div
          style="display: flex; flex-direction: row; justify-content: center; align-content: stretch; box-sizing: border-box; width: 100%; gap: 24px;"
        >
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-content: stretch; flex: 1; width: 0px; gap: 24px;"
          >
            <div>
              1
            </div>
            <div>
              4
            </div>
          </div>
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-content: stretch; flex: 1; width: 0px; gap: 24px;"
          >
            <div>
              2
            </div>
            <div>
              5
            </div>
          </div>
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-content: stretch; flex: 1; width: 0px; gap: 24px;"
          >
            <div>
              3
            </div>
            <div>
              6
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
