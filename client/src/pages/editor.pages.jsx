import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

// blog structure
const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  desc: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const EditorPage = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [editorState, setEditorState] = useState("editor");

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
        editorState,
        setEditorState,
      }}
    >
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default EditorPage;
