import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import ProductContainer from "~/components/product-container";

test("should render in product layout", () => {
  const { container } = render(
    <ProductContainer>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ProductContainer>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
        <div>
          4
        </div>
        <div>
          5
        </div>
        <div>
          6
        </div>
      </div>
    </div>
  `);
});
