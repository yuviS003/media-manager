"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomButton from "../custom/custom-button";
import { deleteMediaById } from "@/api/media";
import { enqueueSnackbar } from "notistack";

const DeleteMediaDialog = ({ open, mediaId, handleClose, refreshData }) => {
  const [loading, setLoading] = useState(false);

  const handleMediaDelete = async () => {
    if (!mediaId) return;
    try {
      setLoading(true);
      const response = await deleteMediaById(mediaId);
      if (response?.success) {
        refreshData();
        handleClose();
        enqueueSnackbar("Media deleted successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Internal Server Error",
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
      aria-labelledby="delete-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="delete-dialog-title">
        Delete Media - {mediaId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this media?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <CustomButton
          isLoading={loading}
          onClick={handleMediaDelete}
          text={"Delete"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMediaDialog;
