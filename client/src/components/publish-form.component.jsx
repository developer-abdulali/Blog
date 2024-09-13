import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tags from "./tags.component";

const PublishForm = () => {
  let charactorsLimit = 200;
  let tagsLimit = 10;

  let {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);

  const handleEventClose = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;

    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDescChange = (e) => {
    let input = e.target;

    setBlog({ ...blog, desc: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let tag = e.target.value.trim();

      if (tag && tags.length < tagsLimit && !tags.includes(tag)) {
        setBlog({ ...blog, tags: [...tags, tag] });
        e.target.value = "";
      } else {
        toast.error(`You can add max ${tagsLimit}`);
        e.target.value = "";
      }
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          onClick={handleEventClose}
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>

          <div className="overflow-hidden w-full aspect-video rounded-lg bg-grey mt-4">
            <img src={banner} alt="banner" />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {desc}
          </p>
        </div>

        <div className="broder-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
            className="input-box pl-4"
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>

          <textarea
            maxLength={charactorsLimit}
            onKeyDown={handleTitleKeyDown}
            defaultValue={desc}
            onChange={handleBlogDescChange}
            className="h-40 resize-none leading-7 input-box"
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {charactorsLimit - desc.length} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Helps in searching and ranking your blog post)
          </p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
            />

            {tags.map((tag, i) => (
              <Tags key={i} tag={tag} />
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
