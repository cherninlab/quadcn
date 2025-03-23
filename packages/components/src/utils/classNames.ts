/**
 * Utility function to combine class names conditionally
 *
 * @param classNames - Array of class names or conditionally included class names
 * @returns Combined class name string
 *
 * @example
 * // Returns "btn btn-primary"
 * cx("btn", "btn-primary")
 *
 * @example
 * // Returns "btn btn-primary active"
 * cx("btn", "btn-primary", isActive && "active")
 */
export function cx(...classNames: (string | boolean | undefined)[]) {
	return classNames.filter(Boolean).join(" ");
}
