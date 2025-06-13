const API_BASE = "/api";

// Register
export async function registerUser(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

// Login
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

// Save pet + xp
export async function savePetData(
    pet: { type: string; stage: number },
    xp: number,
    token: string
) {
    const res = await fetch(`${API_BASE}/pet/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pet, xp }),
    });
    if (!res.ok) throw new Error("Failed to save pet");
    return res.json();
}


export async function loadPetData(token: string): Promise<{
    pet: { type: string; stage: number } | null;
    xp: number;
}> {
    const res = await fetch(`${API_BASE}/pet/load`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Failed to load pet");
    return res.json();
}

export async function getProfile(token: string) {
    const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to load profile");
    return res.json();
}

export async function updateProfile(profile: { name: string; bio: string; favoriteEgg: string }, token: string) {
    const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error("Failed to update profile");
}

export async function deleteProfile(token: string) {
    const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Failed to delete profile");
}

