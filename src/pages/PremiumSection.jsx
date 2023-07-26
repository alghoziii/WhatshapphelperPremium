import React from "react";

const buyNowURL = "https://app.midtrans.com/payment-links/1690379216013";

const PremiumSection = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#2D2F33",
    padding: "2rem",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#fff",
  };

  const descriptionStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "600px",
    color: "#fff",
  };

  const priceStyle = {
    fontSize: "1.2rem",
    color: "#fff",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "2rem",
  };

  return (
    <div style={containerStyle} className="premium-section">
      <h2 style={titleStyle} className="premium-title">
        Premium Account
      </h2>
      <p style={descriptionStyle} className="premium-description">
        Nikmati keuntungan tak terbatas dengan langganan Premium kami! Dapatkan
        akses penuh ke semua fitur eksklusif dan konten premium yang kami
        tawarkan.Mulai dari Pesan Teks Tak terbatas dan masih banyak lagi.
      </p>
      <p style={priceStyle} className="premium-price">
        Harga: Rp 20.000 / bulan
      </p>
      <a href={buyNowURL} style={buttonStyle} className="buy-now-button">
        Beli Sekarang
      </a>
    </div>
  );
};

export default PremiumSection;
