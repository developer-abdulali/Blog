import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import DefaultBanner from "../imgs/blog banner.png";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import uploadToCloudinary from "../common/cloudinary";
import axios from "axios";
import { UserContext } from "../App";

const BlogEditor = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  const [bannerUrl, setBannerUrl] = useState(DefaultBanner);

  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: "textEditor",
          tools: tools,
          data: content,
          placeholder: "Let's write an story",
        })
      );
    }
  }, []);

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

  const handlePublishEvent = () => {
    if (!banner.length)
      return toast.error("Upload a blog baaner to publish it");

    if (!title.length) return toast.error("Enter blog title to publish it");

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error(
              "Write some content about the blog to publish it"
            );
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to save the blog. Please try again later.");
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (
      !(e.target instanceof HTMLElement) ||
      e.target.classList.contains("disable")
    )
      return;

    // validation
    if (!title) {
      toast.error("Please enter the blog title");
      return;
    }

    // loading toast
    let loadingToast = toast.loading("Saving draft...");

    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = { title, banner, desc, content, tags, draft: true };

        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Saved 👍");

            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch((response) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
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
          <button onClick={handlePublishEvent} className="btn-dark my-2">
            Publish
          </button>
          <button onClick={handleSaveDraft} className="btn-light my-2">
            Save Draft
          </button>
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
                  onChange={(e) =>
                    uploadToCloudinary(e, setBannerUrl, setBlog, blog)
                  } // Use the imported function
                />
              </label>
            </div>

            {/* textarea */}
            <textarea
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              defaultValue={title}
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
