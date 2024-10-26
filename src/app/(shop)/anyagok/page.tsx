import MasonryContainer from '~/components/masonry-container';
import ReelCard from '~/components/reel-card';
import RodCard from '~/components/rod-card';
import TwineCard from '~/components/twine-card';

import { getAllReels, getAllRods, getAllTwines } from '~/lib/cms';
import { sanityProductCategoryTitleMap } from '~/lib/formatters';

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
            <h2 className="font-bold">
              {sanityProductCategoryTitleMap['reel']}
            </h2>
            <MasonryContainer>
              {reels.map((reel) => (
                <ReelCard reel={reel} key={reel._id} />
              ))}
            </MasonryContainer>
          </div>
        )}
        {twines && twines.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold">
              {sanityProductCategoryTitleMap['twine']}
            </h2>
            <MasonryContainer>
              {twines.map((twine) => (
                <TwineCard twine={twine} key={twine._id} />
              ))}
            </MasonryContainer>
          </div>
        )}
        {rods && rods.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold">
              {sanityProductCategoryTitleMap['rod']}
            </h2>
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
