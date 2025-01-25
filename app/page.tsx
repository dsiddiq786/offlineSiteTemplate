'use client';

import Properties from './components/Properties/Properties';
import TotalProperties from './components/TotalProperties';

export default function Home() {
  return (
    <>
      <TotalProperties />
      <section className="py-3">
        <Properties />
      </section>
    </>
  );
}
