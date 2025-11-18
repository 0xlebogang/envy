import { vi } from "vitest";

// let cn return any type for easier mocking in tests
export const cn: any = vi.fn().mockImplementation((...inputs: string[]) => {
	return inputs.filter(Boolean).join(" ");
});
