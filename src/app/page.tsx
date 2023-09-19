import Splash from '@/components/Splash';
import AboutBusinessSection from '@/components/AboutBusinessSection';

export default function Home() {
  return (
    <div>
      <Splash />

      <div className="container mx-auto">
        <AboutBusinessSection />
        <section>CartingSection</section>
        <section>ContactSection</section>
      </div>
    </div>
  );
}
