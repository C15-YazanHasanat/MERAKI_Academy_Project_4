import { Container, Typography, Box } from "@mui/material";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        gutterBottom
        sx={{ color: "#162be8fe", fontWeight: "bold" }}
      >
        Contact Us
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" align="left" paragraph>
          We’d love to hear from you! Whether you have a question about our
          products, services, or need assistance with your order, our team is
          ready to help.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body1"
            align="left"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FaPhone style={{ marginRight: "8px", color: "#162be8fe" }} />
            +962 7 1234 5678
          </Typography>

          <Typography
            variant="body1"
            align="left"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FaEnvelope style={{ marginRight: "8px", color: "#162be8fe" }} />
            support@technest.com
          </Typography>

          <Typography
            variant="body1"
            align="left"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FaMapMarkerAlt
              style={{ marginRight: "8px", color: "#162be8fe" }}
            />
            Amman, Jordan
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
