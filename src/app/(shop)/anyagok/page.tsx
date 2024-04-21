import MasonryContainer from "@/components/MasonryContainer";
import ReelCard from "@/components/ReelCard";
import RodCard from "@/components/RodCard";
import TwineCard from "@/components/TwineCard";

import { SanityCategoryMap } from "@/lib/formatters";
import { getAllReels, getAllRods, getAllTwines } from "@/lib/sanity";

export default async function Materials() {
  const reels = await getAllReels();
  const rods = await getAllRods();
  const twines = await getAllTwines();

  return (
    <div className="container space-y-10 p-8">
      <h1 className="text-center font-bold">Anyagok</h1>
      <div className="space-y-8">
        {reels && reels.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold">{SanityCategoryMap["reel"]}</h2>
            <MasonryContainer>
              {reels.map((reel) => (
                <ReelCard reel={reel} key={reel._id} />
              ))}
            </MasonryContainer>
          </div>
        )}
        {twines && twines.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold">{SanityCategoryMap["twine"]}</h2>
            <MasonryContainer>
              {twines.map((twine) => (
                <TwineCard twine={twine} key={twine._id} />
              ))}
            </MasonryContainer>
          </div>
        )}
        {rods && rods.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold">{SanityCategoryMap["rod"]}</h2>
            <MasonryContainer>
              {rods.map((rod) => (
                <RodCard rod={rod} key={rod._id} />
              ))}
            </MasonryContainer>
          </div>
        )}
      </div>
    </div>
  );
}
