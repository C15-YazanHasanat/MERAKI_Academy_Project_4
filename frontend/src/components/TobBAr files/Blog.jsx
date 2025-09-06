import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const navigate=useNavigate()
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        align="left"
        gutterBottom
        sx={{ color: "#162be8fe", fontWeight: "bold" }}
      >
        Blog
      </Typography>

      <Box sx={{ mt: 3 }} >
        <Typography variant="body1" align="left" paragraph>
          Welcome to the TECHNEST Blog! Here, we share the latest news, tips,
          and insights about technology, electronics, and the digital world.
        </Typography>

        {/* Example blog posts */}
        <Card sx={{ mb: 3,cursor:"pointer" }} onClick={() => navigate("/category/68bc1b6712d386234d0b1d6b")}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top 5 Laptops for Students in 2025
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Looking for the perfect laptop for school or university? Check out
              our list of the best options that balance performance, price, and
              portability.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3,cursor:"pointer" }} onClick={() => navigate("/category/68bc1b0b12d386234d0b1d60")}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              How to Build Your Own Gaming PC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A step-by-step guide to selecting the right components and
              assembling your dream gaming setup.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{ mb: 3, cursor: "pointer" }}
          onClick={() => navigate("/category/68bc1ba912d386234d0b1d73")}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Phones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the latest smartphones and accessories available in our
              store.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Blog;
