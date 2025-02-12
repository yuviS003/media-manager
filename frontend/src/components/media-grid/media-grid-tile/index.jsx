import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../../../config";

const MediaGridTile = ({ item, handleMediaDelete }) => {
  return (
    <div className="w-full h-[300px] border rounded-lg flex flex-col gap-2 overflow-hidden relative">
      <IconButton
        size="medium"
        aria-label="delete"
        onClick={() => handleMediaDelete(item?.id)}
        sx={{ position: "absolute", top: 3, right: 3, zIndex: 5 }}
      >
        <DeleteIcon />
      </IconButton>
      <div className="w-full h-[80%] relative">
        {item?.fileType?.includes("image") ? (
          <img
            src={`${API_URL}/${item?.filePath}`?.replace("\\", "/")}
            alt={item?.filePath}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <video
            src={item?.filePath}
            muted
            controls
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-2 px-2 py-2">
        <span>{item?.fileName}</span>
        <span>{item?.createdAt}</span>
      </div>
    </div>
  );
};

export default MediaGridTile;
