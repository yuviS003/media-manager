"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useGlobalContext } from "@/context/GlobalContext";
import { uploadMedia } from "@/api/media";
import { enqueueSnackbar } from "notistack";
import CustomButton from "../custom/custom-button";

const UploadMediaDialog = ({ open, handleClose, refreshData }) => {
  const { user } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const acceptedFormats = {
    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    "video/*": [".mp4", ".mov", ".avi"],
  };

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    multiple: false,
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!file || !fileName.trim()) return;
    try {
      console.log("Uploading File:", file);
      console.log("Filename:", fileName);
      console.log("User ID:", user?.id);

      setLoading(true);
      const formData = new FormData();
      formData.append("media", file);
      formData.append("userId", user?.id);
      formData.append("fileName", fileName);
      const response = await uploadMedia(formData);
      if (response?.success) {
        enqueueSnackbar("Media uploaded successfully", { variant: "success" });
        refreshData();
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Internal Server error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="upload-dialog-title">Upload Media</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Drag & Drop Zone */}
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              textAlign: "center",
              border: "2px dashed #aaa",
              backgroundColor: isDragActive ? "#f0f0f0" : "inherit",
              cursor: "pointer",
              mb: 2,
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body1" color="primary">
                Drop the file here...
              </Typography>
            ) : (
              <Typography variant="body1">
                Drag & drop a file here, or click to select one.
              </Typography>
            )}
            {file && (
              <Typography variant="body2" color="secondary" mt={1}>
                Selected File: {file.name}
              </Typography>
            )}
          </Paper>

          {/* Filename Input */}
          <TextField
            fullWidth
            label="File Name"
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <CustomButton isLoading={loading} type="submit" text={"Upload"} />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMediaDialog;
