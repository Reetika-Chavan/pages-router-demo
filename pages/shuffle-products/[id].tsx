import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ShuffleProducts() {
  const router = useRouter();
  const { id } = router.query;
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (router.isReady) {
      // Extract UTM parameters from the URL
      const params = new URLSearchParams(window.location.search);
      const utmData: Record<string, string> = {};

      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
      ].forEach((param) => {
        const value = params.get(param);
        if (value) {
          utmData[param] = value;
        }
      });

      setUtmParams(utmData);
    }
  }, [router.isReady]);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Shuffle Products Page</h1>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2>Product ID: {id}</h2>
        <p>This page was reached via redirect from live-preview-demo</p>
      </div>

      {Object.keys(utmParams).length > 0 && (
        <div
          style={{
            backgroundColor: "#e8f4fd",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          <h3>UTM Parameters Preserved:</h3>
          <ul>
            {Object.entries(utmParams).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3>Redirect Test Successful! ✅</h3>
        <p>
          The edge function redirect is working correctly. The UTM parameters
          have been preserved from the original URL.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <h4>Test URL that should redirect here:</h4>
          <code
            style={{
              backgroundColor: "#f8f9fa",
              padding: "0.5rem",
              borderRadius: "4px",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            /live-preview-demo/{id}
            ?utm_source=linkedin&utm_medium=organic-social&utm_campaign=ga-testimonial-video&utm_term=v1&utm_content=smith-opportunities
          </code>
        </div>
      </div>
    </div>
  );
}
