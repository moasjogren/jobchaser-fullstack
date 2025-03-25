"use client";
import { useEffect, useState } from "react";
import JobCard, { Job } from "./JobCard";
import Result from "./Results";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface JobListProps {
  filter?: string;
  category?: string | null;
  savedJobIds?: number[];
  showResult: boolean;
}

export const JobList = ({ filter, category, savedJobIds, showResult }: JobListProps) => {
  const [jobData, setJobData] = useState<Job[] | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/sign-in");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobData(data.jobs);
        } else {
          console.error("Response not ok joblist", response.status);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!jobData) {
      return;
    }

    let newFilteredJobs = jobData;

    if (savedJobIds) {
      newFilteredJobs = newFilteredJobs.filter((item) => savedJobIds.includes(item.id));
    } else {
      newFilteredJobs = jobData.filter((item) => {
        const stringData = [
          item.company,
          item.position,
          item.role,
          item.level,
          item.contract,
          item.location,
          item.postedAt,
          item.languages,
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch = stringData.includes(filter ?? "");
        const matchesCategory = category ? item.role === category : true;
        return matchesSearch && matchesCategory;
      });
    }

    setFilteredJobs(newFilteredJobs);
  }, [jobData, filter, category, savedJobIds]);

  return (
    <>
      {showResult ? <Result number={filteredJobs.length} /> : ""}
      <ul className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((item: Job) => (
            <li key={item.id}>
              <JobCard {...item} />
            </li>
          ))
        ) : (
          <p className="no-avail">Nothing to show.</p>
        )}
      </ul>
    </>
  );
};
