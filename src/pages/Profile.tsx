import React, { useState } from "react";
import "../Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "George",
    bio: "I love evolving my pet!",
    favoriteEgg: "green",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    setUser(form);
    setIsEditing(false);
  }

  function handleDelete() {
    setUser({ name: "", bio: "", favoriteEgg: "" });
    alert("Profile deleted.");
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      {!isEditing ? (
        <div className="profile-display">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
          <p>
            <strong>Favorite Egg:</strong> {user.favoriteEgg}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} className="danger">
            Delete Profile
          </button>
        </div>
      ) : (
        <div className="profile-form">
          <label>
            Name:
            <input name="name" value={form.name} onChange={handleChange} />
          </label>

          <label>
            Bio:
            <textarea name="bio" value={form.bio} onChange={handleChange} />
          </label>

          <label>
            Favorite Egg:
            <input
              name="favoriteEgg"
              value={form.favoriteEgg}
              onChange={handleChange}
            />
          </label>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)} className="secondary">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
