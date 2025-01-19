import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { useGetListsByProfileId } from "../lists/useList";
import { useSelector } from "react-redux";
import { url } from "../../assets/variables";

// const data = [
//   {
//     genre: "Comedy",
//     count: 120,
//   },
//   {
//     genre: "Drama",
//     count: 98,
//   },
//   {
//     genre: "Sports",
//     count: 86,
//   },
//   {
//     genre: "War",
//     count: 99,
//   },
//   {
//     genre: "Musical",
//     count: 85,
//   },
//   {
//     genre: "Family",
//     count: 133,
//   },
//   {
//     genre: "History",
//     count: 102,
//   },
//   {
//     genre: "Western",
//     count: 100,
//   },
// ];

const Box = styled.div`
  height: 400px;
  font-size: 0.8rem;
`;

export default function Chart() {
  const profileId = useSelector((s) => s.profile.profileId);
  const { lists, isLoading } = useGetListsByProfileId({ profileId });
  const [data, setData] = useState([]);

  useEffect(() => {
    const makeChartData = (id) => {
      setData([]);

      fetch(url + "i=" + id)
        .then((res) => res.json())
        .then((data) =>
          setData((chart) => {
            let tmp = data.Genre.split(",");
            let newData = tmp.reduce(
              (acc, cur) => {
                let genre = cur.trim();
                let existing = acc.find((item) => item.genre === genre);
                if (existing) {
                  existing.count += 1; // افزایش شمارش در صورت وجود
                } else {
                  acc.push({ genre, count: 1 }); // اضافه کردن ژانر جدید
                }
                return acc;
              },
              [...chart]
            ); // آرایه اولیه از `chart` است
            newData.sort((a, b) => b.count - a.count);
            return newData; // بازگرداندن آرایه به‌روزرسانی‌شده
          })
        );
    };

    if (lists) {
      lists.map((list) => {
        list.imdbID.map((id) => {
          makeChartData(id);
        });
      });
    }
  }, [lists, isLoading]);
  return (
    <Box className="bg-focus custom-rounded-lg pt-2">
      <div className="fs-4 text-center">Most Ganre you use in Lists</div>
      <div className="custom-centerize h-100 ">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={data.slice(0, 10)}
          >
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
