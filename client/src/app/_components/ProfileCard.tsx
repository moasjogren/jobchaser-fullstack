import { useState, useContext } from "react";
import { User, AuthContext } from "../_context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProfileCardProps {
  user: User;
  fetchAccount: () => Promise<void>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, fetchAccount }) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [bio, setBio] = useState<string>(user.bio || "");
  const [status, setstatus] = useState<string>(user.status);

  const params = useParams();
  const router = useRouter();
  const { logout } = useContext(AuthContext)!;

  const userId = params.userId as string;
  const token = Cookies.get("token");

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleUpdate = async () => {
    try {
      if (!token || !userId) {
        throw new Error("No session token or user ID");
      }

      const updateData = {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        status: status,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (response.ok) {
        toggleSettings();
        await fetchAccount();
      } else {
        console.error("Server error:", data);
        alert(data.error);
      }
    } catch (error) {
      console.error("Client error:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      if (!token || !userId) {
        throw new Error("No session token or user ID");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert(`${data.message}`);
        logout();
        router.push("/");
      } else {
        console.error("Server error:", data);
        alert(data.error);
      }
    } catch (error) {
      console.error("Client error:", error);
    }
  };

  return (
    <div className="profile-card">
      {!showSettings ? (
        <div className="profile-aside-top">
          <div className="profile-info">
            <img
              src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
              alt="profile-picture"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="profile-aside-text">
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              <p className="user-email">{user.email}</p>
              <p>{user.status}</p>
              <p>{user.bio}</p>
            </div>
          </div>
          <button className="profile-settings-button" onClick={toggleSettings}>
            Edit profile
          </button>
        </div>
      ) : (
        <div className="update-profile-form">
          <label>First name</label>
          <input
            type="text"
            value={firstName === null ? user.firstName : firstName}
            onChange={(e) => {
              const value = e.target.value;
              setFirstName(value);
            }}
          />
          <label>Last name</label>
          <input
            type="text"
            value={lastName === null ? user.lastName : lastName}
            onChange={(e) => {
              const value = e.target.value;
              setLastName(value);
            }}
          />
          <label>Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => {
              const value = e.target.value;
              setstatus(value);
            }}
          >
            <option value={"Unknown"}>Unknown</option>
            <option value={"Searching"}>Searching</option>
            <option value={"Employed"}>Employed</option>
            <option value={"Student"}>Student</option>
          </select>

          <label>Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio === "" ? user.bio : bio}
            onChange={(e) => {
              const value = e.target.value;
              setBio(value);
            }}
          ></textarea>
          <div className="save-cancel-buttons">
            <button className="save-button" onClick={handleUpdate}>
              Save
            </button>
            <button className="cancel-button" onClick={toggleSettings}>
              Cancel
            </button>
          </div>
          <button className="delete-account-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
