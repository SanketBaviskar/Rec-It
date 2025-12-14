# Dark Mode Implementation Plan for Admin Dashboard

## Goal

Enable full dark mode support for all Admin Dashboard components by removing hardcoded light-mode colors and using semantic/conditional Tailwind classes.

## Proposed Changes

### Layout Components

#### [MODIFY] [AdminDashboard.tsx](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/Layout/AdminDashboard.tsx)

-   Header: `bg-white` -> `bg-white dark:bg-gray-900`, `border-b` -> `border-b dark:border-gray-800`.
-   Main Content: `bg-gray-50` -> `bg-gray-50 dark:bg-background`.

#### [MODIFY] [Sidebar.tsx](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/Layout/SideBar/SideBar.tsx)

-   Container: `bg-gray-800` -> `bg-gray-800 dark:bg-gray-950` (or allow it to adapt if it's already dark).
-   Text: Ensure contrast in dark mode.

#### [MODIFY] [Footer.tsx](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/Layout/Footer.tsx)

-   Background: `bg-white` -> `bg-white dark:bg-gray-900`.
-   Text: `text-gray-500` -> `text-gray-500 dark:text-gray-400`.

### Feature Components

#### [MODIFY] [DefaultView.tsx](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/components/DefaultView.tsx)

-   Cards: `bg-white` -> `bg-white dark:bg-card`, `border-gray-100` -> `border-gray-100 dark:border-gray-800`.
-   Text: `text-gray-900` -> `text-gray-900 dark:text-gray-100`.

#### [MODIFY] [FacilityManagement](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/components/FacilityManagement)

-   Scan `FacilityManagementTab.tsx`, `FacilityCategories.tsx` for `bg-white`, `text-*`.

#### [MODIFY] [InventoryManagement](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/components/InventoryManagement)

-   Scan `InventoryManagementTab.tsx` for table backgrounds and text colors.

#### [MODIFY] [Access/Membership/Member Settings](file:///f:/Projects/Rec-It/Rec-It-Frontend/src/features/admin/components)

-   Review all sub-components for consistent dark mode classes.

## Verification

-   Toggle dark mode theme using the `mode-toggle` component (if available) or system preference.
-   Visually verify that backgrounds, text, and borders adjust correctly.
