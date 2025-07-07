function getPermission(role: "admin" | "manager" | null) {
  if (role === "admin") {
    return {
      manager: true,
      admin: true,
    };
  } else if (role === "manager") {
    return {
      manager: true,
      admin: false,
    };
  }

  // Default case, no permissions
  return {
    manager: false,
    admin: false,
  };
}

/**
 * This functions is a mock if the Kinde Auth API.
 * It simulates the behavior of fetching permissions and users as described in the original code.
 */
export function getKindeAuthAPI() {
  return {
    getPermission: (role: "admin" | "manager" | null) => getPermission(role),
    getUsers: () => {
      return [
        { id: 1, name: "John", email: "john.doe@example.com" },
        { id: 2, name: "Jane", email: "jane.smith@example.com" },
        { id: 3, name: "Alice", email: "alice.johnson@example.com" },
        { id: 4, name: "Bob", email: "bob.brown@example.com" },
      ];
    },
    currentUser: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    isLoading: false, // Placeholder for loading state, can be replaced with actual loading logic
  };
}
