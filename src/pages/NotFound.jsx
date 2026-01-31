import { Box, Button, Container, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <ErrorOutline sx={{ fontSize: 100, color: "#d32f2f", mb: 2 }} />
        
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          ¡Ups! Página no encontrada
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Parece que la página que buscas no existe o ha sido movida.
        </Typography>

        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate("/")} 
          sx={{ borderRadius: 2, px: 4 }}
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;