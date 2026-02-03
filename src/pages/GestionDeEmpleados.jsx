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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from "@mui/material";

import { useState, useEffect } from "react";
import { getColaboradores, deleteColaborador, createColaborador, updateColaborador } from "../services/colaboradorService";
import Swal from "sweetalert2";

const GestionDeEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState (false);
  
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    edad: "",
    profesion: "",
    estadocivil: ""
  });

  const [idEditar, setIdEditar] = useState(null);
  
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormulario({ nombre: "", apellido: "", direccion: "", edad: "", profesion: "", estadocivil: "" });
    setIdEditar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombre" || name === "apellido") {

      const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]*$/;

      if (soloLetras.test(value)) {
        setFormulario({ ...formulario, [name]: value });
      }
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  }

  const handleGuardar = async () => {
    if (!formulario.nombre || !formulario.apellido || !formulario.edad) {
      Swal.fire({
        title: "Atención",
        text: "Nombre, Apellido y Edad son obligatorios",
        icon: "warning",
        didOpen: () => {
          const swalContainer = Swal.getContainer();
          swalContainer.style.zIndex = 2000;
        }
      });
      return;
    }

    try {
      if (idEditar) {
        await updateColaborador(idEditar, formulario);
        Swal.fire("Actualizado", "Colaborador actualizado correctamente", "success")
      } else {
        await createColaborador(formulario);
        Swal.fire("Guardado", "Colaborador guardado exitosamente", "success");
      }

      handleClose();
      cargarDatos();

    } catch (error) {
      Swal.fire({
        title: "Error", 
        text: error.message || "No se pudo guardar el colaborador",
        icon: "error",
        didOpen: () => {
             const swalContainer = Swal.getContainer();
             swalContainer.style.zIndex = 2000;
        }
      });
    }
  };

const cargarDatos = async () => {
    try {
      const data = await getColaboradores();
      setEmpleados(data);
    } catch (error) {
      console.error("Error cargando datos:", error);
      Swal.fire({
        title: "Error de Conexión",
        text: "No se pudieron cargar los colaboradores. Asegúrate de que el servidor esté encendido.",
        icon: "error",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#d32f2f"
      }).then((result) => {
        if(result.isConfirmed) {
            cargarDatos();
        }
      });
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

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

  const confirmarEliminarColaborador = (id) => {
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
        handleEliminarColaborador(id);
      }
    });
  };

  const handleEliminarColaborador = async (id) => {
    try {
      await deleteColaborador(id);
      Swal.fire("Eliminado!", "El colaborador ha sido eliminado.", "success");
      cargarDatos(); 
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el colaborador", "error")
    }
  };

  const handleEditar = (empleado) => {
    setIdEditar(empleado.IDCOLABORADOR || empleado.id);

    setFormulario({
      nombre: empleado.NOMBRE || empleado.nombre, 
      apellido: empleado.APELLIDO || empleado.apellido,
      direccion: empleado.DIRECCION || empleado.direccion,
      edad: empleado.EDAD || empleado.edad,
      profesion: empleado.PROFESION || empleado.profesion,
      estadocivil: empleado.ESTADOCIVIL || empleado.estadocivil
    });
    setOpen(true);    
  }

  return (
      <Box 
        sx={{ 
          display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'start', flexDirection: 'column'
        }}
      >
        <Card sx={{ display: "flex", alignItems: 'center', width: "100%", px: 2, py: 1, mb: 4, boxShadow: 3, border: "1px solid", borderColor: "#b8b8b8ff", justifyContent: "space-between" }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              <Avatar sx={{ bgcolor: "#1976d2", width: 44, height: 44 }}> <Group/> </Avatar>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#1f2937" }}>
                Sistema de Gestión de Colaboradores
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "end" }, gap: 1, my: 1}}>
              <Button startIcon={<Search />} variant="outlined" onClick={cargarDatos} sx={{ textTransform: "none", borderRadius: 2, px: 3, py: 1 }}>
                Buscar Colaboradores
              </Button>
              <Button startIcon={<PersonAddOutlined />} variant="contained" onClick={handleOpen} sx={{ textTransform: "none", borderRadius: 2, px: 3, py: 1 }}>
                Agregar Colaborador
              </Button>
            </Grid>
          </Grid>    
        </Card>

        <TableContainer component={Paper} elevation={0} sx={{ width: "95%", borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Apellido</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Dirección</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Edad</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nivel de Riesgo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {empleados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <Typography variant="h6" color="text.secondary">
                      No se encontraron colaboradores
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Presiona "Agregar Colaborador" para comenzar.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              empleados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((empleado) => {
                  const idReal = empleado.IDCOLABORADOR || empleado.id;

                  return (
                    <TableRow
                      key={idReal}
                      hover
                      sx={{ "& td": { py: 1.5, borderBottom: "1px solid #e5e7eb", fontSize: "0.9rem" }, "&:hover": { backgroundColor: "#f9fafb" } }}
                    >
                      <TableCell>{empleado.NOMBRE || empleado.nombre}</TableCell>
                      <TableCell>{empleado.APELLIDO || empleado.apellido}</TableCell>  
                      <TableCell>{empleado.DIRECCION || empleado.direccion}</TableCell>
                      <TableCell>{empleado.EDAD || empleado.edad}</TableCell>
                      <TableCell>{getRiesgoPorEdad(empleado.EDAD || empleado.edad)}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton size="small" onClick={() => handleEditar(empleado)}>
                            <EditOutlined sx={{ fontSize: 18, color: "#6b7280" }} />
                          </IconButton>
                          <IconButton size="small" onClick={() => confirmarEliminarColaborador(idReal) }>
                            <DeleteOutline sx={{ fontSize: 18, color: "#6b7280" }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {idEditar ? "Editar Colaborador" : "Nuevo Colaborador"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Nombre *" name="nombre" value={formulario.nombre} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Apellido *" name="apellido" value={formulario.apellido} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Dirección" name="direccion" value={formulario.direccion} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Edad *" name="edad" type="number" value={formulario.edad} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Profesión" name="profesion" value={formulario.profesion} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                select 
                label="Estado Civil" 
                name="estadocivil" 
                value={formulario.estadocivil} 
                onChange={handleChange} 
                fullWidth 
                size="small"
              >
                <MenuItem value="Soltero">Soltero</MenuItem>
                <MenuItem value="Casado">Casado</MenuItem>
                <MenuItem value="Divorciado">Divorciado</MenuItem>
                <MenuItem value="Viudo">Viudo</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button onClick={handleGuardar} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      </Box>
  )
}

export default GestionDeEmpleados;