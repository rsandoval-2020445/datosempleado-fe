import { 
  DeleteOutline,
  EditOutlined,
  Group, 
  PersonAddOutlined,
  Search
} from "@mui/icons-material";
import { 
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography, 
} from "@mui/material";
import { useState } from "react";
import { colaboradoresMock } from "../utils/empleadosMock";
import Swal from "sweetalert2";

const GestionDeEmpleados = () => {
  const empleados = colaboradoresMock;

  //Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const getRiesgoPorEdad = (edad) => {
    if (edad <= 25) return <Chip label="Bajo" size="small" sx={{ bgcolor: "#2e7d32", color: "#fff" }} />;
    if (edad <= 50) return <Chip label="Medio" size="small" sx={{ bgcolor: "#fbc02d", color: "#000" }} />;
    return <Chip label="Alto" size="small" sx={{ bgcolor: "#d32f2f", color: "#fff" }} />;
  };

  const confirmarEliminarColaborador = (onConfirmar) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este colaborador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmar();
      }
    });
  };

  const handleEliminarColaborador = (id) => {
    console.log("Eliminar colaborador con id:", id);
  };

  return (
      <Box 
        sx={{ 
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'start',
          flexDirection: 'column'
        }}
      >
        <Card sx={{ display: "flex", alignItems: 'center', width: "100%", px: 2, py: 1, mb: 4, boxShadow: 3, border: "1px solid", borderColor: "#b8b8b8ff", justifyContent: "space-between" }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 44,
                  height: 44,
                }}
              >
                <Group/>
              </Avatar>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: "#1f2937",
                }}
              >
                Sistema de Gestión de Colaboradores
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "end" }, gap: 1, my: 1}}>
              <Button
                startIcon={<Search />}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
              >
                Buscar Colaboradores
              </Button>
              <Button
                startIcon={<PersonAddOutlined />}
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
              >
                Agregar Colaborador
              </Button>
            </Grid>
          </Grid>    
        </Card>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            width: "95%",
            borderRadius: 4,
            border: "1px solid #e5e7eb",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f8fafc",
                }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Apellido</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Dirección</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Edad</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nivel de Riesgo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((empleado) => (
                  <TableRow
                    key={empleado.id}
                    hover
                    sx={{
                      "& td": {
                        py: 1.5,
                        borderBottom: "1px solid #e5e7eb",
                        fontSize: "0.9rem",
                      },
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    <TableCell>{empleado.nombre}</TableCell>
                    <TableCell>{empleado.apellido}</TableCell>  
                    <TableCell>{empleado.direccion}</TableCell>
                    <TableCell>{empleado.edad}</TableCell>
                    <TableCell>{getRiesgoPorEdad(empleado.edad)}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton size="small">
                          <EditOutlined sx={{ fontSize: 18, color: "#6b7280" }} />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => confirmarEliminarColaborador(() => handleEliminarColaborador(empleado.id)) }>
                          <DeleteOutline sx={{ fontSize: 18, color: "#6b7280" }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={empleados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count}`
          }
        />
      </Box>
  )
}

export default GestionDeEmpleados;