import KiteCard from "~/components/kite-card";
import ProductContainer from "~/components/product-container";
import { getAllKites } from "~/lib/cms";

export default async function Kites() {
  const kites = await getAllKites();

  return (
    <div className="container p-8">
      <div className="mb-8 text-center font-bold">
        <h1 className="">Sárkányok</h1>
        <h3>A vételár tartalmaz 100m eresztőzsinórt és zsinórtartót.</h3>
      </div>

      <ProductContainer>
        {kites.map((kite) => (
          <KiteCard key={kite._id} kite={kite} />
        ))}
      </ProductContainer>
    </div>
  );
}
