import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import {
  Button,
  Box,
  Typography,
  Paper,
  InputLabel,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/locationSlice";
// Marker Component
const Marker = () => (
  <div
    style={{
      color: "white",
      padding: "5px 8px",
      borderRadius: "50%",
      fontSize: "20px",
      textAlign: "center",
      transform: "translate(-50%, -50%)",
    }}
  >
    📍
  </div>
);

export default function GetAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultProps = {
    center: { lat: 31.9539, lng: 35.9106 },
    zoom: 12,
  };

  const [marker, setMarker] = useState(null)

  const [locationText, setLocationText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (marker) {
      setLocationText(`${marker.lat}, ${marker.lng}`);
    }
  }, [marker]);

  const handleMapClick = ({ lat, lng }) => {
    const newMarker = { lat, lng };
    setMarker(newMarker);
    setError("");
  };

   const handleConfirm = () => {
    if (marker || locationText.trim() !== "") {
      dispatch(
        setLocation({
          coordinates: marker || null,
          nearestLocation: locationText || "",
        })
      );
      navigate("/checkout");
    } else {
      setError("Please select your location on the map or write it.");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {/* Right Side - Map + Input */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          <Paper sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select Delivery Address
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click on the map or write your location.
            </Typography>
          </Paper>

          <Box
            sx={{
              height: "300px",
              width: "100%",
              borderRadius: "10px",
              overflow: "hidden",
              mb: 2,
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              onClick={handleMapClick}
            >
              {marker && <Marker lat={marker.lat} lng={marker.lng} />}
            </GoogleMapReact>
          </Box>

          <InputLabel
            sx={{ mb: 1, textAlign: "left", color: "black", fontSize: "18px" }}
          >
            Enter your nearest locations:
          </InputLabel>
          <TextField
            fullWidth
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="Like Mosque, Roundabout, School...."
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              height: "50px",
              fontSize: "16px",
              borderRadius: "10px",
              ":hover": {
                backgroundColor: "#fff",
                color: "blue",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
            }}
            onClick={handleConfirm}
          >
            Confirm Location
          </Button>
        </Box>

        {/* left Side - Info */}
        <Paper
          sx={{
            flex: 1,
            minWidth: "250px",
            padding: 2,
            backgroundColor: "rgba(97, 103, 108, 1)",
            color: "white",
            maxWidth: 600,
            height: "130px",
            wordWrap: "break-word",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            To make sure your order reaches you quickly and without any
            mistakes, please select your exact location on the map or write it
            above. This will help us deliver your order accurately and on time.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
