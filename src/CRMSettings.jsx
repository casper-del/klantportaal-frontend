import React, { useState } from "react";

const API_BASE = "http://localhost:3001/api";

const CRMSettings = ({ token }) => {
  const [apiKey, setApiKey] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [message, setMessage] = useState("");

  const saveConfig = async () => {
    try {
      const res = await fetch(`${API_BASE}/client/teamleader/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ apiKey, subdomain }),
      });
      if (!res.ok) throw new Error("Opslaan mislukt");
      setMessage("✅ Configuratie opgeslagen!");
    } catch (err) {
      setMessage("❌ Fout: " + err.message);
    }
  };

  const syncNow = async () => {
    try {
      const res = await fetch(`${API_BASE}/client/teamleader/sync`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Sync mislukt");
      setMessage("✅ Synchronisatie gestart!");
    } catch (err) {
      setMessage("❌ Fout: " + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">CRM Instellingen</h2>
      <input
        type="text"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Subdomein"
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <div className="flex space-x-4">
        <button
          onClick={saveConfig}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Opslaan
        </button>
        <button
          onClick={syncNow}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Nu synchroniseren
        </button>
      </div>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default CRMSettings;
