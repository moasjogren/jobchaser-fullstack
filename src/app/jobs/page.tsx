"use client";
import { JobList } from "../_components/Joblist";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSearchQuery, setCategory } from "@/lib/jobSearchSlice";

const Jobs = () => {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector((state) => state.jobSearch.searchQuery);
  const selectedCategory = useAppSelector((state) => state.jobSearch.category);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value.toLowerCase()));
  };

  const categoryHandler = (category: string | null) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="jobs-page">
      <div className="searchbar">
        <input type="text" placeholder="Search..." onChange={inputHandler} />
      </div>
      <div className="category-buttons">
        <button
          onClick={() => categoryHandler(null)}
          className={selectedCategory === null ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => categoryHandler("Frontend")}
          className={selectedCategory === "Frontend" ? "active" : ""}
        >
          Frontend
        </button>
        <button
          onClick={() => categoryHandler("Backend")}
          className={selectedCategory === "Backend" ? "active" : ""}
        >
          Backend
        </button>
        <button
          onClick={() => categoryHandler("Fullstack")}
          className={selectedCategory === "Fullstack" ? "active" : ""}
        >
          Fullstack
        </button>
      </div>

      <JobList filter={inputText} category={selectedCategory} showResult={true} />
    </div>
  );
};

export default Jobs;
