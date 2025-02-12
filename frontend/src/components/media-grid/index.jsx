import MediaGridTile from "./media-grid-tile";
import DeleteMediaDialog from "../delete-media-dialog";
import { useState } from "react";

const MediaGrid = ({ media, refreshData }) => {
  const [mediaIdToBeDeleted, setMediaIdToBeDeleted] = useState(null);
  return (
    <>
      {media?.length > 0 && media ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {media?.map((item, i) => (
            <MediaGridTile
              key={item?.id || i}
              item={item}
              handleMediaDelete={(mediaId) => setMediaIdToBeDeleted(mediaId)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center pt-48">
          <span className="text-sm text-gray-500">No media found</span>
        </div>
      )}
      <DeleteMediaDialog
        open={!!mediaIdToBeDeleted}
        mediaId={mediaIdToBeDeleted}
        handleClose={() => setMediaIdToBeDeleted(null)}
        refreshData={refreshData}
      />
    </>
  );
};

export default MediaGrid;
