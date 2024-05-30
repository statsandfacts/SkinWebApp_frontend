import {
  HeroSection,
  Section2,
  Results,
  Review,
} from '@/components/Home/index';

export default function Home() {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center w-full max-md:max-w-full'>
          <HeroSection />
          <Section2 />
          <Results />
          <Review />
        </div>
      </div>
    </>
  );
}
