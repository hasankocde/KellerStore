// Home.jsx
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import AdContainer from "../components/container/AdContainer";
import useKellerCall from "../hooks/useKellerCall";
import { useSelector } from "react-redux";
import '../index.css';

const Home = () => {
  const title = "Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Computern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr";
  const { getLatestAds, getPopularAds, getMostViewedAds } = useKellerCall();
  const [sortedAds, setSortedAds] = useState({
    latest: [],
    popular: [],
    mostViewed: [],
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const latest = await getLatestAds(10);
        const popular = await getPopularAds(10);
        const mostViewed = await getMostViewedAds(10);
        setSortedAds({
          latest,
          popular,
          mostViewed,
        });
      } catch (error) {
        console.error('Error fetching ads:', error);
        // Handle error appropriately, e.g. show error message to user
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      <Banner title={title} />
      <div className="main-container">
        <CategoryIconCard />
        <AdContainer title={"Neueste"} ads={sortedAds.latest} />
        <AdContainer title={"Beliebte"} ads={sortedAds.popular} />
        <AdContainer title={"Meistgesehene"} ads={sortedAds.mostViewed} />
      </div>
    </div>
  );
};

export default Home;
