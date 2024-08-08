import React, { useEffect, useState, Suspense } from "react";
import { useQuery } from 'react-query';
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
const AdContainer = React.lazy(() => import("../components/container/AdContainer"));
import useKellerCall from "../hooks/useKellerCall";
import '../index.css';

const Home = () => {
  const title = "Kaufen und verkaufen Sie alles...";
  const { getLatestAds, getPopularAds, getMostViewedAds } = useKellerCall();

  const { data: latestAds, isLoading: isLoadingLatest } = useQuery('latestAds', () => getLatestAds(10));
  const { data: popularAds, isLoading: isLoadingPopular } = useQuery('popularAds', () => getPopularAds(10));
  const { data: mostViewedAds, isLoading: isLoadingMostViewed } = useQuery('mostViewedAds', () => getMostViewedAds(10));

  return (
    <div>
      <Banner title={title} />
      <div className="main-container">
        <CategoryIconCard />
        <Suspense fallback={<div>Loading...</div>}>
          {!isLoadingLatest && <AdContainer title={"Neueste"} ads={latestAds} />}
          {!isLoadingPopular && <AdContainer title={"Beliebte"} ads={popularAds} />}
          {!isLoadingMostViewed && <AdContainer title={"Meistgesehene"} ads={mostViewedAds} />}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
