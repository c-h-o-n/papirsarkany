import Splash from '@/components/Splash';
import AboutBusinessSection from '@/components/AboutBusinessSection';
import CraftingSection from '@/components/CraftingSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div>
      {/* <Splash /> */}

      <div className="container mx-auto">
        <AboutBusinessSection />
        <CraftingSection />
        <ContactSection />
      </div>

      
    </div>
  );
}
