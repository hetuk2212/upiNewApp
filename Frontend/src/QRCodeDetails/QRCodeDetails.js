import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QRCodeDetails = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/qr/${id}`);
        setQrData(response.data); // Set the fetched data in state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("QR Code not found.");
        } else {
          setError("Failed to fetch QR data.");
        }
        console.error("Error fetching QR data:", error);
      }
    };
    fetchQRData();
  }, [id]);

  const handleBack = () => {
    navigate("/"); // Navigate back to home page
  };

  const handleDownloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrData.qrCodeUrl;
    link.download = `qr_code_${qrData._id}.png`; // Filename for the downloaded image
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src='https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp'
            alt="UPI Logo"
            style={styles.upiLogo}
          />
          <div>
            <h2 style={styles.upiName}>Paying to: {qrData?.name || 'UPI Transaction'}</h2>
          </div>
        </div>
        {error ? (
          <p style={styles.errorText}>{error}</p>
        ) : qrData ? (
          <div style={styles.qrContainer}>
            <img src={qrData.qrCodeUrl} alt="QR Code" style={styles.qrImage} />
            <div style={styles.details}>
              <p><strong>Order ID:</strong> {qrData._id}</p>
              <p><strong>Amount:</strong> ₹{qrData.amount}</p>
            </div>
            <button onClick={handleDownloadQRCode} style={styles.downloadButton}>
              Download QR Code
            </button>
          </div>
        ) : (
          <p style={styles.loadingText}>Loading...</p>
        )}
        <button onClick={handleBack} style={styles.button}>Back</button>
      </div>
      <img
        style={styles.bottomImg}
        src="https://imatrivandrum.org/wp-content/uploads/2023/01/IMA-Trivandrum-payments.png"
        alt="IMA Trivandrum"
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "'Roboto', sans-serif",
    padding: "10px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4facfe",
    padding: "10px",
    borderRadius: "10px",
    gap: "10px",
  },
  upiLogo: {
    width: "50px",
    height: "50px",
    backgroundColor: "white"
  },
  upiName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: "1rem",
    marginTop: "10px",
  },
  loadingText: {
    fontSize: "1rem",
    color: "#333",
    marginTop: "20px",
  },
  qrContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  qrImage: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
  },
  details: {
    marginTop: "10px",
    fontSize: "1rem",
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4facfe",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
  },
  downloadButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
  },
  bottomImg: {
    width: "80%",
    marginTop: "40px",
  },
  '@media (max-width: 600px)': {
    qrImage: {
      width: "150px",
      height: "150px",
    },
    card: {
      maxWidth: "90%",
    },
    button: {
      padding: "10px 15px",
    },
    bottomImg: {
      width: "90%",
    },
  }
};

export default QRCodeDetails
