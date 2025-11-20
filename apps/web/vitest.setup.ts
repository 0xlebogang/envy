import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock components & modules
// Next.js
vi.mock("next/font/google");
vi.mock("next/navigation");
vi.mock("next/link");

// Shadcn UI components
vi.mock("@repo/shadcn/components/navigation-menu");
vi.mock("@repo/shadcn/components/sheet");
vi.mock("@repo/shadcn/components/button");
vi.mock("@repo/shadcn/components/dropdown-menu");
vi.mock("@repo/shadcn/components/avatar");
vi.mock("@repo/shadcn/components/card");

// Custom components
vi.mock("@/components/admin-panel/admin-panel-layout");

// Lucide React icons
vi.mock("lucide-react");

// Next-themes
vi.mock("next-themes");
