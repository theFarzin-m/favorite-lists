import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const data = [
  {
    genre: "Comedy",
    count: 120,
  },
  {
    genre: "Drama",
    count: 98,
  },
  {
    genre: "Sports",
    count: 86,
  },
  {
    genre: "War",
    count: 99,
  },
  {
    genre: "Musical",
    count: 85,
  },
  {
    genre: "Family",
    count: 133,
  },
  {
    genre: "History",
    count: 102,
  },
  {
    genre: "Western",
    count: 100,
  },
];

const Box = styled.div`
    height: 400px;
    font-size: 0.8rem;
`

export default function Chart() {

    return (
      <Box className="bg-focus custom-rounded-lg pt-2">
        <div className="fs-4 text-center">Most Ganre you use in Lists</div>
        <div className="custom-centerize h-100 ">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="genre" />
              <PolarRadiusAxis />
              <Radar
                dataKey="count"
                stroke="#892cdc"
                fill="#bc6ff1"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    );
}
