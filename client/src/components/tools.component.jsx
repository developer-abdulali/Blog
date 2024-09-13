//importing tools

import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";

// const uploadImageByUrl = (e) => {
//   let link = new Promise((resolve, reject) => {
//     try {
//       resolve(e);
//     } catch (err) {
//       reject(err);
//     }
//   });
//   return link.then((url) => {
//     return {
//       success: 1,
//       file: { url },
//     };
//   });
// };

const uploadImageByUrl = (url) => {
  return new Promise((resolve, reject) => {
    // Simulate a delay to mimic an asynchronous operation
    setTimeout(() => {
      resolve({
        success: 1,
        file: {
          url: url,
        },
      });
    }, 1000);
  });
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
