"use client";
import BookingHistory from "@/components/Dashboard/BookingHistory";
import Calender from "@/components/Dashboard/Calender";
import EarningChart from "@/components/Dashboard/EarningChart";
import GrowthCard from "@/components/Dashboard/GrowthCard";
import Tours from "@/components/Dashboard/Tours";
import TrafficChart from "@/components/Dashboard/TrafficChart";
import VisitorsChart from "@/components/Dashboard/VisitorsChart";
import WorldMap from "@/components/Dashboard/WorldMap";

const DashboardContainer: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <GrowthCard />
        <VisitorsChart />
        <EarningChart />
        <BookingHistory />
        <Calender />
        <TrafficChart />
        <WorldMap />
        <Tours />
      </div>
    </div>
  );
};

export default DashboardContainer;
