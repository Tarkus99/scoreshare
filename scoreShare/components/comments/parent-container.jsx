import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { OpenCloseEyeButton } from "../misc/open-close-eye-button";
import {
  addComment,
  getComments,
  removeComment,
} from "@/actions/commentActions";
import { Comment } from "./comment";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "../misc/submit-button";
import Image from "next/image";
import { useUser } from "@/hooks/use-current-user";
import { OK, is2xx } from "@/lib/utils";

export const ParentCommentContainer = memo(({ file }) => {
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const parentComment = useRef(null);
  const commentId = useRef(null);
  const textArea = useRef();
  const user = useUser();

  useEffect(() => {
    getComments(file.id).then((data) => {
      setComments(data);
    });
  }, []);

  const handleAddComment = async (formData) => {
    formData.append("fileId", file.id);
    if (parentComment.current) formData.append("parent", parentComment.current);
    if (commentId.current) formData.append("id", commentId.current);

    const result = await addComment(formData);

    if (is2xx(result.status)) {
      let newComments;
      if (result.status === OK) {
        newComments = [...comments, result.data];
      } else {
        newComments = comments.filter(
          (comment) => comment.id !== result.data.id
        );
        newComments.push(result.data);
      }
      setComments(newComments);
      textArea.current.value = "";
    } else {
      setError(result.message);
    }
  };

  const handleDeleteComment = async (id) => {
    const result = await removeComment(id);
    if (is2xx(result.status)) {
      const newComments = comments.filter((c) => c.id !== result.id);
      setComments(newComments);
    } else {
      setError(result.message);
    }
  };

  const getReplies = useCallback(
    (id) => {
      return comments.filter((c) => c.parentId === id);
    },
    [comments]
  );

  const getRootComments = useCallback(() => {
    return comments.filter((c) => c.parentId === null);
  }, [comments]);

  const setParentComment = (id) => {
    parentComment.current = id;
  };

  const setCommentId = (id) => {
    commentId.current = id;
  };

  const setFocus = (value = "") => {
    textArea.current.focus();
    textArea.current.value = value;
  };

  return (
    <div className="grid items-center grid-cols-2 gap-x-2 auto-rows-auto">
      <h1 className="text-lg font-bold ms-2">Commentaries:</h1>

      <label htmlFor="show-comments" className="justify-self-end me-12">
        <OpenCloseEyeButton />
      </label>

      <input
        className="hidden peer"
        type="checkbox"
        defaultChecked={false}
        id="show-comments"
      />
      <div className="hidden row-start-2 col-span-2 peer-checked:block h-auto comments-parent-container p-2 space-y-2 overflow-y-scroll border-y-[1px] border-slate-400 bg-stone-200 max-h-80">
        <div id="add-comment">
          <form
            action={handleAddComment}
            className="flex items-start justify-between p-4 bg-white rounded-sm shadow-md gap-x-4"
          >
            <Image
              alt=""
              height={100}
              width={100}
              src={user.image || ""}
              className="w-8 rounded-full "
            />
            <Textarea
              ref={textArea}
              name="content"
              className="flex-1"
              placeholder="Add a comment..."
              min="5"
              max="250"
              required
            />
            <SubmitButton />
          </form>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        {comments.length > 0 &&
          getRootComments()
            .toSorted((a, b) => b.createdAt - a.createdAt)
            .map((comment) => {
              const replies = getReplies(comment.id);
              return (
                <Comment
                  key={comment.id}
                  info={comment}
                  currentUser={user}
                  replies={replies}
                  getReplies={getReplies}
                  setParentComment={setParentComment}
                  setFocus={setFocus}
                  setCommentId={setCommentId}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })}
      </div>
    </div>
  );
});
