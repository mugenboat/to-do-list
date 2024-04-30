"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Modal,
  Chip,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [rows, setRows] = useState<
    [
      {
        id: string;
        name: string;
        description: string;
        status: boolean;
      }
    ]
  >([
    {
      id: "0asc",
      name: "กินโยเกิร์ต",
      description: "โยเกิร์ตกินก่อนบ่ายสาม",
      status: false,
    },
    {
      id: "1asc",
      name: "กินไอติม",
      description: "กินไอติมก่อนละลาย",
      status: true,
    },
  ]);

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [filter, setFilter] = useState<boolean>("");
  const [description, setDescription] = useState<string>("");
  const [filterItems, setFilterItems] = useState(rows);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type) => {
    if (type === "name") {
      setName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const beforeHandleClose = () => {
    setName("");
    setDescription("");
    handleClose();
  };

  const addTodo = () => {
    let newTodo = rows;
    newTodo.push({
      id: crypto.randomUUID(),
      name: name,
      description: description,
      status: false,
    });
    setRows(newTodo);
    setFilterItems(rows);
    beforeHandleClose();
  };

  const handleChangeFilter = (event: SelectChangeEvent) => {
    let filterList;

    setFilter(event.target.value);
    if (event.target.value === "") {
      filterList = rows;
    } else {
      filterList = rows.filter(row => row.status === event.target.value);
    }
    setFilterItems(filterList);
  };

  const removeItem = id => {
    let todoItems = rows;
    let removeItemIndex = rows.findIndex(row => row.id === id);
    setRows(todoItems.splice(removeItemIndex, 1));
    setFilterItems(rows);
  };

  const updateStatus = id => {
    let todoItems = rows;
    let updateItemIndex = todoItems.findIndex(row => row.id === id);
    todoItems[updateItemIndex].status = true;
    setRows([...todoItems]);
    setFilterItems(rows);
  };

  return (
    <Box sx={{ px: 5 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8}>
          <Box textAlign="left" sx={{ my: 2 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filter}
              onChange={handleChangeFilter}
              label="Filter"
              displayEmpty
              sx={{ border: 1, borderColor: "red", color: "green" }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={true}>Done</MenuItem>
              <MenuItem value={false}>Not Done</MenuItem>
            </Select>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box textAlign="right" sx={{ my: 2 }}>
            <Button variant="contained" onClick={handleOpen}>
              New
            </Button>
          </Box>
        </Grid>

        <Modal
          open={open}
          onClose={beforeHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} textAlign="center">
            <TextField
              id="name-basic"
              label="Name"
              variant="outlined"
              onChange={e => handleChange(e, "name")}
              value={name}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              id="description-multiline-static"
              label="Description"
              multiline
              rows={4}
              onChange={e => handleChange(e, "description")}
              value={description}
              multiline
              fullWidth
              required
            />

            <Button
              variant="contained"
              sx={{ my: 1 }}
              disabled={name === "" || description === ""}
              onClick={() => {
                addTodo();
              }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterItems.map(row => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  {row.status === true ? (
                    <Chip label="Done" color="success" />
                  ) : (
                    <Chip label="Not Done" color="warning" variant="outlined" />
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.status !== true && (
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        sx={{ mx: 0.5 }}
                        color="success"
                        onClick={() => {
                          updateStatus(row.id);
                        }}
                      >
                        Done
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mx: 0.5 }}
                        onClick={() => {
                          removeItem(row.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
