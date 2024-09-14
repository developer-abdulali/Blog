import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";

const Tags = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(EditorContext);

  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let currentTag = e.target.innerText.trim();

      if (currentTag) {
        tags[tagIndex] = currentTag;
        setBlog({ ...blog, tags });
        e.target.setAttribute("contentEditable", false);
      }
    }
  };

  const handleTagDelete = () => {
    const updatedTags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags: updatedTags });
  };

  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  return (
    <div className="relative p-2 mr-2 mt-2 px-5 bg-white rounded-full inline-block hover:opacity-50 pr-10">
      <p
        className="outline-none"
        onKeyDown={handleTagEdit}
        onClick={addEditable}
        contentEditable={false}
      >
        {tag}
      </p>
      <button
        onClick={handleTagDelete}
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
      >
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tags;
