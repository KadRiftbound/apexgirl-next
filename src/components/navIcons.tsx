/* Navigation icons shared by the desktop sidebar and the mobile tab bar.
   One family: 24px grid, 1.8 stroke, round caps, no fills except the small star on the podium. */
export const navIcons: Record<string, React.ReactNode> = {
  // House with a door
  home: (
    <>
      <path d="M3.5 10.8 12 4l8.5 6.8" />
      <path d="M5.5 9.6V19a1 1 0 0 0 1 1H9.8v-5.2a2.2 2.2 0 0 1 4.4 0V20h3.3a1 1 0 0 0 1-1V9.6" />
    </>
  ),
  // Three people, the leader in front
  teambuilder: (
    <>
      <circle cx="12" cy="7.6" r="3" />
      <path d="M6.6 20v-.9a5.4 5.4 0 0 1 10.8 0V20" />
      <circle cx="4.8" cy="10.2" r="2.1" />
      <path d="M1.5 19.2v-.6a3.4 3.4 0 0 1 4.2-3.3" />
      <circle cx="19.2" cy="10.2" r="2.1" />
      <path d="M22.5 19.2v-.6a3.4 3.4 0 0 0-4.2-3.3" />
    </>
  ),
  // Podium with a star on the first step
  tierlist: (
    <>
      <path d="M2.5 20.5h19" />
      <path d="M9 20.5V9.3a.8.8 0 0 1 .8-.8h4.4a.8.8 0 0 1 .8.8v11.2" />
      <path d="M2.5 20.5v-7.2a.8.8 0 0 1 .8-.8H9" />
      <path d="M21.5 20.5v-4.7a.8.8 0 0 0-.8-.8H15" />
      <path d="M12 2.2l1 2 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.6 2.2-.3z" fill="currentColor" stroke="none" />
    </>
  ),
  // Open book
  guides: (
    <>
      <path d="M12 7c-1.5-1.5-3.6-2.2-6.2-2.2H3.5v13.7h2.3c2.6 0 4.7.7 6.2 2.1 1.5-1.4 3.6-2.1 6.2-2.1h2.3V4.8h-2.3C15.6 4.8 13.5 5.5 12 7z" />
      <path d="M12 7v13.6" />
      <path d="M6.3 8.6h2.6M6.3 11.6h2.6M15.1 8.6h2.6M15.1 11.6h2.6" />
    </>
  ),
  // Heart
  vote: <path d="M12 20.3s-7.6-4.7-9.4-9.3C1.3 7.6 3.5 4 7.1 4c2 0 3.5 1.2 4.9 2.8C13.4 5.2 14.9 4 16.9 4c3.6 0 5.8 3.6 4.5 7-1.8 4.6-9.4 9.3-9.4 9.3z" />,
  // Ticket
  codes: (
    <>
      <path d="M3 8.6V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.6a2.4 2.4 0 0 0 0 4.8V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3.6a2.4 2.4 0 0 0 0-4.8z" />
      <path d="M9.4 5.4v13.2" strokeDasharray="2.2 2.4" />
      <path d="M13 10h4M13 14h3" />
    </>
  ),
  // Chevron used by the sidebar toggle
  chevron: <path d="M14.5 6 8.5 12l6 6" />,
};

export function NavIcon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {navIcons[name]}
    </svg>
  );
}
