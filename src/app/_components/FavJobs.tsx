"use client";
import { JobList } from "./Joblist";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const SavedJobs = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchsavedJobs = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/sign-in");
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/savedJobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setSavedJobIds([]);

        if (response.ok) {
          const data = await response.json();
          const jobIds = data.savedJobs.map((savedJob: { jobId: number }) => savedJob.jobId);
          setSavedJobIds(jobIds);
        } else {
          console.error("Error", response.status);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchsavedJobs();
  }, [userId]);

  return (
    <div className="saved-jobs-container">
      {<JobList savedJobIds={savedJobIds} showResult={false} />}
    </div>
  );
};
