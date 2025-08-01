import { useEffect, useState } from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "react-calendar-timeline/lib/Timeline.css";

interface Engineer {
  _id: string;
  name: string;
}

interface Assignment {
  _id: string;
  engineerId: Engineer;
  projectId: { _id: string; name: string };
  allocationPercentage: number;
  startDate?: string;
  endDate?: string;
}


export default function TimelineView() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [groups, setGroups] = useState<{ id: string; title: string }[]>([]);
  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {
    API.get("/assignments").then((res) => {
      const data = res.data;

      // Define engineers as groups
      const uniqueEngineers = [
        ...new Map(
        data.map((a: any) => [a.engineerId._id, a.engineerId])
        ).values(),
      ];

      setGroups(
        uniqueEngineers.map((eng) => ({
        id: (eng as any)._id,
        title: (eng as any).name,
        }))
      );


      // Map assignments to timeline items
      setItems(
        data.map((a: any) => ({
          id: a._id,
          group: a.engineerId._id,
          title: `${a.projectId.name} (${a.allocationPercentage}%)`,
          start_time: moment(a.startDate || new Date()).startOf("day"),
          end_time: moment(a.endDate || new Date()).add(7, "days").endOf("day"), // fallback 7 days
        }))
      );

      setAssignments(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Assignments Timeline</h2>
        {groups.length > 0 && items.length > 0 ? (
          <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().add(-1, "day")}
            defaultTimeEnd={moment().add(30, "day")}
            lineHeight={50}
            itemHeightRatio={0.8}
          />
        ) : (
          <p>No assignments to display</p>
        )}
      </div>
    </>
  );
}
