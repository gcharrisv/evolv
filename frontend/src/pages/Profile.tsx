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
    const [isDeleted, setIsDeleted] = useState(false);

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
        if (confirm("Are you sure you want to delete your profile?")) {
            setUser({ name: "", bio: "", favoriteEgg: "" });
            setIsDeleted(true);
        }
    }

    if (isDeleted) {
        return (
            <div className="profile-container fade-in">
                <h1>Profile Deleted</h1>
                <p>You can refresh the page to start over.</p>
            </div>
        );
    }

    return (
        <div className="profile-container fade-in">
            <h1>Your Profile</h1>

            {!isEditing ? (
                <div className="profile-display">
                    <p>
                        <strong>Name:</strong> {user.name || "N/A"}
                    </p>
                    <p>
                        <strong>Bio:</strong> {user.bio || "N/A"}
                    </p>
                    <p>
                        <strong>Favorite Egg:</strong> {user.favoriteEgg || "N/A"}
                    </p>

                    <div className="button-group">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete} className="danger">
                            Delete Profile
                        </button>
                    </div>
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

                    <div className="button-group">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)} className="secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;