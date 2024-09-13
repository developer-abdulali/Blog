// //importing tools

// import Embed from "@editorjs/embed";
// import Header from "@editorjs/header";
// import Image from "@editorjs/image";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import InlineCode from "@editorjs/inline-code";
// import Marker from "@editorjs/marker";

// const uploadImageByUrl = (url) => {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve({
//         success: 1,
//         file: {
//           url: url,
//           caption: "Image uploaded by user",
//         },
//       });
//     } catch (err) {
//       reject({
//         success: 0,
//         message: "Image upload failed",
//       });
//     }
//   });
// };

// const uploadImageByFile = (url) => {};

// export const tools = {
//   embed: Embed,
//   list: {
//     class: List,
//     inlineToolbar: true,
//   },
//   header: {
//     class: Header,
//     config: {
//       placeholder: "Type Heading...",
//       levels: [2, 3],
//       defaultLevel: 2,
//     },
//   },
//   image: {
//     class: Image,
//     config: {
//       uploader: {
//         uploadByUrl: uploadImageByUrl,
//         uploadImageByFile: uploadImageByFile,
//       },
//     },
//   },
//   quote: {
//     class: Quote,
//     inlineToolbar: true,
//   },
//   inlineCode: InlineCode,
//   marker: Marker,
// };

import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import axios from "axios";
import { toast } from "react-hot-toast";

const uploadImageByUrl = (url) => {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        success: 1,
        file: {
          url: url,
          caption: "Image uploaded by user",
        },
      });
    } catch (err) {
      reject({
        success: 0,
        message: "Image upload failed",
      });
    }
  });
};

const uploadImageByFile = async (file) => {
  const formData = new FormData();
  formData.append("banner", file);

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

    // Get the new image URL from the response
    const newImageUrl = response.data.fileUrls[0];

    console.log("Uploaded image URL:", newImageUrl); // Log the image URL

    // Show success toast and remove loading toast
    toast.success("Upload successful 👍", {
      id: loadingToast,
    });

    return {
      success: 1,
      file: {
        url: newImageUrl,
        caption: "Image uploaded by user",
      },
    };
  } catch (error) {
    // Show error toast and remove loading toast
    toast.error("Error uploading the file.", {
      id: loadingToast,
    });

    return {
      success: 0,
      message: "Image upload failed",
    };
  }
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
  marker: Marker,
};

// import Embed from "@editorjs/embed";
// import Header from "@editorjs/header";
// import Image from "@editorjs/image";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import InlineCode from "@editorjs/inline-code";
// import Marker from "@editorjs/marker";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const uploadImageByUrl = (url) => {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve({
//         success: 1,
//         file: {
//           url: url,
//           caption: "Image uploaded by user",
//         },
//       });
//     } catch (err) {
//       reject({
//         success: 0,
//         message: "Image upload failed",
//       });
//     }
//   });
// };

// const uploadImageByFile = async (file) => {
//   const formData = new FormData();
//   formData.append("banner", file);

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

//     // Get the new image URL from the response
//     const newImageUrl = response.data.fileUrls[0];

//     // Show success toast and remove loading toast
//     toast.success("Upload successful 👍", {
//       id: loadingToast,
//     });

//     return {
//       success: 1,
//       file: {
//         url: newImageUrl,
//         caption: "Image uploaded by user",
//       },
//     };
//   } catch (error) {
//     // Show error toast and remove loading toast
//     toast.error("Error uploading the file.", {
//       id: loadingToast,
//     });

//     return {
//       success: 0,
//       message: "Image upload failed",
//     };
//   }
// };

// export const tools = {
//   embed: Embed,
//   list: {
//     class: List,
//     inlineToolbar: true,
//   },
//   header: {
//     class: Header,
//     config: {
//       placeholder: "Type Heading...",
//       levels: [2, 3],
//       defaultLevel: 2,
//     },
//   },
//   image: {
//     class: Image,
//     config: {
//       uploader: {
//         uploadByUrl: uploadImageByUrl,
//         uploadByFile: uploadImageByFile,
//       },
//     },
//   },
//   quote: {
//     class: Quote,
//     inlineToolbar: true,
//   },
//   inlineCode: InlineCode,
//   marker: Marker,
// };
