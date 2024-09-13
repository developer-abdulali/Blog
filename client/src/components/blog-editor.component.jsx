// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Logo from "../imgs/logo.png";
// import AnimationWrapper from "../common/page-animation";
// import DefaultBanner from "../imgs/blog banner.png";
// import { Toaster, toast } from "react-hot-toast";
// import { EditorContext } from "../pages/editor.pages";

// const BlogEditor = () => {
//   let {
//     blog,
//     blog: { title, banner, content, tags, desc },
//     setBlog,
//   } = useContext(EditorContext);

//   console.log(blog);

//   const [bannerUrl, setBannerUrl] = useState(DefaultBanner);

//   // img uploading functionality
//   const handleBannerUpload = async (e) => {
//     const img = e.target.files[0];
//     const formData = new FormData();
//     formData.append("banner", img);

//     // Show loading toast
//     const loadingToast = toast.loading("Uploading...");

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/get-upload-url",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Update banner URL
//       setBannerUrl(response.data.fileUrl);

//       setBlog({ ...blog, banner: bannerUrl });
//       // Show success toast and remove loading toast
//       toast.success("Upload successful 👍", {
//         id: loadingToast,
//       });
//     } catch (error) {
//       // Show error toast and remove loading toast
//       toast.error("Error uploading the file.", {
//         id: loadingToast,
//       });
//     }
//   };

//   const handleTitleKeyDown = (e) => {
//     if (e.keycode == 13) {
//       e.preventDefault();
//     }
//   };

//   const handleTitleChange = (e) => {
//     let input = e.target;

//     input.style.height = "auto";
//     input.style.height = input.scrollHeight + "px";

//     setBlog({ ...blog, title: input.value });
//   };

//   return (
//     <>
//       <Toaster />
//       <nav className="navbar">
//         <Link to="/" className="flex-none w-10">
//           <img src={Logo} alt="logo" />
//         </Link>

//         <p className="max-md:hidden text-black line-clamp-1 w-full">
//           {title?.length ? title : "New Blog"}
//         </p>

//         <div className="flex gap-4 ml-auto">
//           <button className="btn-dark">Publish</button>
//           <button className="btn-light my-2">Save Draft</button>
//         </div>
//       </nav>

//       <AnimationWrapper>
//         <section>
//           <div className="mx-auto max-w-[900px] w-full">
//             <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
//               <label htmlFor="uploadBanner">
//                 <img src={banner} alt="banner" className="z-20" />
//                 {/* <img src={bannerUrl} alt="banner" className="z-20" /> */}
//                 <input
//                   type="file"
//                   id="uploadBanner"
//                   accept=".png, .jpg, .jpeg"
//                   hidden
//                   onChange={handleBannerUpload}
//                 />
//               </label>
//             </div>

//             {/* textarea */}
//             <textarea
//               onKeyDown={handleTitleKeyDown}
//               onChange={handleTitleChange}
//               placeholder="Blog Title"
//               className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
//             />
//           </div>
//         </section>
//       </AnimationWrapper>
//     </>
//   );
// };

// export default BlogEditor;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import DefaultBanner from "../imgs/blog banner.png";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";

const BlogEditor = () => {
  const {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
  } = useContext(EditorContext);

  const [bannerUrl, setBannerUrl] = useState(DefaultBanner);

  useEffect(() => {
    let editor = new EditorJS({
      holderId: "textEditor",
      tools: tools,
      placeholder: "Let's write an story",
    });
  }, []);

  // img uploading functionality
  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("banner", img);

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

      // Get the new banner URL from the response
      const newBannerUrl = response.data.fileUrl;

      // Update the banner URL state and blog context
      setBannerUrl(newBannerUrl);
      setBlog({ ...blog, banner: newBannerUrl });

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

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  return (
    <>
      <Toaster />
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={Logo} alt="logo" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title?.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark">Publish</button>
          <button className="btn-light my-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img src={bannerUrl} alt="banner" className="z-20" />

                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            {/* textarea */}
            <textarea
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            />
            {/* seprator */}
            <hr className="w-full opacity-10 my-5" />

            {/* editor library */}
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
