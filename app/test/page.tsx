// Add force-dynamic to prevent any static generation attempts
export const dynamic = 'force-dynamic';

import '../styles.css';

export default function TestPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "green", fontSize: "32px" }}>Test Page with Inline Styles</h1>
      <p>This paragraph uses default styling</p>
      <div className="test-style">
        This div should have the test-style class applied (red text, bold, with blue border)
      </div>
      <div className="bg-blue-500 text-white p-4 m-4 rounded-lg">
        This div should have Tailwind classes applied (blue background, white text)
      </div>
      <div className="direct-css-test">
        This div uses the direct CSS import (orange text on black background)
      </div>
    </div>
  );
} 