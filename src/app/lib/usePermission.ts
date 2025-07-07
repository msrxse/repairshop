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

export function usePermission() {
  // This hook is a placeholder for future permission logic.
  // Currently, it does not implement any specific permission checks.
  // You can extend this function to include role-based access control or other permission logic as needed.

  return {
    getPermission: (role: "admin" | "manager" | null) => getPermission(role),
    isLoading: false, // Placeholder for loading state, can be replaced with actual loading logic
  };
}
