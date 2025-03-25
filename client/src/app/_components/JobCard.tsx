"use client";
import { useEffect, useState, useContext } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export interface Job {
  id: number;
  company: string;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string;
}

function JobCard({
  id,
  company,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
}: Job) {
  const formattedPostedAt = postedAt.toString().split("T")[0];
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const user: string | undefined = Cookies.get("user");
  let parsedUser;
  let userId: string;

  if (user) {
    parsedUser = JSON.parse(user);
    userId = parsedUser.id;
  }

  useEffect(() => {
    const checkIfSaved = async () => {
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
        if (response.ok) {
          const data = await response.json();
          const savedJobIds = data.savedJobs.map((job: { jobId: number }) => job.jobId);
          if (savedJobIds.includes(id)) {
            setIsSaved(true);
          }
        } else {
          console.error("Response not ok", response.status);
        }
      } catch (error) {
        console.error("Error fetching saved jobs", error);
      }
    };
    checkIfSaved();
  }, [id]);

  const handleSaveJob = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/sign-in");
    }

    if (!isSaved) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/savedJob`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: id,
            userId: userId,
          }),
        });

        if (response.ok) {
          setIsSaved(true);
        } else {
          console.error("Failed to save job as favorite", response.status);
        }
      } catch (error) {
        console.error("Error saving job as favorite", error);
      }
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/savedJob`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: id,
            userId: userId,
          }),
        });

        if (response.ok) {
          setIsSaved(false);
        } else {
          console.error("Failed to remove job from favorites", response.status);
        }
      } catch (error) {
        console.error("Error removing job from favorites", error);
      }
    }
  };

  return (
    <div className="job" id={id.toString()}>
      <div className="job-top">
        <div className="job-top-text">
          <h4 className="company">{company}</h4>
          <h4 className="position">{position}</h4>
        </div>
        <IconContext.Provider value={{ size: "1.1rem" }}>
          <button className="save-job-button" onClick={handleSaveJob}>
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </IconContext.Provider>
      </div>
      <div className="job-subtext">
        <p>{`${role} | ${level} | ${contract}`}</p>
      </div>
      <div className="job-bottom">
        <p>{`📍${location}. Language: ${languages}. Posted: ${formattedPostedAt}.`}</p>
      </div>
    </div>
  );
}

export default JobCard;
