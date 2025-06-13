const API_BASE = "/api";

export async function registerUser(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function saveSelectedPet(pet: { type: string; stage: number }, token: string) {
    const res = await fetch("/api/profile/pet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pet),
    });
    if (!res.ok) throw new Error("Failed to save pet");
    return res.json();
}

export async function getSelectedPet(token: string) {
    const res = await fetch("/api/profile/pet", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Failed to get pet");
    return res.json();
}
