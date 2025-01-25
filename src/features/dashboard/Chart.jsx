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
import { Spinner } from "react-bootstrap";

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
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const makeChartData = async (ids) => {
      setIsPending(true);
      let tempData = []; // آرایه موقت برای جمع‌آوری داده‌ها

      for (const id of ids) {
        const res = await fetch(url + "i=" + id);
        const data = await res.json();

        const genres = data.Genre.split(",");
        genres.forEach((genre) => {
          genre = genre.trim();
          const existing = tempData.find((item) => item.genre === genre);
          if (existing) {
            existing.count += 1; // افزایش شمارش در صورت وجود
          } else {
            tempData.push({ genre, count: 1 }); // اضافه کردن ژانر جدید
          }
        });
      }

      // مرتب کردن و محدود کردن به 10 آیتم
      tempData.sort((a, b) => b.count - a.count);
      setData(tempData.slice(0, 10)); // به‌روزرسانی state تنها یک بار
      setIsPending(false);
    };

    if (lists) {
      const allIds = lists.flatMap((list) => list.imdbID); // جمع‌آوری تمام IDها
      makeChartData(allIds);
    }
  }, [lists, isLoading]);

  return (
    <Box className="bg-focus custom-rounded-lg pt-2">
      <div className="fs-4 text-center">Most Ganre you use in Lists</div>
      <div className="custom-centerize h-100 ">
        {isPending ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    </Box>
  );
}
