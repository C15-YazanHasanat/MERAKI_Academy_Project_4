import { Container, Typography, Box } from "@mui/material";

const AboutUS = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        gutterBottom
        sx={{ color: "#162be8fe", fontWeight: "bold" }}
      >
        About Us
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" align="left" paragraph>
          Welcome to <strong>TECHNEST</strong>, your trusted destination for
          the latest and greatest in electronics. We are dedicated to providing
          high-quality products, exceptional customer service, and unbeatable
          prices to meet all your technology needs.
        </Typography>

        <Typography variant="body1" align="left" paragraph>
          From powerful PCs and laptops to smartphones, accessories, and smart
          home devices, we carefully select every product to ensure it meets our
          customers’ expectations. Whether you’re a gamer, a student, or a
          professional, TECHNEST has the right solution for you.
        </Typography>

        <Typography variant="body1" align="left" paragraph>
          Our mission is simple: to make technology accessible, affordable, and
          enjoyable for everyone. We constantly update our catalog with the
          latest innovations, so you can always stay ahead in the digital world.
        </Typography>

        <Typography variant="body1" align="left" paragraph>
          Thank you for choosing TECHNEST. We look forward to serving you and
          being part of your technology journey!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUS;
