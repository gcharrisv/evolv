import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../Profile.css";

function Profile() {
    const { token } = useAuth();
    const [user, setUser] = useState({ name: "", bio: "", favoriteEgg: "" });
    const [form, setForm] = useState({ name: "", bio: "", favoriteEgg: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            if (!token) return;
            const res = await fetch("/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setUser(data);
            setForm(data);
        }
        fetchProfile();
    }, [token]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        if (!token) return;
        await fetch("/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        setUser(form);
        setIsEditing(false);
    }

    async function handleDelete() {
        if (!token) return;
        const confirmed = confirm("Are you sure you want to delete your profile?");
        if (!confirmed) return;

        await fetch("/api/profile", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setIsDeleted(true);
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
                    <p><strong>Name:</strong> {user.name || "N/A"}</p>
                    <p><strong>Bio:</strong> {user.bio || "N/A"}</p>
                    <p><strong>Favorite Egg:</strong> {user.favoriteEgg || "N/A"}</p>

                    <div className="button-group">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete} className="danger">Delete Profile</button>
                    </div>
                </div>
            ) : (
                <div className="profile-form">
                    <label>Name:
                        <input name="name" value={form.name} onChange={handleChange} />
                    </label>
                    <label>Bio:
                        <textarea name="bio" value={form.bio} onChange={handleChange} />
                    </label>
                    <label>Favorite Egg:
                        <input name="favoriteEgg" value={form.favoriteEgg} onChange={handleChange} />
                    </label>
                    <div className="button-group">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)} className="secondary">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
