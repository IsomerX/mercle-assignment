import Head from "next/head";
import EngagementHelper from "~/utils/engagementHelper";
import MessageCountList from "~/data/messageCountList";
import Channels from "~/data/channels";
import { useCallback, useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export default function Home() {
  const options = useCallback(
    () =>
      EngagementHelper.engagementMessageOverTimeChartOptions(
        MessageCountList,
        Channels
      ),
    []
  )();
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.chart.reflow();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [shouldRender, doRender] = useState(true);
  useEffect(() => {
    if (shouldRender) {
      // this stops the cycle after the first re-render
      doRender(!shouldRender);
    }
  }, [shouldRender]);

  return (
    <>
      <Head>
        <title>Mercle Assignment</title>
        <meta name="description" content="Built By Dhruv Bakshi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#22222c] text-white">
        <h1 className="py-10 font-mono text-4xl font-bold">
          Dhruv Bakshi Submission
        </h1>
        <HighchartsReact
          containerProps={{ style: { width: "100%" } }}
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </main>
    </>
  );
}
