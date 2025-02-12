"use client";
import { getAllMedia } from "@/api/media";
import MediaGrid from "@/components/media-grid";
import MediaGridSkeleton from "@/components/skeletons/media-grid-skeleton";
import UploadMediaDialog from "@/components/upload-media-dialog";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const MediaPage = () => {
  const { user } = useGlobalContext();
  const [loader, setLoader] = useState(true);
  const [media, setMedia] = useState([]);

  const [showUploadMediaDialog, setShowUploadMediaDialog] = useState(false);

  const openUploadMediaDialog = () => setShowUploadMediaDialog(true);

  const closeUploadMediaDialog = () => setShowUploadMediaDialog(false);

  const fetchAllMediaByUser = async (userId) => {
    if (!userId) return;
    try {
      const response = await getAllMedia(userId);
      console.log("response", response);
      if (Array.isArray(response)) setMedia(response);
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Internal server error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoader(false);
    }
  };

  const refreshData = () => {
    setLoader(true);
    fetchAllMediaByUser(user?.id);
  };

  useEffect(() => {
    if (user?.id) fetchAllMediaByUser(user?.id);
  }, [user]);
  return (
    <>
      <div className="w-full p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Media Manager
          </h2>
          <Button
            variant="contained"
            color="success"
            onClick={openUploadMediaDialog}
          >
            Upload Media
          </Button>
        </div>
        {loader ? (
          <MediaGridSkeleton />
        ) : (
          <MediaGrid media={media} refreshData={refreshData} />
        )}
      </div>
      <UploadMediaDialog
        open={showUploadMediaDialog}
        handleClose={closeUploadMediaDialog}
        refreshData={refreshData}
      />
    </>
  );
};

export default MediaPage;
