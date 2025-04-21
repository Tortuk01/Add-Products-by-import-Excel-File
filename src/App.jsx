import { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CustomizedSnackbars from "./components/Snackbar";

const App = () => {
  const [open, setOpen] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    itemName: "",
    type: "",
    department: "",
    description: "",
    size: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackBar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleAddItem = async () => {
    const newItem = {
      id: allItems.length + 1,
      "Item Name": formData.itemName,
      Type: formData.type,
      Department: formData.department,
      "Item Description": formData.description,
      Size: formData.size,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/inventory",
        newItem
      ); // JSON Server URL

      // Agar successfully save ho jaye to local state me bhi add karo
      setAllItems([...allItems, response.data]);

      // Reset form
      setFormData({
        itemName: "",
        type: "",
        department: "",
        description: "",
        size: "",
      });

      setOpen(false);
      handleSnackBar("Item added successfully!", "success");
    } catch (error) {
      handleSnackBar("Failed to add item!", "error");
      console.error("POST error:", error);
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const newItems = data.map((row, i) => ({
        id: allItems.length + i + 1,
        "Item Name": row["Item Name"] || "",
        Type: row["Type"] || "",
        Department: row["Department"] || "",
        "Item Description": row["Item Description"] || "",
        Size: row["Size"] || "",
      }));

      setAllItems((prev) => [...prev, ...newItems]);

      try {
        // ✅ FAKE API using setTimeout to simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 📦 Fake Axios POST (You can use real one when API is ready)
        // await axios.post(
        //   "https://jsonplaceholder.typicode.com/posts",
        //   newItems
        // ); // ← dummy endpoint

        await axios.post("http://localhost:4000/inventory", newItems);

        // ✅ Show Snackbar
        handleSnackBar("Items added successfully!", "success");
      } catch (error) {
        console.error("Upload error:", error);
        handleSnackBar("Error saving items!", "error");
      }
    };

    reader.readAsBinaryString(file);
  };

  // const handleExcelUpload = (e) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     const bstr = evt.target.result;
  //     const workbook = XLSX.read(bstr, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet);

  //     const newItems = data.map((row, i) => ({
  //       id: allItems.length + i + 1,
  //       ...row,
  //     }));

  //     setAllItems((prev) => [...prev, ...newItems]);
  //   };

  //   reader.readAsBinaryString(file);
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Item Name", headerName: "Item Name", width: 150 },
    { field: "Type", headerName: "Type", width: 130 },
    { field: "Department", headerName: "Department", width: 130 },
    { field: "Item Description", headerName: "Description", width: 160 },
    { field: "Size", headerName: "Size", width: 100 },
  ];

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Item
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            padding: 30,
            backgroundColor: "white",
            margin: "5% auto",
            width: 600,
          }}
        >
          <h2>Add Inventory</h2>

          <TextField
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Size"
            name="size"
            value={formData.size}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            style={{ marginTop: 10 }}
          >
            Submit
          </Button>
        </div>
      </Modal>

      <div style={{ marginTop: 20 }}>
        <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} id="excel-upload" style={{ display: 'none' }}/>

        <label htmlFor="excel-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            sx={{
              mt: 2,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Upload Excel File
          </Button>
        </label>
      </div>

      <div style={{ height: 400, margin: 20 }}>
        <DataGrid rows={allItems} columns={columns} />
      </div>
      <CustomizedSnackbars
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default App;
