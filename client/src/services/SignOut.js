const signOut = async () => {
  try {
    const response = await fetch("http://localhost:6001/api/signout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Sign out failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export default signOut;
