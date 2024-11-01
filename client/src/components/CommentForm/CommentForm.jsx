import { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHander = null,
  initialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4 mt-3">
        <textarea
          rows={5}
          value={value}
          placeholder="Leave your comment here..."
          className="w-full focus:outline-none bg-transparent"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 min-[420px]:flex-row">
          {formCancelHander && (
            <button
              onClick={formCancelHander}
              className="mt-2 px-6 py-[9px] rounded-lg border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};
export default CommentForm;
