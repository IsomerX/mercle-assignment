import { type MessageCountList } from "~/data/messageCountList";
import { type Channels } from "~/data/channels";
import { useEffect, useState } from "react";

type EngagementMessageOverTimeChartOptionsOutput = {
  [date: string]: {
    total: number;
    messages: {
      channelId: string;
      count: number;
      label: string;
    }[];
  };
};

const colors = {
  chart: "#22222c",
  axis: "#16c3c5",
  series: "#16c3c5",
  axisLine: "#16c3c552",
};

const engagementMessageOverTimeChartOptions = (
  messageCountList: MessageCountList,
  channels: Channels
) => {
  const output: EngagementMessageOverTimeChartOptionsOutput = {};
  messageCountList.forEach((messageCount) => {
    const date = messageCount.timeBucket.split("T")[0] as keyof typeof output;
    if (!output[date]) {
      output[date] = {
        total: 0,
        messages: [],
      };
    }
    output[date]!.total += parseInt(messageCount.count);
    output[date]?.messages.push({
      channelId: messageCount.channelId,
      count: parseInt(messageCount.count),
      label:
        channels.find((channel) => channel.id === messageCount.channelId)
          ?.label || "undefined",
    });
  });
  return {
    chart: {
      backgroundColor: colors.chart,
    },
    tooltip: {
      formatter: function (): string {
        return `${this?.y} ${this.y > 1 ? "messages" : "message"} on ${
          this?.x
        }`;
      },
    },
    yAxis: {
      gridLineWidth: 0,
      labels: {
        style: {
          color: "#16c3c5",
        },
        align: "center",
      },
      lineColor: colors.axisLine,
      tickColor: colors.axisLine,
      tickWidth: 1,
      title: {
        text: "Engagement",
        style: {
          color: colors.axis,
        },
      },
    },
    xAxis: {
      categories: Object.keys(output).map((date) =>
        new Date(date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })
      ),
      labels: {
        style: {
          color: colors.axis,
        },
      },
      lineColor: colors.axisLine,
      tickColor: colors.axisLine, // Set the color of the tick marks
      tickWidth: 1,
      tickmarkPlacement: "on",
    },
    series: {
      data: Object.values(output).map((value) => {
        return value.total;
      }),
      color: colors.axisLine,
      name: "Total Messages",
    },
    title: {
      text: "Engagement Over Time",
      style: {
        color: colors.axis,
      },
    },
    legend: {
      itemStyle: {
        color: "#FFFFFF", // Set the text color of Series 1
      },
    },
  };
  // return output;
};

const EngagementHelper = {
  engagementMessageOverTimeChartOptions,
};

export default EngagementHelper;
