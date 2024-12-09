import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import axios from "axios";

const QRCodeGenerator = () => {
  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const navigate = useNavigate();

  // Function to generate QR code
  const generateQRCode = async () => {
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
    try {
      const url = await QRCode.toDataURL(upiLink);
      setQrCodeUrl(url);  // Set the QR code URL
      console.log("Generated QR Code URL:", url);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to submit form data
  const handleSubmit = async () => {
    const formData = { upiId, name, amount, qrCodeUrl };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/qr`, formData);
      console.log("Response from API:", response.data);

      // Extract the _id from response and navigate to the details page
      const _id = response.data._id;

      if (_id) {
        navigate(`/qr-details/${_id}`);  // Redirect to QR details page with ID
      } else {
        alert("Failed to generate QR code details.");
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("An error occurred while saving data.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>UPI QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <button onClick={generateQRCode} style={styles.button}>
          Generate QR Code
        </button>
        {qrCodeUrl && (
          <div style={styles.qrContainer}>
            <img src={qrCodeUrl} alt="QR Code" style={styles.qrImage} />
          </div>
        )}
        <button onClick={handleSubmit} style={styles.button}>
          Submit and View QR Details
        </button>
      </div>
    </div>
  );
};

// Define the styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "350px",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4facfe",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom:"10px"
  },
  qrContainer: {
    marginTop: "20px",
  },
  qrImage: {
    width: "150px",
    height: "150px",
  },
};

export default QRCodeGenerator;
