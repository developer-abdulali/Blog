// // uploadToCloudinary
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const uploadToCloudinary = async (e, setBannerUrl, setBlog, blog) => {
//   const img = e.target.files[0];
//   const formData = new FormData();
//   formData.append("banner", img);

//   // Show loading toast
//   const loadingToast = toast.loading("Uploading...");

//   try {
//     const response = await axios.post(
//       "http://localhost:3000/get-upload-url",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     // Get the new banner URL from the response
//     const newBannerUrl = response.data.fileUrl;

//     // Update the banner URL state and blog context
//     setBannerUrl(newBannerUrl);
//     setBlog({ ...blog, banner: newBannerUrl });

//     // Show success toast and remove loading toast
//     toast.success("Upload successful 👍", {
//       id: loadingToast,
//     });
//   } catch (error) {
//     // Show error toast and remove loading toast
//     toast.error("Error uploading the file.", {
//       id: loadingToast,
//     });
//   }
// };

// export default uploadToCloudinary;

import axios from "axios";
import { toast } from "react-hot-toast";

const uploadToCloudinary = async (e, setBannerUrl, setBlog, blog) => {
  const files = e.target.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("banner", files[i]);
  }

  // Show loading toast
  const loadingToast = toast.loading("Uploading...");

  try {
    const response = await axios.post(
      "http://localhost:3000/get-upload-url",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Get the new banner URLs from the response
    const newBannerUrls = response.data.fileUrls;

    // Update the banner URL state and blog context
    setBannerUrl(newBannerUrls[0]); // Assuming the first URL is for the banner
    setBlog({ ...blog, banner: newBannerUrls[0] });

    // Show success toast and remove loading toast
    toast.success("Upload successful 👍", {
      id: loadingToast,
    });
  } catch (error) {
    // Show error toast and remove loading toast
    toast.error("Error uploading the file.", {
      id: loadingToast,
    });
  }
};

export default uploadToCloudinary;
