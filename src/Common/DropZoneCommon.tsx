import Dropzone from "react-dropzone-uploader";

const DropZoneCommon = () => {
  return (
    <Dropzone
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{ dropzoneActive: { borderColor: "green" } }}
    />
  );
};

export default DropZoneCommon;
