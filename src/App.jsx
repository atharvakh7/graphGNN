import { useState, useRef } from "react";

function App() {
  // Drag & Drop / Validation state
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValidFile, setIsValidFile] = useState(null); // null | true | false

  const fileInputRef = useRef(null);

  // Validate file by extension
  const validateFile = (file) => {
    if (!file) return;
    const allowed = ["csv", "json", "txt"];
    const extension = file.name.split(".").pop().toLowerCase();

    if (allowed.includes(extension)) {
      setSelectedFile(file);
      setIsValidFile(true);
    } else {
      setSelectedFile(null);
      setIsValidFile(false);
    }
  };

  // Handlers
  const handleFileSelect = (event) => {
    const file = event.target.files && event.target.files[0];
    validateFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    validateFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ width: "100%", padding: "40px 20px", color: "white" }}>
      {/* HEADER — Option A (Neon Glass Centered) */}
<div
  style={{
    width: "100%",
    padding: "22px 0",
    background: "rgba(20, 20, 28, 0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 4px 25px rgba(125, 60, 255, 0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  }}
>
  <div
    style={{
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "32px",
        fontWeight: "800",
        letterSpacing: "0.8px",
        background: "linear-gradient(90deg, #c18bff, #e05cff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 0 18px rgba(200, 80, 255, 0.5)",
      }}
    >
      Epidemic Prediction Dashboard
    </h1>

    <div
      style={{
        marginTop: "8px",
        width: "180px",
        height: "3px",
        borderRadius: "2px",
        background: "linear-gradient(90deg, #8a45ff, transparent)",
        opacity: 0.85,
        boxShadow: "0 0 10px rgba(125, 60, 255, 0.7)",
      }}
    ></div>
  </div>
</div>



      {/* TOP SECTION */}
      <div
        className="fade-in"
        style={{
          width: "100%",
          maxWidth: "1300px",
          margin: "40px auto 0 auto",
          background: "rgba(26, 26, 36, 0.85)",
          backdropFilter: "blur(4px)",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 0 35px rgba(0,0,0,0.45)",
        }}
      >
        <h2 style={{ marginBottom: "12px", fontSize: "24px", fontWeight: 700 }}>
          Input Parameters
        </h2>

        <div
          style={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(90deg, #753cff, transparent)",
            marginBottom: "25px",
            opacity: 0.5,
            borderRadius: "2px",
          }}
        />

        <div style={{ color: "#c9c9d2", marginBottom: "20px" }}>
          Upload a dataset representing all nodes in the population with their
          states and attributes.
        </div>

        {/* Drag-and-Drop Upload Box */}
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border:
              isDragging
                ? "2px dashed #bb86ff"
                : isValidFile === true
                ? "2px solid #4CAF50"
                : isValidFile === false
                ? "2px solid #ff4d4d"
                : "2px dashed rgba(135,135,170,0.5)",
            padding: "40px",
            textAlign: "center",
            borderRadius: "16px",
            marginBottom: "25px",
            background:
              isDragging
                ? "rgba(120,60,255,0.15)"
                : isValidFile === true
                ? "rgba(0,150,0,0.12)"
                : isValidFile === false
                ? "rgba(255,0,0,0.08)"
                : "linear-gradient(180deg, #1c1c25, #15151d)",
            cursor: "pointer",
            transition: "0.25s",
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            accept=".csv,.json,.txt"
          />

          <div style={{ fontSize: "35px", marginBottom: "10px" }}>⬆️</div>

          {selectedFile ? (
            <div style={{ color: "#bdbdf5", fontSize: "16px" }}>
              <strong>{selectedFile.name}</strong>
              <div style={{ marginTop: 6 }}>
                {isValidFile === true && (
                  <span style={{ color: "#4CAF50", fontSize: 14 }}>
                    ✔ File loaded successfully
                  </span>
                )}
                {isValidFile === false && (
                  <span style={{ color: "#ff4d4d", fontSize: 14 }}>
                    ✖ Unsupported file format
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ color: "#9f9fb3", fontSize: "15px" }}>
              Click to upload or drag & drop files here
              <br />
              <span style={{ opacity: 0.6 }}>(Supported: CSV, JSON, TXT)</span>
            </div>
          )}
        </div>

        {/* Prediction Timeframe */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ fontWeight: "bold" }}>Prediction Timeframe</label>
          <input
            type="number"
            placeholder="Enter hours"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#101018",
              color: "white",
            }}
          />
        </div>

        {/* Zone Selection */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ fontWeight: "bold" }}>Zone Selection</label>
          <select
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#101018",
              color: "white",
            }}
          >
            <option>Select a zone...</option>
            <option>Zone A - Industrial</option>
            <option>Zone B - Commercial</option>
            <option>Zone C - Park Area</option>
            <option>Zone D - Residential Area</option>
          </select>
        </div>

        {/* Button */}
        <button
          className="btn-animated"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg, #7d4dff, #c022ff)",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ⚡ Generate Prediction
        </button>
      </div>

      {/* BOTTOM SECTION */}
      <div
        className="fade-in"
        style={{
          width: "100%",
          maxWidth: "1300px",
          margin: "40px auto 0 auto",
          background: "rgba(26, 26, 36, 0.85)",
          backdropFilter: "blur(4px)",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 0 35px rgba(0,0,0,0.45)",
        }}
      >
        <h2 style={{ marginBottom: "12px", fontSize: "24px", fontWeight: 700 }}>
          Prediction Results
        </h2>

        <div
          style={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(90deg, #753cff, transparent)",
            marginBottom: "25px",
            opacity: 0.5,
            borderRadius: "2px",
          }}
        />

        {/* Stats */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
          <div className="stat-card-hover" style={{
            flex: "1",
            minWidth: "250px",
            background: "linear-gradient(180deg, #23232f, #1b1b24)",
            padding: "25px",
            borderRadius: "18px",
            border: "1px solid #2d2d3a",
            boxShadow: "0 0 15px rgba(0,0,0,0.35)"
          }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>Max Infection Rate</h3>
            <div style={{ fontSize: 22, fontWeight: "bold" }}>89.8%</div>
          </div>

          <div className="stat-card-hover" style={{
            flex: "1",
            minWidth: "250px",
            background: "linear-gradient(180deg, #23232f, #1b1b24)",
            padding: "25px",
            borderRadius: "18px",
            border: "1px solid #2d2d3a",
            boxShadow: "0 0 15px rgba(0,0,0,0.35)"
          }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>Avg Infection Rate</h3>
            <div style={{ fontSize: 22, fontWeight: "bold" }}>47.0%</div>
          </div>

          <div className="stat-card-hover" style={{
            flex: "1",
            minWidth: "250px",
            background: "linear-gradient(180deg, #23232f, #1b1b24)",
            padding: "25px",
            borderRadius: "18px",
            border: "1px solid #2d2d3a",
            boxShadow: "0 0 15px rgba(0,0,0,0.35)"
          }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>High Risk Areas</h3>
            <div style={{ fontSize: 22, fontWeight: "bold" }}>14.6%</div>
          </div>
        </div>

        {/* Heatmap placeholder */}
        <h3 style={{ marginBottom: 10 }}>Infection Spread Heat Map</h3>
        <div style={{
          width: "100%",
          height: "320px",
          border: "2px dashed rgba(120,120,150,0.4)",
          borderRadius: 18,
          background: "linear-gradient(180deg, #12121a, #0e0e14)",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8585a0",
          fontSize: 18
        }}>
          Heat Map will be displayed here
        </div>
      </div>
    </div>
  );
}

export default App;
